const express = require("express");
const router = express.Router();

const { CarsController } = require("./../controllers");
const { getCars } = CarsController;

router.get("/", getCars);

module.exports = router;
