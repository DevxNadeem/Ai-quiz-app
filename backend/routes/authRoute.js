const express = require("express");
const router = express.Router();

const { Register, Login, getMe } = require("../controllers/authController");
const isLoggedIn = require("../services/authService");

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", isLoggedIn, getMe); // moved out of server.js

module.exports = router;
