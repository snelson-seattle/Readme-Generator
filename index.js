const {render} = require("mustache");
const inquirer = require('inquirer');
const fs = require('fs');

// Inquirer Question List
const questions = [
        {
            type: "input",
            name: "title",
            message: "What is the name of the project?"
        },
        {
            type: "input",
            name: "author",
            message: "Who is the project author?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe the project"
        },
        {
            type: "input",
            name: "repourl",
            message: "What is the URL of the project repository?"
        },
        {
            type: "input",
            name: "contributors",
            message: "Who are the project contributors?"
        },
        {
            type: "input",
            name: "license",
            message: "How is this project licensed?"
        }
];


// Functions
async function askQuestions(questions){
    let answers = [];
    for(let i=0; i<questions.length; i++){
        let answer = await inquirer.prompt([
            {
                type: questions[i]["type"],
                name: questions[i]["name"],
                message: questions[i]["message"]
            }
        ]);
        answers.push(answer);
    } 
    return answers;
}


async function init() {
   let results = await askQuestions(questions);
   
   
}

init();
