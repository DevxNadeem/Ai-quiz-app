const quizModel = require("../Models/quizModel");
const Groq_response = require("../services/aiService");

const Test = async (req, res) => {
    try {
        const { topic, difficulty, numberOfQuestions } = req.body;

        if (!topic || !difficulty || !numberOfQuestions) {
            return res.status(400).json({
                message: "Topic, difficulty and numberOfQuestions are required."
            });
        }

        const prompt = `
Generate ${numberOfQuestions} multiple-choice questions on ${topic}.

Difficulty: ${difficulty}

Return ONLY valid JSON in this format:

[
    {
        "question": "",
        "options": ["", "", "", ""]
    }
]

Do not return markdown.
Do not return explanation.
Return only valid JSON.
`;

        const aiData = await Groq_response(prompt);

        const questions = JSON.parse(aiData);

        console.log("Decoded User:", req.user);

        const quizData = await quizModel.create({
            topic,
            difficulty,
            numberOfQuestions,
            questions,
            userId: req.user.id
        });

        return res.status(201).json({
            message: "Quiz created successfully",
            quiz: quizData
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    Test
};