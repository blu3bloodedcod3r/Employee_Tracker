INSERT INTO department (id, name)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management');

INSERT INTO role (id, title, salary, department_id)
Values (041, 'Payroll', '80000', 001),
    (102, 'Engineer', '120000', 002),
    (053, 'Manager', '100000', 003),
    (854, 'Receptionist', '30000', 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (511, 'Tommy', 'Pickles', 041, 002),
    (652, 'Phillip', 'Montenegro', 053),
    (103, 'Lillian', 'White', 053),
    (904, 'Harold', 'Freeman', 854, 103);

