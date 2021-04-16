const express = require("express");
const router = express.Router();

const { authControlles } = require("./../controller");

const { Register, Login } = authControlles;

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;