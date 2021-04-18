const express = require("express");
const router = express.Router();

const { categoryControllers } = require("./../controller");
const { verifyTokenAccess } = require("./../helpers/verfiyToken");

const { getCategory } = categoryControllers;

router.get("/", verifyTokenAccess, getCategory);

module.exports = router;