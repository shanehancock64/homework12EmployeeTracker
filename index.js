const express = require('express');
const mysql = require('mysql'); 

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
  console.log('Connected to mysql');
})

// create database
