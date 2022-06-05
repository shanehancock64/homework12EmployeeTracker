const express = require('express');
const mysql = require('mysql2'); 
const cTable = require('console.table');
const { append } = require('express/lib/response');
const app = express();
//connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
})

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Great success connected to Mysql!');
});
// create database
db.query("CREATE DATABASE employeeTracker", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

// create employee table
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Table!");
  var sql = 'CREATE TABLE Employee (id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)';
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
// app.get('createemployee', (req, res) => {
// let sql = 'CREATE TABLE Employee (id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)'
// db.query(sql, err => {
//   if (err) {
//     throw err
//   }
//   res.send('Employee Table created successfully');
// });
// });



// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
})