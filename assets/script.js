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

var user = {
    initials: "",
    score: 0
}

var quizCompleted = false;

// initialize time to 0
var time = 0;

// global var to keep track of which question number we're on
var questionNum = 0;

// getting the main section of the html page to append things to
var mainSection = document.getElementById("main-section");

initializeStartPage();

function initializeStartPage(){
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
}

// start timer
// render the first question
function startGame() {
    startTimer();
    nextQuestion();
}
// start the timer 
function startTimer() {
    // set the starting time
    time = 1999999;
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
    questionNum++;
    // check if the user answered all 5 questions
    if (questionNum > 5) {
        quizCompleted = true;
        // set the user's score
        user.score = time;
        document.getElementById("timer").remove();
        return;
    }

    // create question div
    var qDiv = document.createElement("div");
    qDiv.setAttribute("id", "question");
    mainSection.appendChild(qDiv);
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
    var answerChoices = document.createElement("div");
    answerChoices.setAttribute("id", "answer-choices");
    qDiv.appendChild(answerChoices);
    var button1 = renderAnswerChoice(1);
    button1.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[0]);
    };
    answerChoices.appendChild(button1);
    var button2 = renderAnswerChoice(2);
    button2.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[1]);
    };
    answerChoices.appendChild(button2);
    var button3 = renderAnswerChoice(3);
    button3.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[2]);
    };
    answerChoices.appendChild(button3);
    var button4 = renderAnswerChoice(4);
    button4.onclick = function(){
        // call checkCorrectAnswer passing the answer choice that the user chose
        checkCorrectAnswer(questions[questionNum-1].answerChoices[3]);
    };
    answerChoices.appendChild(button4);

}

function renderAnswerChoice(answerChoiceNum) {
    // render the 4 AnswerChoices from the questions global object
    var button = document.createElement('button');
    // add a number in front of the answer choice
    button.setAttribute("class", "button");
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
        timeEl.style.color = "green";
    }
    else {
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
    renderInitialsPage();

    // adds an onclick event listener for the submit button for when the user enters their initials
    var submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", function () {
        user.initials = document.querySelector("#initials").value;
        // validates user input
        if (user.initials == "" || user.initials.length > 3) {
            alert("Please enter valid initials or hit cancel");
        } else {
            // if input is valid, store their score
            var HighScores = storeScore();
            // clear initials screen before displaying scores
            document.querySelector("#enter-intials").remove();
            // display the high scores
            displayScores(HighScores);
        }
    });
}

function renderInitialsPage() {
    // creates initials page div
    var initialsDiv = document.createElement("div");
    initialsDiv.setAttribute("id", "enter-intials");
    mainSection.appendChild(initialsDiv);
    // adds "all done" to page
    var allDone = document.createElement("h2");
    allDone.textContent = "All Done!";
    initialsDiv.appendChild(allDone);
    var finalScoreP = document.createElement("p");
    // display final score
    finalScoreP.textContent = "Your final score is " + user.score;
    initialsDiv.appendChild(finalScoreP);

    // make the initials form appear so user can enter their initials
    var initialsForm = document.getElementById("initials-form");
    initialsForm.style.display = "block";
    initialsDiv.appendChild(initialsForm);
}

function storeScore() {
    var HighScores = JSON.parse(localStorage.getItem("high-scores"));
    if (HighScores == null){
        HighScores = [];
        HighScores.push(user);
        localStorage.setItem("high-scores", JSON.stringify(HighScores));
        return HighScores;
    } 
    // order the HighScores array by user score, lowest to highest
    var highestScore = true;
    for(var i=0; i < HighScores.length; i++) {
        if (HighScores[i].score >= user.score) {
            highestScore = false;
            HighScores.splice(i, 0, user);
            break;
        }
    }
    // if the user's high score is the highest out of the high scores, put it at the end of the HighScores array
    if (highestScore == true) {
        HighScores.push(user);
    }

    //stpre the newly ordered highscores array in localstorage
    localStorage.setItem("high-scores", JSON.stringify(HighScores));
    return HighScores;
    
}

function displayScores(HighScores){
    // create html elements for Highscores page
    var scoresPage = document.createElement("div");
    scoresPage.setAttribute("id", "scores-page");
    mainSection.appendChild(scoresPage);
    var hs = document.createElement("h2");
    hs.textContent = "Highscores";
    scoresPage.appendChild(hs);
    // create a ordered list to display the high scores
    var scoreList = document.createElement("ol");
    scoreList.setAttribute("id", "scores-list");
    // make it a numbered list
    scoreList.setAttribute("type", "1");
    scoresPage.appendChild(scoreList);
    // go through the Highscores array backwards since to display stores highest to lowest
    for(var i=HighScores.length-1; i >= 0; i--) {
        var userObj = HighScores[i];
        var li = document.createElement("li");
        li.textContent = userObj.initials + " - " + userObj.score;
        scoreList.appendChild(li);
    }

    // create go back button
    var goBack = document.createElement("button");
    goBack.setAttribute("class", "button");
    goBack.setAttribute("id", "go-back");
    goBack.setAttribute("type", "Button");
    goBack.textContent = "Go Back";
    scoresPage.appendChild(goBack);

    goBack.addEventListener("click", function () {
        location.reload();
    });


    // create Clear HighScores button
    var clearHighScore = document.createElement("button");
    clearHighScore.setAttribute("class", "button");
    clearHighScore.setAttribute("id", "clear-highscore");
    clearHighScore.setAttribute("type", "Button");
    clearHighScore.textContent = "Clear Highscores";
    scoresPage.appendChild(clearHighScore);

    // if Clear HighScores is clicked, it deletes the high scores from local storage
    clearHighScore.addEventListener("click", function () {
        HighScores = [];
        localStorage.removeItem("high-scores");
        scoreList.style.visibility = 'hidden';
    });

}
