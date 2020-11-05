let {render} = require("mustache");
const inquirer = require('inquirer');
const fs = require('fs');
const path = require("path");

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
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "repourl",
            message: "What is the URL of the project's GitHub repository?"
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

// Markdown Template
let template = fs.readFileSync("./template.md").toString();
let templateData = {
    title: "",
    author: "",
    description: "",
    repourl: "",
    contributors: "",
    license: ""
}

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
    console.log(results);
    for(let i=0; i<results.length; i++){
        if(templateData.hasOwnProperty(Object.keys(results[i]))){
            templateData[Object.keys(results[i])] = Object.values(results[i]).pop();
        }
    }
    let output = render(template, templateData);
    fs.writeFile(`./readmes/${templateData.title}.md`, output, err => {
        if(err){
            console.log("Error: " + err);
        }
    });
    
    
}

init();
