//requiring dependencies 

const mysql = require('mysql');
const inquirer = require('inquirer');

//creating connection to database

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  password: 'password',
  database: 'employeeTracker_db',
});

//confirming connection + initializing CLI sequence

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  init();
  // connection.end();
});

//defining CLI sequence using inquierer

function init(){
  inquirer
  .prompt ([
    {
      type: "list",
      message: "What would you like to do?",
      name: "init",
      choices: [
        "Create New Employee Listing",
        "View Employee Roster",
        "Update Employee Listing",
        "Remove Current Employee",
        "Create New Department Listing",
        "View Current Department Roster",
        "Create New Employee Role",
        "View Current Roles",
        "Exit"
      ]
    }
  ])
  .then (function(res){
    switch (res.init){

      case "Create New Employee Listing":
        createEmployee();
        break;

      case "View Employee Roster":
        seeEmployees();
        break;

      case "Update Employee Listing":
        updateEmployee();
        break;          

      case "Remove Current Employee":
        cutEmployee();
        break;

      case "Create New Department Listing":
        createDepartment();
        break;

      case "View Current Department Roster":
        seeDepartments();
        break;

      case "Create New Employee Rople":
        createRole();
        break;

      case "View Current Roles":
        seeRoles();
        break;

      case "Exit":
        connection.end();
        break;
    
    }
  })
}

//defining createEmployee CLI sequence, followed by an INSERT query

function createEmployee() {
  console.log("Creating a new employee listing");
  inquirer
  .prompt ([
    {
      type: "input",
      message: "First Name?",
      name: "firstname",
    },
    {
      type: "input",
      message: "Last Name?",
      name: "lastname",
    },
    {
      type: "list",
      message: "what is the employee's role?",
      name: "roleid",
      choices: [1,2,3]
    },
    {
      type: "input",
      message: "Who is their manager? (please use managerid as a number",
      name: "managerid"
    }
  ])
  .then (function(res){
    console.log(res);
    const query = connection.query(
      "INSERT INTO employee SET ?",
      res,
      function(err, res) {
        if (err) throw err;
        console.log("Employee has been added");

        init();
      }
  );
  });
};

//defining view all employee function, which initializes a SELECT FROM query, and placing results in a table

function seeEmployees() {

  connection.query(
        "SELECT * FROM employee",
  function(err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

//defining remove employee function, which establishes a Roster array, and initializes a query for SELECT and DELETE from existing EMPLOYEES table

function cutEmployee(){
  let roster = [];
  connection.query(
    "SELECT employee.firstname, employee.lastname FROM employees", (err,res) => {
      for (let i = 0; i < res.length; i++){
        roster.push(res[i].firstname + " " + res[i].lastname);
      }
  inquirer 
  .prompt ([ 
    {
      type: "list", 
      message: "Select an employee to cut.",
      name: "employee",
      choices: roster

    },
  ])
  .then (function(res){
    const query = connection.query(
      `DELETE FROM employees WHERE concat(firstname, ' ' ,lastname) = '${res.employee}'`,
        function(err, res) {
        if (err) throw err;
        console.log( "Employee has been deleted");
     init();
    });
    });
    }
      );
      };

//defining create department function, which takes CLI data from the user and INSERTS data INTO DEPARTMENTS column in the DEPARTMENT table
     
  function createDepartment(){
          inquirer
          .prompt([
            {
              type: "input",
              name: "departmentTitle", 
              message: "What is the name of this department?"
            }
          ])
          .then(function(res){
            console.log(res);
            const query = connection.query(
              "INSERT INTO departments SET ?", 
              {
                name: res.departmentTitle
              }, 
              function(err, res){
                connection.query("SELECT * FROM departments", function(err, res){
                  console.table(res); 
                  init(); 
                })
              }
            )
          })
        }

//defining view all departments function, which initializes a query to SELECT all columns from the DEPARTMENTS table, and releases a console.table with all departments
function seeDepartments(){
          connection.query ("SELECT * FROM departments", function(err, res){
            console.table(res);
            init();
          })
          }

//defining createRole function, which takes in user data via CLI and initalizes INSERT query to insert response into corresponding fields

function createRole() {
     inquirer
    .prompt([
      {
      type: "input", 
      name: "title",
      message: "What is the title of the new role?"
  },
  {
      type: "input",
      name: "salary",
      message: "What is the salary for the new role?"
  },
    ])
    .then (function(res){
      console.log(res);
      const query = connection.query(
        "INSERT INTO roles SET ?",
        {
          title: res.title,
          salary: res.salary,
          departmentid: res.department
        },
        function (err,res){
          if (err, res){
            if (err) throw err;
            init();
          }
        }
      )
    })
  }

//defining view all current roles function, which initializes a query to SELECT all from ROLES table, and display in a console.table

function seeRoles(){
  connection.query ("SELECT * FROM role", function(err, res){
    console.table(res);
    init();
  })
  }


function updateEmployee(){
  connection.query ("UPDATE ?? FROM employee")
}

// all functions lead back to initial CLI function