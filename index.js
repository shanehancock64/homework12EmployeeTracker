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




// Port Listening
app.listen('3001', () => {
  console.log("Listening on port 3001 my guy!");
})