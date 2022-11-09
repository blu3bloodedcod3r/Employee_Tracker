const inquirer = require('inquirer');
const db = require('./config/connection')
require('dotenv').config();

function init () {
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices : [
            {
                name: 'view all departments',
                value: 'view_all_departments'
            }, 
            { 
                name: 'view all roles',
                value: 'view_all_roles'
            }, 
            {
                name: 'view all employees',
                value: 'view_all_employees'
            }, 
            {
                name: 'add a department',
                value: 'add_a_department'
            }, 
            {
                name: 'add a role',
                value: 'add_a_role'
            }, 
            {
                name: 'add an employee',
                value: 'add_an_employee'
            }, 
            {
                name: 'update an employee role',
                value: 'update_an_employee_role'
            }, 
            'Quit'
            ]
    }
]).then(answer => {
    switch (answer.action) {
        case 'view_all_departments':
            viewAllDepts();
            break;
        case 'view all roles':
            viewAllRoles();
            break;
        case 'view all employees':
            viewAllEmps();
            break;
        case 'add a department':
            addDept();
            break;
        case 'add an employee':
            addEmp();
            break;
        case 'update an employee role':
            updateEmpRole();
            break;
        case 'add a role.':
            addRole();
            break;
        default:
            process.exit();
    }
})
.catch(err => console.log(err))
}

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

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function viewAllRoles() {
    const sql = 'SELECT *, department.name FROM role Join department ON department.id = role.department.id';
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

    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}

//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database

function addDept() {
    const sql = 'SELECT name FROM department'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

function addRole() {
    const sql = 'SELECT role.title, role.salary FROM role LEFT JOIN department ON department.name'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

function addEmp() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, role.title
    CONCAT(mgr.first_name, ' ', mngr.last_name AS manager
    FROM employee emp
    LEFT JOIN employee mngr ON mngr.id = emp.manager_id
    LEFT JOIN role On emp.role_id = role.id
    LEFT JOIN role.department_id = department.id`
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

function updateEmpRole() {
    const sql = 'SELECT emp.role_id, emp.id FROM role ON role.id = emp.role.id'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}


init();