const {render} = require("mustache");
const inquirer = require('inquirer');
const fs = require('fs');


const fileName = "./develop/README.md";

const questions = [
        {
            type: "input",
            name: "title",
            message: "What is the name of the project?"
        },
        {
            type: "input",
            name: "author",
            message: "What is your name?"
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
            name: "license",
            message: "How is this project licensed?"
        },
        {
            type: "input",
            name: "intro",
            message: "Write an introduction for your project."
        }

];



function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err){
            console.log("Error: " + err);
        }
    });
}

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
   
}

init();
