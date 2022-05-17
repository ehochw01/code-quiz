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
    answerChoices: ["Javascipt", "terminal/bash", "for loops", "console.log"]
};
const question2 = {
    question: "Commonly used data types DO NOT include:",
    answerChoices: ["strings", "booleans", "alerts", "numbers"]
};
const question3 = {
    question: "The condition in an if / else statement is enclosed within ___.",
    answerChoices: ["quotes", "curly brackets", "parentheses", "square brackets"]
};
const question4 = {
    question: "String values must be enclosed within ___ when being assigned to variables",
    answerChoices: ["commas", "curly brackets", "quotes", "parentheses"]
}
const question5 = {
    question: "Arrays in JavaScript can be used to store",
    answerChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"]
};

var questions = [question1, question2, question3, question4, question5];

console.log(questions);

// intialize start screen
var startButton = document.getElementById("start-quiz");
// if button start button is pressed
startButton.addEventListener("click", function(event) {
    startGame();
});

// start timer
// render the first question
function startGame() {
    console.log("start game");
    // wipe out start screen  
    var startScreen = document.querySelector("#start-screen");
    startScreen.remove();
}
// start the timer 
function startTimer() {
    console.log("starting the timer");
    // set the starting time
}


