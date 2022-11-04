const inquirer = require('inquirer');
const db = require('./config/connection')
require('console.table');

function init () {
inquirer.createPromptModule([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices : ['view all departments', 'view all roles', 'View employees by department', 'Delete departments, roles, and employees', '', 'Quit']

    },
    {

    },
    {

    }
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
            console.log("You want to view all employees.")
            init();
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
        case 'View employees by department.':
            console.log("You want to View employees by department..")
            init();
            break;
        case 'Delete departments, roles, and employees':
            console.log("You want to Delete departments, roles, and employees.")
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