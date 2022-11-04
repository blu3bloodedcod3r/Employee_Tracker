DROP DATABASE IF EXISTS
CREATE tables

USE tables

CREATE TABLE department (
    id INT,
    name varchar(30)
)

CREATE TABLE role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    departement_id INT
)

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)