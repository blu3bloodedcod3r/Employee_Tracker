const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Booddha',
    database: "insert name here",
})

module.exports = db;