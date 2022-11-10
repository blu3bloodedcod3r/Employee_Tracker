SELECT employee.id, employee.first_name, employee.last_name, role.salary
FROM employee
LEFT JOIN role 
    ON role.id = employee.role_id
    WHERE role.id IS NULL
