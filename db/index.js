const db = require("../config/connection");

class DB {
    constructor(db) {
        this.db = db
    }

    // add a new dept
    addDeptQuery(department) {
        return this.db.promise().query("INSERT INTO department SET ?", department)
    }

    // add a role 
    addRoleQuery(role) {
        // your db connection and queyr 
    }
}
module.exports = new DB(db)