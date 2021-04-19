const express = require("express");
const router = express.Router();

const { productControllers } = require("./../controller");
const { verifyTokenAccess } = require("./../helpers/verfiyToken");

const {
  getProduct,
  getProductById
} = productControllers;

router.get("/", verifyTokenAccess, getProduct);
router.get("/:id", verifyTokenAccess, getProductById);

module.exports = router;
