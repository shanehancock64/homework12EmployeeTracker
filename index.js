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
      'View Employees',
      'Update Employee Role',
      'Exit'
    ]
  }

  ]).then((res) => {
    console.log(res.userChoices);
    switch(res.userChoice){
      case 'View All Employees':
        viewEmployees();
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
// employee function
function viewEmployees() {
  console.log('Viewing Employees');

  let sql = `SELECT 
  employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department, 
  role.salary, 
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role
  ON employee.role_id = role.id
LEFT JOIN department
  ON department.id = role.department_id
LEFT JOIN employee manager
ON manager.id = employee.manager_id`

db.query(sql, (err, res) => {
  if (err) {
    throw err
  }
  console.table(res);
  startApp()
});

}
  
  // emoployee by department function 
  function viewEmployeesByDepartment(){
    let query =
    `SELECT 
        department.id, 
        department.name, 
        role.salary
    FROM employee
    LEFT JOIN role 
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id
    GROUP BY department.id, department.name, role.salary`;
  
  connection.query(query,(err, res) => {

      if(err) {
        throw err;
      }
      const departmentChoices = res.map((choices) => ({
          value: choices.id, name: choices.name
      }));
    console.table(res);
    getDepartment(departmentChoices);
  });
}
// department choices function
function getDepartment(departmentChoices) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'Departments',
      choices: departmentChoices
    }
  ]).then((res) => {
    let sql = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name
FROM employee
JOIN role
    ON employee.role_id = role.id
JOIN department
    ON department.id = role.department_id
WHERE department.id = ?`

db.query(sql, res.department, (err, res) => {
  if(err) {
    throw err
  }
  startApp()
  console.table(res);
});
  })
}
// employee add function
function addEmployee() {
  let sql = 
  `SELECT 
      role.id, 
      role.title, 
      role.salary 
  FROM role`

  db.query(sql, (err, res) => {
    if(err) {
      throw err
    }
    const role = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`
    }));
    console.table(res);
    employeeRoles(role);
  });
}
function employeeRoles(role) {
  inquirer
    .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee First Name: "
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee Last Name: "
    },
    {
      type: "list",
      name: "roleId",
      message: "Employee Role: ",
      choices: role
    }
  ]).then((res)=>{
      let sql = `INSERT INTO employee SET ?`
      db.query(sql,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId
      },(err, res) => {
        if(err){
          throw err;
        } 
        startApp();
    });
  });
}
// employee removal








// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
});