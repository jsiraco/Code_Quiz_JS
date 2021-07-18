//Global variables for score, time, highscores
let scoreCount = 0;
let secondsLeft = 8;
let highScores = [];
let scores = [];

//Selectors for the start button and time display
const timeEl = document.querySelector(".time");
const start = document.querySelector(".start");

//selectors for the questions
const qSection = document.querySelector(".qSection");
const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const questionFour = document.getElementById("question-four");

//selectors for the question answers
const answerEl = document.querySelector(".one-true");
const answerElTwo = document.querySelector(".two-true");
const answerElThree = document.querySelector(".three-true");
const answerElFour = document.querySelector(".four-true");

//selectors for the score section and intials entry 
const scoreSection = document.querySelector(".scoreSection");
let intialsInput = document.querySelector("#initials");
const intialsConfrim = document.querySelector(".confirm-initials");

//selectors for the score area
let scoreList = document.querySelector("#highscore-list");
let highScoreArea = document.querySelector(".highscores");

//selectors for the description, gameover, and score button
const Desc = document.getElementById("description");
const gameover = document.getElementById("gameover");
const scoreBtn = document.querySelector(".score-btn")

//selector for the retry button 
const retryBtn = document.querySelector(".retry");

let list = document.getElementById("myList");

//renders the scores upon page load
function init() {

    let storedHighScores = JSON.parse(localStorage.getItem("highScore"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    } 
}

//renders the list of highscores
function renderScores() {
    let data = JSON.parse(localStorage.getItem("highScore"));
    data.sort();

    data.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = JSON.stringify(item);
        list.appendChild(li);
    })
}

//Calls the function to hide text, show questions, and start the timer
function startQuiz() {
    hideText();
    setTime();
    questionsStart();
}

//this function removes the start and score buttons and and descriptions
function hideText() {
    start.classList.remove("show");
    start.classList.add("hide");

    Desc.classList.remove("show");
    Desc.classList.add("hide");
}

//This function shows the questions when called 
function questionsStart() {
    questionOne.classList.remove("hide");
    questionOne.classList.add("show");
}

//This function creates a global timer that counts down from 10 and sends a function on o
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " second(s) remaining";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}

//When called, the timer element is set to an empty string
//The questions are removed, and the name entry and gameover screen is shown
function sendMessage() {
    timeEl.textContent = "";
    qSection.classList.remove("show");
    qSection.classList.add("hide");

    gameover.classList.add("show");

    scoreSection.classList.remove("hide");
    scoreSection.classList.add("show");
}

//This function creates a new object using the users score and initials
//
function createHighScore() {
    let newHighScores = {
        intials: intialsInput.value.trim().toUpperCase(),
        score: scoreCount
    };

    highScores.push(JSON.stringify(newHighScores));

    let scoreObj = JSON.stringify(highScores)

    if (intialsInput === "") {
        return;
    }

    localStorage.setItem("highScore", scoreObj);
}


//When user's initials are entered, the highscores are shown and the users score is added
intialsConfrim.addEventListener("click", function () {

    scoreSection.classList.add("hide");
    scoreSection.classList.remove("show");

    gameover.classList.add("hide");
    gameover.classList.remove("show");

    createHighScore();
    renderScores();

    highScoreArea.classList.add("show");
    highScoreArea.classList.remove("hide");


});

//On click, startQuiz funtion is executed
start.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
});

//This button hides everything and shows the highscores
scoreBtn.addEventListener("click", function () {
    highScoreArea.classList.add("show");
    highScoreArea.classList.remove("hide");

    timeEl.classList.add("hide");
    timeEl.classList.remove("show");
    hideText();
    createHighScore();
    renderScores();


});

//These two event listeners attach a function to every true and false answer
//If it is a true answer, the score will increase, if false, a second will be lost
document.querySelectorAll(".true").forEach(item => {
    item.addEventListener("click", function() {
        let newScore = scoreCount++;
        return newScore;
    })
});

document.querySelectorAll(".false").forEach(item => {
    item.addEventListener("click", function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " second(s) remaining";
    })
});


//These three event listeners hide the current question and show the next
answerEl.addEventListener("click", function () {
    questionOne.classList.remove("show");
    questionOne.classList.add("hide");

    questionTwo.classList.remove("hide");
    questionTwo.classList.add("show");
});

answerElTwo.addEventListener("click", function () {
    questionTwo.classList.remove("show");
    questionTwo.classList.add("hide");

    questionThree.classList.remove("hide");
    questionThree.classList.add("show");

});

answerElThree.addEventListener("click", function () {
    questionThree.classList.remove("show");
    questionThree.classList.add("hide");

    questionFour.classList.remove("hide");
    questionFour.classList.add("show");

});

//This fourth event listener will set the time = 0 triggering the gameover state
answerElFour.addEventListener("click", function () {
    secondsLeft = 0;
});

//This event listener reloads the page and allows the user to try again
retryBtn.addEventListener("click", function () {
    history.go(0);
});

//this initializes the application
init();