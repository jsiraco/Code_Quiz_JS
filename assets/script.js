let score = 0;
let secondsLeft = 5;
let highScores = [];

const timeEl = document.querySelector(".time");
const start = document.querySelector(".start");
const qSection = document.querySelector(".section");
const Desc = document.getElementById("description");
const gameover = document.getElementById("gameover");
const questionOne = document.getElementById("question-one");

start.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
});

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

function nextQuestion() {

}

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " second(s) remaining";

        if (secondsLeft === 0) {
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
}

