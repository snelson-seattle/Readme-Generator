const inquirer = require('inquirer');
const fs = require('fs');


const fileName = "./develop/readme.md";

const questions = [
    
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err){
            console.log("Error: " + err);
        }
    });
}

function init() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of this project?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe the project"
        },
        {
            type: "input",
            name: "githuburl",
            message: "What is your GitHub profile URL?"
        },
        {
            type: "input",
            name: "linkedinurl",
            message: "What is your LinkedIn profile URL?"
        }
    ]).then(response => {
        let file = `
            # ${response.title}

            ## Project Description
            ${response.description}
        
        `;
        console.log(file);
        writeToFile(fileName, file);
    });
}

init();
