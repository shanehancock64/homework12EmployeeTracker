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
  user: 'root',
  password: 'password',
  database: 'employee_tracker'
})

db.connect(err => {
  if (err) {
    throw err;
  }
  startApp();
  console.log('Great success connected to Mysql!');
});

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
      message: "Employee's First Name: "
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee's Last Name: "
    },
    {
      type: "list",
      name: "roleId",
      message: "Employee's Role: ",
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
function removeEmployee() {
  let sql =  `SELECT
  employee.id, 
  employee.first_name, 
  employee.last_name
FROM employee`

db.query(sql, (err, res) => {
  if (err) {
    throw err
  }
  const employee = res.map(({ id, first_name, last_name }) => ({
    value: id,
    name: `${id} ${first_name} ${last_name}`
  }));
  console.table(res);
  getDelete(employee);
})
}
function getDelete(employee){  
  inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Employee To Be Deleted: ",
        choices: employee
      }
    ]).then((res)=>{
      let sql = `DELETE FROM employee WHERE ?`;
      db.query(sql, { id: res.employee },(err, res) => {
        if(err) { 
          throw err;}

        startApp();
      });
    });
}

// updateEmployeeRole 
function updateEmployeeRole(){
  let sql = `SELECT 
                  employee.id,
                  employee.first_name, 
                  employee.last_name, 
                  role.title, 
                  department.name, 
                  role.salary, 
                  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              JOIN role
                  ON employee.role_id = role.id
              JOIN department
                  ON department.id = role.department_id
              JOIN employee manager
                  ON manager.id = employee.manager_id`

  db.query(sql,(err, res) => {
    if(err){
      throw err;
    }
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
       name: `${first_name} ${last_name}`      
    }));
    console.table(res);
    updateRole(employee);
  });
}

function updateRole(employee){
let sql = 
`SELECT 
  role.id, 
  role.title, 
  role.salary 
FROM role`

db.query(sql,(err, res) => {
  if(err){
    throw err;
  }
  let roleChoices = res.map(({ id, title, salary }) => ({
    value: id, 
    title: `${title}`, 
    salary: `${salary}`      
  }));
  console.table(res);
  getUpdatedRole(employee, roleChoices);
});
}
function getUpdatedRole(employee, roleChoices) {
  inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: `Which employee do you want to update?: `,
        choices: employee
      },
      {
        type: "list",
        name: "role",
        message: "Select the New Role: ",
        choices: roleChoices
      },

    ]).then((res)=>{
      let sql = `UPDATE employee SET role_id = ? WHERE id = ?`
      db.query(sql,[ res.role, res.employee],(err, res) => {
          if(err){
            throw err;
          }
          startApp();
        });
    });
}

// adding role 
function addRole(){
  let sql = 
  `SELECT 
    department.id, 
    department.name, 
    role.salary
  FROM employee
  JOIN role
    ON employee.role_id = role.id
  JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name`

  db.query(sql,(err, res) => {
    if(err){
      throw err;
    }
    const department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`
    }));
    console.table(res);
    addToRole(department);
  });
}

function addToRole(department){
  inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: "
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: "
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department
      },
    ]).then((res)=>{
      let sql = `INSERT INTO role SET ?`;

      db.query(sql, {
          title: res.title,
          salary: res.salary,
          department_id: res.department
      },(err, res) => {
          if(err){
            throw err;
          } 
          startApp();
      });
  });
}

// adding department
function addDepartment(){
inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: " Name of Department: "
    }
  ]).then((res)=>{
  let sql = `INSERT INTO department SET ?`;
  db.query(sql, {name: res.name},(err, res) => {
    if(err){
      throw err;
    } 
    startApp();
  });
});
}





// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
});