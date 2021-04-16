const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
