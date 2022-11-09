INSERT INTO department (id, name)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management');

INSERT INTO role (id, title, salary, department_id)
Values (001, 'Payroll', '80000', 001),
    (002, 'Engineer', '120000', 002),
    (003, 'Manager', '100000', 003),
    (004, 'Receptionist', '30000', 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (001, 'Tommy', 'Pickles', 041, 003),
    (002, 'Phillip', 'Montenegro', 001 , 003),
    (003, 'Lillian', 'White', 001 , 003),
    (004, 'Harold', 'Freeman', 854, 002);

