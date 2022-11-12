INSERT INTO department (id, name)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management');

INSERT INTO role (id, title, salary, department_id)
Values (001, 'Payroll', '$80,000', 001),
    (002, 'Engineer', '$120,000', 002),
    (003, 'Manager', '$100,000', 003),
    (004, 'Receptionist', '$30,000', 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (001, 'Tommy', 'Pickles', 002, 002),
    (002, 'Phillip', 'Montenegro', 001 , 003),
    (003, 'Lillian', 'White', 003 , 003),
    (004, 'Harold', 'Freeman', 001, 002);

