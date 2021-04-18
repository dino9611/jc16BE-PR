const express = require("express");
const router = express.Router();

const { authControllers } = require("./../controller");

const { Register, Login } = authControllers;

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;