"use strict"; //gunanya untk memaksimalkan keamanan
const express = require("express");
const app = express();
const PORT = 5000;

// selain middleware body,bisa pkai body parser
// const bodyParser = require("body-parser");

// import middleware dri lib
const { Logger, tampilan } = require("./src/lib");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
app.use(bearerToken());
require("dotenv").config();

// buat kasi tau almt file dmna cmd
console.log(__dirname);
// ini supaya semua ip bisa akses
app.use(cors());
// jika mau menggunakan middleware untk semua function, bisa dngn ini
app.use(Logger);

// parse form data berguna untk upload file
// bole pake express bole bodyparser
app.use(express.urlencoded({ extended: false }));

// perlu middleware di post, untk parsing data json ke js untk buat req.body ada
// juga bisa buat parsing pada saat axios/fetch di front end
app.use(express.json());
// app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const html = await tampilan("./src/content/index.html");
    res.status(200).send(html);
  } catch (error) {
    console.log("error");
    res.status(500).send(error);
  }
});

// get,post,put,delete data ada disini
const { usersRoute, hashRoutes, AuthRoutes } = require("./src/route");
app.use("/users", usersRoute);
app.use("/auth", AuthRoutes);
app.use("/hashrouter", hashRoutes);

// const util = require("util");
// const dba = util.promisify(mysqldb.query).bind(mysqldb);

//ini untk kasih tau klo error, misalkan masukkin urlnya asal"an
app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(PORT, () => console.log("listen in PORT " + PORT));
