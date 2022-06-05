








// // create database
// app.get('/createdb', (req, res) => {
//   let sql = "CREATE DATABASE employeeTracker"
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     res.send("Database created");
//     console.log('Database created');
// });

// });

// // create employee table
// app.get('/createemployee', (req, res) => {
//   let sql = 'CREATE TABLE employee (id INT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT)'
//   db.query(sql, err => {
//     if (err) {
//       throw err
//     }
//     res.send('Employee Table created successfully');
//     console.log('Table created successfully');
// });
// });

// // insert employee
// app.get('/employee1', (req, res) => {
//   let post = {first_name: 'John', last_name: 'Doe', id:1}
//   let sql = 'INSERT INTO employee SET ?'
//   let query = db.query(sql, post, err => {
//     if (err) {
//       throw err
//     }
//     res.send('Employee added')
//   });
// });
