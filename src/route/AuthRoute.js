const express = require("express");
const router = express.Router();

const { AuthController } = require("./../controllers");
const { VerifyEmailToken } = require("./../helpers/VerifyToken");
const {
  register,
  login,
  verifiedEmailToken,
  sendEmailVerification,
} = AuthController;

router.post("/register", register);

router.post("/login", login);

router.post("/sendverified", sendEmailVerification);

router.get("/verifiedemail", VerifyEmailToken, verifiedEmailToken);

module.exports = router;
