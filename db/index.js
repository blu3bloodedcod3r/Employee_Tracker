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
        return this.db.promise().query("INSERT INTO role SET ?", role) 
    }
    //add employee
    addEmpQuery(employee) {
        return this.db.promise().query("INSERT INTO employee SET ?", employee) 
    }
}
module.exports = new DB(db)