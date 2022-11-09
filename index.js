const inquirer = require('inquirer');
const db = require('./config/connection')

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
            {
                name: 'Quit',
                value: 'QUIT_'
            }
            ]
    }
]).then(answer => {
    switch (answer.action) {
        case 'view_all_departments':
            viewAllDepts();
            break;
        case 'view_all_roles':
            viewAllRoles();
            break;
        case 'view_all_employees':
            viewAllEmps();
            break;
        case 'add_a_department':
            addDept();
            break;
        case 'add_an_employee':
            addEmp();
            break;
        case 'update_an_employee_role':
            updateEmpRole();
            break;
        case 'add_a_role':
            addRole();
            break;
        default:
            console.log('jomel')//process.exit();
    }
})
.catch(err => console.log(err))
}

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

function viewAllRoles() {
    const sql = 'SELECT *, department.name FROM role Join department ON department.id = role.department_id';
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}

function viewAllEmps() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name, title, salary,
                CONCAT(mngr.first_name, ' ', mngr.last_name) AS manager
                FROM employee emp
                LEFT JOIN employee mngr ON mngr.id = emp.manager_id
                LEFT JOIN role ON emp.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id;`;

    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}

function addDept() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'add_department',
            message: 'What is the name of the department would you like to add?',
        }
    ]).then(answer => {
        console.log(answer.add_department)
    })
    const sql = 'INSERT name FROM department'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

function addRole() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'add_role',
            message: 'What is the role would you like to add?',
        }
    ]).then(answer => {
        console.log(answer.add_role)
    })

    const sql = 'INSERT role.title, role.salary FROM role LEFT JOIN department ON department.name'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

function addEmp() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'add_emp_first',
            message: `What is the first_name of the employee would you like to add?`,
        },
        {
            type: 'input',
            name: 'add_emp_last',
            message: `What is the last_name of the employee would you like to add?`,
        }
    ]).then(answer => {
        console.log(answer.add_emp_first)
        console.log(answer.add_emp_last)
    })

    const sql = `INSERT emp.id, emp.first_name, emp.last_name, role.title
    CONCAT(mgr.first_name, ' ', mngr.last_name AS manager
    INTO employee emp
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

function updateEmpRole() {
    const sql = 'UPDATE emp.role_id, emp.id SETemployee WHERE role ON role.id = emp.role.id'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
}

init();