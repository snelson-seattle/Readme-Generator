// Import javascript libraries
const {render} = require("mustache");
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
            name: "executable",
            message: "What is the node.js entry point of your application? (ex. app.js, index.js)"
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
        },
        {
            type: "input",
            name: "email",
            message: "What is your contact email for this project?"
        }
];

// Markdown Template
let template = fs.readFileSync("./template.md").toString();
let templateData = {
    title: "",
    author: "",
    email: "",
    executable: "",
    username: "",
    description: "",
    repourl: "",
    contributors: "",
    license: ""
}

// Functions
async function askQuestions(questions){
    let answers = [];
    for(let i=0; i<questions.length; i++){
        // loop through the array of inquirer questions listed above
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
    let results = await askQuestions(questions);  // results is an array of objects

    for(let i=0; i<results.length; i++){
        if(templateData.hasOwnProperty(Object.keys(results[i]))){
            // Find the keyname in templateData that matches keyname in results and then assign the value from results[keyname] to templateData[keyname]
            templateData[Object.keys(results[i])] = Object.values(results[i]).pop();
        }
    }
    let output = render(template, templateData); // Use mustache.js to render the content of readme.md file

    // Create the readme.md file
    fs.writeFile("./readmes/readme.md", output, err => {
        if(err){
            console.log("Error: " + err);
        }
    });
    
    
}

init();
