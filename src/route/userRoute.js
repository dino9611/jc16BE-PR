const express = require("express");
const router = express.Router();

const { userControllers } = require("./../controller");
const { verifyTokenAccess } = require("./../helpers/verfiyToken");

const { 
  getUsers, 
  getUserById,
} = userControllers;

router.get("/", verifyTokenAccess, getUsers);
router.get("/:id", verifyTokenAccess, getUserById);

module.exports = router;