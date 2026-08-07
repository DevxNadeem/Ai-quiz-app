const express = require("express");
const router = express.Router();
const isLoggedIn = require("../services/authService");
const { getAllQuizzes, getQuizInfo } = require("../controllers/quizController");

router.get("/all", isLoggedIn, getAllQuizzes);
router.get("/information/:id", isLoggedIn, getQuizInfo);

module.exports = router;
