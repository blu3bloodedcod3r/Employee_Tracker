DROP DATABASE IF EXISTS employee_info;
CREATE DATABASE employee_info;

USE employee_info;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name varchar(30)
)

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    departement_id INT
    FOREIGN KEY (id)
    references department(id)
)

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT 
    FOREIGN KEY (role_id)
)