let scoreCount = 0;
let secondsLeft = 5;
let highScores = [];

const timeEl = document.querySelector(".time");
const start = document.querySelector(".start");

const qSection = document.querySelector(".qSection");
const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const questionFour = document.getElementById("question-four");


const answerEl = document.querySelector(".true");
const wrong = document.querySelector(".false");

const scoreSection = document.querySelector(".scoreSection");
let listOfScores = document.querySelector("#highscore-list");
let intialsInput = document.querySelector("#initials");
const intialsConfrim = document.querySelector(".confirm-initials");

const Desc = document.getElementById("description");
const gameover = document.getElementById("gameover");

const questions = [
    questionOne,
    questionTwo,
    questionThree,
    questionFour
]

function init() {
    getScore();
    getInitials();
    scoreList();
}

function getScore() {
    localStorage.getItem("score", scoreCount);
}

function getInitials() {
    localStorage.getItem("intials", JSON.stringify(highScores))
}

function startQuiz() {
    hideText();
    setTime();
    questionsStart();
}

function hideText() {
    start.classList.remove("show");
    start.classList.add("hide");

    Desc.classList.remove("show");
    Desc.classList.add("hide");
}

function questionsStart() {
    questionOne.classList.remove("hide");
    questionOne.classList.add("show");
}

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

function sendMessage() {
    timeEl.textContent = "";
    qSection.classList.remove("show");
    qSection.classList.add("hide");

    gameover.classList.add("show");

    scoreSection.classList.remove("hide");
    scoreSection.classList.add("show");
}

function scoreList() {
    for (let i = 0; i < listOfScores.length; i++) {
        let listChild = listOfScores[i];

        let li = document.createElement("li");
        li.textContent = listChild;
        highScores.appendChild(listChild);
        console.log(highScores);
    }
}


intialsConfrim.addEventListener("click", function () {
    let highScores = {
        intials: intialsInput.value.trim().toUpperCase(),
        score: scoreCount
    };

    if (intialsInput === "") {
        return;
    }

    localStorage.setItem("highscore", JSON.stringify(highScores));
});

start.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
});

answerEl.addEventListener("click", function () {
    let newScore = scoreCount++;
        questionOne.classList.remove("show");
        questionOne.classList.add("hide");

        questionTwo.classList.remove("hide");
        questionTwo.classList.add("show");
    return newScore;
});

wrong.addEventListener("click", function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " second(s) remaining";
});

init();