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

var quizCompleted = false;

// initialize score / time to 0
var time = 0;
var score = 0;

// global var to keep track of which question number we're on
var questionNum = 0;

// intialize start screen
// hide the initialsForm which will be used later
var initialsForm = document.getElementById("initials-form");
initialsForm.style.display = "none";

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
    startTimer();
    nextQuestion();
}
// start the timer 
function startTimer() {
    // console.log("starting the timer");
    // set the starting time
    time = 1;
    var timeEl = document.getElementById("timer");
    timeEl.textContent = "Time: " + time;
    var timerInterval = setInterval(function() {
       
        // update the displayed time left
        timeEl.textContent = "Time: " + time;

        if(time === 0 || quizCompleted) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // clears the screen of current question
            qDiv = document.getElementById("question");
            // removes the question from screen if user runs out of time
            if (qDiv != null) {
                qDiv.remove();
            }
            // removes the timer from the screen
            timeEl.remove();
            // stops the game
            gameOver();
        }
         // take a second off the time left
         time--;
    }, 1000);


}

function nextQuestion(){
    // console.log("nextQuestion");
    questionNum++;
    // check if the user answered all 5 questions
    if (questionNum > 5) {
        quizCompleted = true;
        // set the user's score
        score = time;
        document.getElementById("timer").remove();
        return;
    }

    // create question div
    var qDiv = document.createElement("div");
    qDiv.setAttribute("id", "question");
    document.body.appendChild(qDiv);
    var qObj = questions[questionNum-1];
    // get the question
    var qText = document.createElement("h2");
    qText.textContent = qObj.question;
    // render it to the page
    qDiv.appendChild(qText);
    // call generateAnswerButtons and send it the question div we created
    generateAnswerButtons(qDiv);
}

function generateAnswerButtons(qDiv) {
    var button1 = renderAnswerChoice(1);
    button1.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[0]);
    };
    qDiv.appendChild(button1);
    var button2 = renderAnswerChoice(2);
    button2.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[1]);
    };
    qDiv.appendChild(button2);
    var button3 = renderAnswerChoice(3);
    button3.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[2]);
    };
    qDiv.appendChild(button3);
    var button4 = renderAnswerChoice(4);
    button4.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[3]);
    };
    qDiv.appendChild(button4);

}

function renderAnswerChoice(answerChoiceNum) {
    // render the 4 AnswerChoices from the questions global object
    var button = document.createElement('button');
    // add a number in front of the answer choice
    var answerChoice = questions[questionNum-1].answerChoices[answerChoiceNum-1];
    answerChoice = answerChoiceNum + ". " + answerChoice;
    // add the answer choice to the html
    button.innerHTML = answerChoice;
    return button;
}

function checkCorrectAnswer(userAnswer){
    // get the correct answer of question questionNum from the questions object
    var correctAnswer = questions[questionNum-1].correctAnswer;
    var timeEl = document.getElementById("timer");
    // compare the right answer to the answer the user chose
    if (userAnswer == correctAnswer) {
        console.log("Correct!");
        timeEl.style.color = "green";
    }
    else {
        console.log("Wrong!");
        timeEl.style.color = "red";
        time = time - 10;
        // make sure that time can't get less than 0
        if(time < 0) {
            time = 0;
        }
        timeEl.textContent = "Time: " + time;
    }
    // remove the current question from the page before going on to the next question 
    qDiv = document.getElementById("question");
    qDiv.remove();

    nextQuestion();
}

function gameOver() {
    console.log("Game Over");
    renderInitialsPage();
}

function renderInitialsPage() {
    var initialsDiv = document.createElement("div");
    initialsDiv.setAttribute("id", "enter-intials");
    document.body.appendChild(initialsDiv);
    var allDone = document.createElement("h2");
    allDone.textContent = "All Done!";
    initialsDiv.appendChild(allDone);
    var finalScoreP = document.createElement("p");
    finalScoreP.textContent = "Your final score is " + score;
    initialsDiv.appendChild(finalScoreP);

    var initialsForm = document.getElementById("initials-form");
    initialsForm.style.display = "block"
    initialsDiv.appendChild(initialsForm);
}
