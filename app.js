const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArr = [];

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(answers => {
        const { name, id, email, officeNumber } = answers;
        const manager = new Manager(name, id, email, officeNumber);

        teamArr.push(manager);

        addEmployee();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "employees",
            message: "Which type of team member would you like to add?",
            choices: [
                "Add an Engineer",
                "Add an Intern",
                "I don't want to add any more team members"]
        }
    ]).then(answers => {
        let statement = answers.employees;

        switch (statement) {
            case "Add an Engineer":
                addEngineer();
                break;

            case "Add an Intern":
                addIntern();
                break;

            case "I don't want to add any more team members":
                createTeam();
                break;
        }
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github username?"
        }
    ]).then(answers => {
        const { name, id, email, github } = answers;
        const engineer = new Engineer(name, id, email, github);

        teamArr.push(engineer);

        addEmployee();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school name?"
        }

    ]).then(answers => {
        var { name, id, email, school } = answers;
        var intern = new Intern(name, id, email, school);

        teamArr.push(intern)

        addEmployee();
    })
}

createManager();

function createTeam() {
    fs.writeFileSync(outputPath, render(teamArr), "utf-8");
}