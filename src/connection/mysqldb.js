const mysql = require('mysql');
const connection = mysql.createConnection({
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'tugasbe'
})

connection.connect((error) => {
    if (error) {
        console.log(error)
        return
    }
    console.log('connect as id ' + connection.threadId)
});

module.exports = connection;