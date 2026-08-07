const answerModal = require("../Models/answerModal");
const quizModel = require("../Models/quizModel");
const Groq_response = require("../services/aiService");

const Submit = async (req, res) => {
    try {
        const quizId = req.params.id;
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Answers are required.",
            });
        }

        const quiz = await quizModel.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                message: "Generate quiz first.",
            });
        }

        // Ownership check — was missing entirely before. Without this any
        // logged-in user could submit against, and receive graded results
        // for, a quiz that belongs to someone else.
        if (quiz.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }

        if (answers.length !== quiz.questions.length) {
            return res.status(400).json({
                message: `Expected ${quiz.questions.length} answers, got ${answers.length}.`,
            });
        }

        // Deterministic grading against the stored answer key.
        // No AI call, no non-determinism, no re-derivation of "correct"
        // answers at grading time.
        let score = 0;
        const gradedAnswers = quiz.questions.map((q, i) => {
            const selectedAnswer = Number(answers[i]);
            const isCorrect = selectedAnswer === q.correctAnswerIndex;
            if (isCorrect) score += 1;

            return {
                questionId: q._id,
                selectedAnswer,
                correctAnswer: q.correctAnswerIndex,
                isCorrect,
            };
        });

        // AI is used ONLY for the feedback paragraph now — not for grading.
        // If it fails, submission still succeeds with a generic fallback.
        let feedback = "";
        try {
            const feedbackPrompt = `
A student scored ${score} out of ${quiz.questions.length} on a "${quiz.topic}" quiz (${quiz.difficulty} difficulty).
Write a short (2-3 sentence) encouraging but honest feedback paragraph.
Return ONLY the paragraph text, no JSON, no markdown.
`;
            const raw = await Groq_response(feedbackPrompt);
            feedback = typeof raw === "string" ? raw.trim() : "";
        } catch (feedbackErr) {
            console.error("Feedback generation failed (non-fatal):", feedbackErr);
            feedback = `You scored ${score} out of ${quiz.questions.length}.`;
        }

        const result = {
            answers: gradedAnswers,
            score,
            totalQuestions: quiz.questions.length,
            feedback,
        };

        // Was `answerModal.insertOne(...)` — not a Mongoose method, would
        // have thrown on every submission. Fixed to `.create()`.
        await answerModal.create({
            userId: req.user.id,
            quizId: quizId,
            answers: result.answers,
            score: result.score,
            totalQuestions: result.totalQuestions,
            feedback: result.feedback,
        });

        return res.status(200).json({
            message: "Quiz submitted successfully",
            result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = { Submit };
