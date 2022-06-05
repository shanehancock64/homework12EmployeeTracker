const express = require('express');
const mysql = require('mysql2'); 
const cTable = require('console.table');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const app = express();
const inquirer = require('inquirer');
//connection 
const db = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'password',
  database: 'employee_tracker'
})

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Great success connected to Mysql!');
});
startApp();
// Question Prompts inquirer
function startApp() {
  inquirer.prompt([ 
    {
    type: 'list',
    name: 'userChoices',
    message: 'Select from the following options:',
    choices: [
      'Add Department',
      'Add Role',
      'Add Employee',
      'View Departments',
      'View Roles',
      'View Emplyees',
      'Update Employee Role',
      'Exit'
    ]
  }

  ]).then((res) => {
    console.log(res.userChoices);
    switch(res.userChoice){
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'View Employees By Department':
        viewEmployeesByDepartment();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Remove Employee':
        removeEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Exit':
        connection.end();
        break;
      }
      
    }).catch((err)=>{
  if(err)throw err;
  });
}
  
  




// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
});