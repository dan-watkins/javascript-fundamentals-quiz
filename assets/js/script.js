var scoreEl = document.querySelector(".scores");
var timeEl = document.querySelector(".timer");
var questionEl = document.querySelector(".questions");
var question1 = document.createElement("p");
var answerList = document.createElement("ul");
var answers = document.createElement("li");
var questions = "What is the answer?";
var possibleAnswers = ["A","B","C","D"];
var timeLeft = 10;
var timerInterval;
var f = document.createElement("form");
f.setAttribute("method", "post");
f.setAttribute("action", "submit");
var i = document.createElement("input");
i.setAttribute('type',"text");
i.setAttribute('name',"initials");
var s = document.createElement("input"); 
s.setAttribute('type',"submit");
s.setAttribute('value',"Submit");

// This timer is passed down to the "Start Quiz" button and decrements time by 1 second
var countdown = function() {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Time's up!");
    }
}

function setTime () {
    // This avoids multiple countdowns from being run if spamming the start quiz button
    if (timerInterval) {
        clearInterval(timerInterval);
    };
    timerInterval = setInterval(countdown, 1000);
    timeLeft = 10;
    timeEl.textContent = timeLeft;
}

// Creates and displays the question and possible answers as li's of an ul.
function showQuestions(event) {
    answerList.innerHTML="";
    questionEl.appendChild(question1);
    question1.innerText=questions;
    question1.appendChild(answerList);
    for (let i = 0; i < possibleAnswers.length; i++) {
        var newAnswer = document.createElement("li")
        answerList.appendChild(newAnswer);
        newAnswer.innerText = possibleAnswers[i];
    }
    saveScore(event);
}

function saveScore(event) {
    document.getElementById("submit").appendChild(f);
    f.appendChild(i);
    i.onclick = i.select();
    f.appendChild(s);
    event.preventDefault(event);
    localStorage.setItem("initials", i.value);
}

function startQuiz(event) {
    setTime();
    showQuestions(event);
}

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

document.getElementById("quiz").addEventListener("click", startQuiz);
document.getElementById("submit").addEventListener("click", saveScore, false);
