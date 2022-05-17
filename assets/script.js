/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

//initialize questions object

const question1 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerChoices: ["Javascipt", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
};
const question2 = {
    question: "Commonly used data types DO NOT include:",
    answerChoices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
};
const question3 = {
    question: "The condition in an if / else statement is enclosed within ___.",
    answerChoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
};
const question4 = {
    question: "String values must be enclosed within ___ when being assigned to variables",
    answerChoices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
}
const question5 = {
    question: "Arrays in JavaScript can be used to store",
    answerChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
};

var questions = [question1, question2, question3, question4, question5];

var player = {
    correct: [],
    incorrect: [],
    score: 0
};

var questionNum = 0;

// intialize start screen
var startButton = document.getElementById("start-quiz");
// if button start button is pressed
startButton.addEventListener("click", function(event) {
     // wipe out start screen  
    var startScreen = document.querySelector("#start-screen");
    startScreen.remove();
    // start game
    startGame();
});

// start timer
// render the first question
function startGame() {
    nextQuestion();
}
// start the timer 
function startTimer() {
    console.log("starting the timer");
    // set the starting time
}

function nextQuestion(){
    console.log("nextQuestion");
    questionNum++;
    if (questionNum > 5) {
        return;
    }
    console.log("questionNum: " + questionNum);
    var qObj = questions[questionNum-1];
    // get the question
    var qText = document.createElement("h2");
    qText.textContent = qObj.question;
    // render it to the page
    document.body.appendChild(qText);
    generateAnswerButtons();
}

function generateAnswerButtons() {
    console.log("generateAnswerButtons");
    var button1 = renderAnswerChoice(1);
    button1.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[0]);
    };
    document.body.appendChild(button1);
    var button2 = renderAnswerChoice(2);
    button2.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[1]);
    };
    document.body.appendChild(button2);
    var button3 = renderAnswerChoice(3);
    button3.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[2]);
    };
    document.body.appendChild(button3);
    var button4 = renderAnswerChoice(4);
    button4.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[3]);
    };
    document.body.appendChild(button4);

}

function renderAnswerChoice(answerChoiceNum) {
    // render the 4 AnswerChoices from the questions global object
    var button = document.createElement('button');
    // add a number in front of the answer choice
    var answerChoice = questions[questionNum-1].answerChoices[answerChoiceNum-1];
    answerChoice = answerChoiceNum + ". " + answerChoice;
    // add the answer choice to the html
    button.innerHTML = answerChoice;
    // button.setAttribute("choice-number", i+1);
    return button;
}

function checkCorrectAnswer(userAnswer){
    // get the correct answer of question questionNum from the questions object
    var correctAnswer = questions[questionNum-1].correctAnswer;
    // compare the right answer to the answer the user chose
    if (userAnswer == correctAnswer) {
        console.log("Correct!");
    }
    else {
        console.log("Wrong!");
    }
    nextQuestion();
}
