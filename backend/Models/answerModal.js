const mongoose = require("mongoose");

// ASSUMPTION: reconstructed from context. Reconcile with your real file.

const answerDetailSchema = new mongoose.Schema(
    {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedAnswer: { type: Number, required: true }, // index, not text
        correctAnswer: { type: Number, required: true },  // index, not text
        isCorrect: { type: Boolean, required: true },
    },
    { _id: false }
);

const answerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
            index: true,
        },
        answers: { type: [answerDetailSchema], required: true },
        score: { type: Number, required: true },
        totalQuestions: { type: Number, required: true },
        feedback: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
