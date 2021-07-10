let score = 0;
let initials = "";
let secondsLeft = 5;

const timeEl = document.querySelector(".time");

let removeDesc = document.getElementById("description");
let removeStart = document.getElementById("start");
let gameover = document.getElementById("gameover");

function startQuiz() {
    hideText();
    setTime();
}

function hideText() {
    removeStart.classList.remove("show");
    removeStart.classList.add("hide");

    removeDesc.classList.remove("show");
    removeDesc.classList.add("hide");

}

function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " second(s) remaining";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "";
    let gameover = document.getElementById("gameover");
    gameover.classList.add("show");
}

