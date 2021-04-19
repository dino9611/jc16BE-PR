"use strict";
const express = require("express");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const app = express();
const PORT = 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.get("/", (req, res) => {
  res.send({message: "welcome"})
})

const {
  authRoutes,
  userRoutes,
  prodRoutes,
  categoryRoutes
} = require("./src/route");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/product", prodRoutes);
app.use("/category", categoryRoutes);

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log(`listen in PORT ${PORT}`));