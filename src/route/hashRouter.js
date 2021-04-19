const express = require("express");
const router = express.Router();

// get,post,put,delete ada disini
const { encryptController } = require("./../controllers");
const { gantihash } = encryptController;

router.get("/ganti", gantihash);

module.exports = router;
