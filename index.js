"use strict";
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send({message: "welcome"})
})

const {
  authRoutes,
} = require("./src/route");

app.use("/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log(`listen in PORT ${PORT}`));