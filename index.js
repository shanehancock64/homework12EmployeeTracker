const express = require('express');
const mysql = require('mysql2'); 

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
db.query("CREATE DATABASE schema", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});