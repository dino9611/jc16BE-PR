const express = require("express");
const router = express.Router();

const { AuthController } = require("./../controllers");

const { Register, login } = AuthController;

router.post("/register", Register);
router.post("/login", login);

module.exports = router;
