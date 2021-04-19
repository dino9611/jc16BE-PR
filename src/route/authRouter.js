const express = require('express')
const router = express.Router()

const { authController } = require('../controller');

const { register, login } = authController;

router.post('/register', register);
router.post('/login', login)

module.exports = router;