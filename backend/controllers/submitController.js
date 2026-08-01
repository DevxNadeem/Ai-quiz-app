const answerModal = require("../Models/answerModal");
const quizModel = require("../Models/quizModel");
const Groq_response = require("../services/aiService");

 const Submit = async (req, res) => {
    try {
        const quizId = req.params.id;
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers are required."
            });
        }

        const quiz = await quizModel.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Generate quiz first."
            });
        }

        const prompt = `
You are an expert technical interviewer and evaluator.

You are given:

1. The quiz questions.
2. The student's submitted answers.

Your task is to:

- Determine the correct answer for each question.
- Compare it with the student's answer.
- Mark whether it is correct.
- Give a short explanation (1-3 sentences).
- Calculate the final score.
- Give an overall feedback paragraph.

Quiz:

${JSON.stringify(quiz.questions, null, 2)}

Student Answers:

${JSON.stringify(answers, null, 2)}

Return ONLY valid JSON.

{
  "answers": [
    {
      "questionId": "",
      "correctAnswer": "",
      "selectedAnswer": "",
      "isCorrect": true,
      "explanation": ""
    }
  ],
  "score": 0,
  "totalQuestions": 0,
  "feedback": ""
}

Do not return markdown.
Return only valid JSON.
`;

        const response = await Groq_response(prompt);

        const aiData = JSON.parse(response);

        await answerModal.insertOne({
            userId : req.user.id,
            quizId : quizId,
            answers: aiData.answers,
            score: aiData.score,
            totalQuestions: aiData.totalQuestions,
            feedback: aiData.feedback
        });

        return res.status(200).json({
            message: "Quiz submitted successfully",
            result: aiData,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}; 
module.exports = {Submit};