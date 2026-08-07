const quizModel = require("../Models/quizModel");
const Groq_response = require("../services/aiService");
const parseAIJson = require("../utils/parseAIJson");

const ALLOWED_DIFFICULTIES =["Easy", "Medium", "Hard"];
const MAX_QUESTIONS = 25;

function isValidQuestionArray(questions) {
    if (!Array.isArray(questions) || questions.length === 0) return false;
    return questions.every(
        (q) =>
            q &&
            typeof q.question === "string" &&
            Array.isArray(q.options) &&
            q.options.length >= 2 &&
            Number.isInteger(q.correctAnswerIndex) &&
            q.correctAnswerIndex >= 0 &&
            q.correctAnswerIndex < q.options.length
    );
}

const Test = async (req, res) => {
    try {
        const { topic, difficulty, numberOfQuestions } = req.body;

        if (!topic || !difficulty || !numberOfQuestions) {
            return res.status(400).json({
                message: "Topic, difficulty and numberOfQuestions are required.",
            });
        }

        if (!ALLOWED_DIFFICULTIES.includes(difficulty)) {
            return res.status(400).json({
                message: `difficulty must be one of: ${ALLOWED_DIFFICULTIES.join(", ")}`,
            });
        }

        const n = Number(numberOfQuestions);
        if (!Number.isInteger(n) || n < 1 || n > MAX_QUESTIONS) {
            return res.status(400).json({
                message: `numberOfQuestions must be an integer between 1 and ${MAX_QUESTIONS}.`,
            });
        }

        const prompt = `
Generate ${n} multiple-choice questions on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON, an array of objects in exactly this format:

[
  {
    "question": "",
    "options": ["", "", "", ""],
    "correctAnswerIndex": 0
  }
]

"correctAnswerIndex" is the zero-based index into "options" of the correct answer.
Do not return markdown.
Do not return explanation.
Return only valid JSON.
`;

        let aiData;
        try {
            aiData = await Groq_response(prompt);
        } catch (aiErr) {
            console.error("AI service error:", aiErr);
            return res.status(502).json({
                message: "Quiz generation service is unavailable. Please try again.",
            });
        }

        let questions;
        try {
            questions = parseAIJson(aiData);
        } catch (parseErr) {
            console.error("AI parse error:", parseErr.message);
            return res.status(502).json({
                message: "AI returned an unexpected format. Please try again.",
            });
        }

        if (!isValidQuestionArray(questions)) {
            console.error("AI returned malformed question shape:", questions);
            return res.status(502).json({
                message: "AI returned incomplete quiz data. Please try again.",
            });
        }

        const quizData = await quizModel.create({
            topic,
            difficulty,
            numberOfQuestions: n,
            questions,
            userId: req.user.id,
        });

        return res.status(201).json({
            message: "Quiz created successfully",
            quiz: quizData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    Test,
};
