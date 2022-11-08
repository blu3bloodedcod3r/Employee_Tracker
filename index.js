const inquirer = require('inquirer');
const db = require('./config/connection')
require('console.table');

function init () {
inquirer.createPromptModule([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices : ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Quit']
])
.then(answer => {
    switch (answer.action) {
        case 'view all departments':
            viewAllDepts();
            break;
        case 'view all roles':
            console.log("You want to view all roles.")
            init();
            break;
        case 'view all employees':
            viewAllEmps();
            break;
        case 'add a department':
            console.log("You want to add a department.")
            init();
            break;
        case 'add an employee':
            console.log("You want to add an employee.")
            init();
            break;
        case 'update an employee role':
            console.log("You want to update an employee role.")
            init();
            break;
        case 'add a role.':
            console.log("You want to add a role.")
            init();
            break;
        default:
            process.exit();
    }
})
.catch(err => console.log(err))
}

init();

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids

function viewAllDepts() {
    const sql = 'SELECT * FROM department';
    //review activity 21/22
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}

//WHEN I choose to view all employees
//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function viewAllEmps() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, title, salary,
                CONCAT(mgr.first_name, ' ', mngr.last_name AS manager
                FROM employee emp
                LEFT JOIN employee mngr ON mngr.id = emp.manager_id
                LEFT JOIN role On emp.role_id = role.id
                LEFT JOIN role.department_id = department.id`;
    //review activity 21/22
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}
