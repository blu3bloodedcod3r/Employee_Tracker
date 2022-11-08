const mysql = require('mysql2');
require('dotenv')

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: "employee_db",
})

module.exports = db;