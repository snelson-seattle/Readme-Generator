const inquirer = require('inquirer');
const fs = require('fs');


const fileName = "./develop/readme.md";

const technologies = [
    "node.js",
    "jQuery",
    "Expresss",
    "React",
    "Bootstrap"    
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
            name: "repourl",
            message: "What is the repository URL?"
        },
        {
            type: "input",
            name: "license",
            message: "How is the project licensed?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe the project"
        },
        {
            type: "checkbox",
            name: "technologies",
            choices: [
                technologies[0],
                technologies[1],
                technologies[2],
                technologies[3],
                technologies[4],         
              ]
        },        
        {
            type: "input",
            name: "intro",
            message: "Write an introduction to the project"
        },
        {
            type: "input",
            name: "contributors",
            message: "Who are the project contributors?"
        }
        
    ]).then(response => {        
        let file = `
            # ${response.title}
            ___
            ## Project Description
            ${response.description}
            ___
            ## Table of Contents
            1. [Introduction](#introduction)
            2. [Technologies](#technologies)
            3. [Contributors](#contributors)
            4. [License](#license)
            ___
            ## Introduction
            ${response.intro}
            ___
            ## Technologies
            ${response.technologies}
            ___
            ## Contributors
            ${response.contributors}
            ___
            ## License
            ${response.license}
        
        `;
        console.log(file);
        writeToFile(fileName, file);
    });
}

init();
