// connect sql to nodejs
const mysql = require("mysql");
const connection = mysql.createConnection({
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "dbsql",
});

// buat cek dia connect atau engga dbnya
connection.connect((err) => {
  if (err) {
    console.log(err);

    // dikasi return spy berenti
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
