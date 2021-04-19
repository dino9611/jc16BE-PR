const express = require("express");
const router = express.Router();

const { carsController } = require("./../controllers");
const { getCars } = carsController;

router.get("/", getCars);

module.exports = router;
