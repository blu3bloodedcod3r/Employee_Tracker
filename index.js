const inquirer = require('inquirer');
const db = require('./config/connection')
const newDB = require('./db')

init();

function init () {
loadPrompts()
}
function loadPrompts() {
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
                quit()
        }
    })
}

function viewAllDepts() {
    const sql = 'SELECT * FROM department';
    //review activity 21/22
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            loadPrompts()
        })
        .catch(err => console.log(err));   
}

function viewAllRoles() {
    const sql = 'SELECT *, department.name FROM role Join department ON department.id = role.department_id';
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            loadPrompts();
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
            loadPrompts();
        })
        .catch(err => console.log(err));
}


function addDept() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department would you like to add?',
        }
    ])
    .then(res => {
        let name = res;
        newDB.addDeptQuery(name)
        .then(() => console.log(`just added ${name.name} to db`))
        .then(() => loadPrompts())
    })
};

function addRole() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role would you like to add?',
        },{
            type: 'input',
            name: 'dept_id',
            message: 'What is the department ID?',
        }
    ])
    .then(res => {
        let title = res;
        newDB.addRoleQuery(title)
        .then(() => console.log(`just added ${title.title} to db`))
        .then(() => loadPrompts())
    })
    .then(res => {
        let dept_id = res;
        newDB.addRoleQuery(dept_id)
        .then(() => console.log(`just added ${dept_id.dept_id} to db`))
        .then(() => loadPrompts())
    })
}

function addEmp() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: `What is the first name of the employee would you like to add?`,
        },
        {
            type: 'input',
            name: 'last_name',
            message: `What is the last name of the employee would you like to add?`,
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the roleID for this employee?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the employee salary?',
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who does this employee repot to?',
            choices: [
                {
                    name: "Lillian White",
                    value: 'manager'
                }
            ]
        }
    ])
    .then(res => {
        let first_name = res;
        newDB.addEmpQuery(first_name)
        .then(() => console.log(`just added ${first_name.first_name} to db`))
        .then(() => loadPrompts())
    })
    .then(res => {
        let last_name = res;
        newDB.addEmpQuery(last_name)
        .then(() => console.log(`just added ${last_name.last_name} to db`))
        .then(() => loadPrompts())
    })
    .then(res => {
        let role_id = res;
        newDB.addRoleQuery(role_id)
        .then(() => console.log(`just added ${role_id.role_id} to db`))
        .then(() => loadPrompts())
    })
    .then(res => {
        let salary = res;
        newDB.addRoleQuery(salary)
        .then(() => console.log(`just added ${salary.salary} to db`))
        .then(() => loadPrompts())
    })
    // .then(res => {
    //     let manager = res;
    //     newDB.addRoleQuery(manager)
    //     .then(() => console.log(`just added ${manager.manager} to db`))
    //     .then(() => loadPrompts())
    // })
}

function updateEmpRole() {
    const sql = 'UPDATE emp.role_id, emp.id SET employee WHERE role ON role.id = emp.role.id'
    db.promise()
    .query(sql)
    .then(([rows, _]) => {
        console.table(rows);
       loadPrompts();
    })
    .catch(err => console.log(err));
}