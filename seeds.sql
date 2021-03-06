USE employeeTracker_db;

-- //department array
INSERT INTO departments (name)
VALUES ("Marketing");
INSERT INTO departments (name)
VALUES ("Accounts");
INSERT INTO departments (name)
VALUES ("Human Resources");
INSERT INTO departments (name)
VALUES ("Counsel");


-- //role array
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Director", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 80000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Internal HR Manager", 150000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Counsel", 120000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Head of Accounts", 125000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Paralegal", 250000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Copywriter", 190000, 1);

-- //employee array
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ralph","Knowles", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kathy","Underhill", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Shep","Proudfoot", 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kevin","Character", 3, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Idris","Elba", 6, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Louise","Math", 3, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Red","Green", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Gaius","Baltar", 2, 4);
