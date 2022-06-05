INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 85000.00, 1), ("Engineer", 100000.00, 2), ("Accountant", 90000.00, 3), ("Lawyer", 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bobby", "Lee", 1, 3), ("Antonio", "Brown", 3, 1), ("Dirk", "Diggler", 4, 2), ("Steve", "O", 1, 2), ("Perry", "Platypus", 2, 2);