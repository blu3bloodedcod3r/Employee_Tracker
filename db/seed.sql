INSERT INTO department (id, name)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management'),
    (004, 'Receptionist');

INSERT INTO role (id, title, salary, department_id)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management'),
    (004, 'Receptionist');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
Values (001, 'Accounting'),
    (002, 'Staff'),
    (003, 'Management'),
    (004, 'Receptionist');

