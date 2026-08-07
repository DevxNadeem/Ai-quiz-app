const mongoose = require("mongoose");
const quizModel = require("../Models/quizModel");

const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await quizModel
            .find({ userId: req.user.id })
            .select("topic difficulty numberOfQuestions createdAt");

        res.json(quizzes);
    } catch (err) {
        next(err);
    }
};

const getQuizInfo = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid quiz id" });
        }

        const quizData = await quizModel.findById(id);

        if (!quizData) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (quizData.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.status(200).json({ quiz: quizData });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllQuizzes, getQuizInfo };
