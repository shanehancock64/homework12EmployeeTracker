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
  database: 'employeeTracker'
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
  inquirer.prompt({
    type: 'list',
    choices: [
      'Add Department',
      'Add Role',
      'Add Employee',
      'View Departments',
      'View Roles',
      'View Emplyees',
      'Update Employee Role',
      'Exit'
    ],
    message: 'Select from the following options:',
    name: 'Options'
  })
  then(function(result){
    console.log(result.options);
    switch (result.options) {
      case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          exit();
    }
  });
}


// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
});