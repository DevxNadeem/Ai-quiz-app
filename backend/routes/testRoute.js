const express = require("express");
const router = express.Router();

const isLoggedIn = require("../services/authService");
const { Test } = require("../controllers/testController");

router.post("/test", isLoggedIn, Test);

module.exports = router;
