const express = require("express");
const router = express.Router();

const { userControllers } = require("./../controllers");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUser,
  gantipassword,
} = userControllers;

router.get("/", getUsers);

router.post("/", postUsers);

router.put("/:id", putUsers);
router.put("/editpass/:id", gantipassword);

router.delete("/:id", deleteUser);

module.exports = router;
