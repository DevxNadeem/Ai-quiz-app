const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        selectedAnswer: {
          type: String,
          required: true,
        },

        correctAnswer: {
          type: String,
          required: true,
        },

        isCorrect: {
          type: Boolean,
          required: true,
        },

        explanation: {
          type: String,
          default: "",
        },
      },
    ],

    score: {
      type: Number,
      required: true,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

answerSchema.index(
  {
    user: 1,
    quiz: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Answer", answerSchema);