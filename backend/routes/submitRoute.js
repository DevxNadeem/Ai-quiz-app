const express = require("express");
const router = express.Router();
const { Submit } = require("../controllers/submitController");
const isLoggedIn = require("../services/authService");
router.post("/:id", isLoggedIn ,  Submit);
module.exports = router;