DROP DATABASE IF EXISTS employee_info;
CREATE DATABASE employee_info;

USE employee_info;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL Auto-Increment,
    name varchar(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL Auto-Increment,
    title VARCHAR(30),
    salary INT,
    department_id INT,
    FOREIGN KEY (department_id)
    references department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL Auto-Increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    references role(id)
    ON DELETE SET NULL
);