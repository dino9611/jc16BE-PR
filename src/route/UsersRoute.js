const express = require("express");
const router = express.Router();
const { UsersController } = require("./../controllers");
const { VerifyAccessToken } = require("./../helpers/VerifyToken");
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  gantiPassword,
} = UsersController;

// router.use(VerifyAccessToken); // (middleware) cara untuk dipake ke semua

router.get("/", getUsers);

router.post("/", postUsers);

router.put("/:id", putUsers);

router.put("/editpass/:id", gantiPassword);

router.delete("/:id", deleteUsers);

module.exports = router;
