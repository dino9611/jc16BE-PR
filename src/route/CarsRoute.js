const express = require("express");
const router = express.Router();

const { CarsController } = require("./../controllers");
const { getCars, postCars, putCars, deleteCars } = CarsController;

router.get("/", getCars);

router.post("/", postCars);

router.put("/:idproduct", putCars);

router.delete("/:idproduct", deleteCars);

module.exports = router;
