const mongoose = require("mongoose");

// ASSUMPTION: reconstructed from context. Reconcile field names with your
// real schema before replacing the file — don't overwrite blind.

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => Array.isArray(arr) && arr.length >= 2,
            message: "A question needs at least 2 options",
        },
    },
    // THE ACTUAL FIX: store ground truth at generation time.
    // Grading becomes a plain comparison, no second AI call, no
    // non-determinism, and there's something to point to if a student
    // disputes a grade.
    correctAnswerIndex: { type: Number, required: true, min: 0 },
});

const quizSchema = new mongoose.Schema(
    {
        topic: { type: String, required: true, trim: true },
        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"], // was unvalidated free text before
        },
        numberOfQuestions: {
            type: Number,
            required: true,
            min: 1,
            max: 25, // was unbounded before — prevents giant prompts / truncated AI JSON
        },
        questions: {
            type: [questionSchema],
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
