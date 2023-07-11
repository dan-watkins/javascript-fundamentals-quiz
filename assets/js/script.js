var scoreEl = document.querySelector(".scores");
var timeEl = document.querySelector(".timer");
var questionEl = document.querySelector("#questions");
var question1 = document.createElement("p");
var answerList = document.createElement("ul");
var answers = document.createElement("li");

var questions = [
    {
        question: "what is the answer to question 1?",
        choices: ["Letter A","Letter B","Letter C","Letter D"],
        answer: 1
    },
    {
        question: "what is the answer to question 2?",
        choices: ["Letter E","Letter F","Letter G","Letter H"],
        answer: 2
    },
    {
        question: "what is the answer to question 3?",
        choices: ["Letter I","Letter J","Letter K","Letter L"],
        answer: 3 
    },
    {
        question: "what is the answer to question 4?",
        choices: ["Letter M","Letter N","Letter O","Letter P"],
        answer: 4
    }
]

var chosenAnswer = "";
var timeLeft = 10;
var timerInterval;
var winCount = 0;
var lossCount = 0;

// The below variables generate the form that is created for the submission of the score
var f = document.createElement("form");
f.setAttribute("method", "post");
f.setAttribute("action", "submit");
var inputEl = document.createElement("input");
inputEl.setAttribute('type',"text");
inputEl.setAttribute('name',"initials");
var s = document.createElement("button"); 
s.setAttribute('type',"submit");
s.textContent = "Submit";

// This timer is passed down to the "Start Quiz" button and decrements time by 1 second
var countdown = function() {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Time's up!");
        saveScore(event);
    }
}

function setTime () {
    // This avoids multiple countdowns from being run if spamming the start quiz button
    if (timerInterval) {
        clearInterval(timerInterval);
    };
    timerInterval = setInterval(countdown, 1000);
    timeLeft = 1;
    timeEl.textContent = timeLeft;
}

// updated show questions function to grab a random question and choices, then build a radio button for each possible choice
function showQuestions(event) {
// potentially replace with while loop
    for (var i = 0; i < questions.length; i++) {
        chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
        document.getElementById("questions").innerHTML = "<p>" + chosenQuestion.question + "</p>";
        var options = chosenQuestion.choices;
        questionEl.appendChild(document.createElement("br"));
        // replace this with a class instead of a name attribute on the buttons for targeting later
        var name = "userChoices";
        for (var opt in options) {
            var radioEle = document.createElement("input");
            radioEle.type = "radio";
            radioEle.value = options[opt];
            radioEle.name = name;
            radioEle.addEventListener("click", function () {
                chosenAnswer = this.value;
            })
            questionEl.appendChild(radioEle);
            var label = document.createElement("Label");
            label.innerHTML = options[opt];
            questionEl.appendChild(label);
            questionEl.appendChild(document.createElement("br"));
        }
    }
    var submitAnswer = document.createElement("input");
    submitAnswer.type = "button";
    submitAnswer.value = "Submit";
    questionEl.appendChild(submitAnswer);
    submitAnswer.addEventListener("click", function () {
        checkAnswer(chosenAnswer)});
    }


function checkAnswer(chosenAnswer) {
    console.log(chosenAnswer);
}

// appends the div with a form to initial and save your score
function saveScore(event) {
    // replace "inputEl" with a separate input from the global
    f.appendChild(inputEl);
    // i.onclick = i.select();
    f.appendChild(s);
    document.getElementById("submit").appendChild(f);
    localStorage.setItem("initials", inputEl.value);
    event.preventDefault();
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
document.getElementById("submit").addEventListener("click", function(event){
    saveScore(event);
});
document.getElementById("questions").addEventListener("onsubmit", checkAnswer);
