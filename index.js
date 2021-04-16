"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const { Logger, tampilan } = require("./src/lib");
const { AuthRoute, UsersRoute, CarsRoute } = require("./src/route");

app.use(cors());

app.use(express.json());

app.use(Logger);

app.get("/", async (req, res) => {
  try {
    const html = await tampilan("./src/content/index.html");
    res.status(200).send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.use("/auth", AuthRoute);
app.use("/users", UsersRoute);
app.use("/cars", CarsRoute);

app.all("*", (req, res) => {
  res.status(404).send("resources not found");
});

app.listen(PORT, () => console.log("listen in PORT" + PORT));
