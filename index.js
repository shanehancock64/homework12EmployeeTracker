const express = require('express');
const mysql = require('mysql'); 

//connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
})