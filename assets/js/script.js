var scoreEl = document.querySelector(".scores");
var timeEl = document.querySelector(".timer");
var questionEl = document.querySelector("#questions");
var submitEl = document.querySelector("#submit");
var questions = [
    {
        question: "what is the answer to question 1?",
        choices: ["A","B","C","D"],
        answer: "A"
    },
    {
        question: "what is the answer to question 2?",
        choices: ["E","F","G","H"],
        answer: "F"
    },
    {
        question: "what is the answer to question 3?",
        choices: ["I","J","K","L"],
        answer: "K"
    },
    {
        question: "what is the answer to question 4?",
        choices: ["M","N","O","P"],
        answer: "P"
    }
]

var answeredQuestions = [];
var chosenAnswer = "";
var timeLeft = 10;
var timerInterval;
var winCount = 0;
var lossCount = 0;
// sets the initial display value for submitting your initals to "none" so you can't submit early
var el = document.getElementById("submit");
el.style.display = "none";

// Click event on "Start Quiz!" button triggers the beginning of the test
function startQuiz(event) {
    setTime();
    showQuestions(event);
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

// Countdown keeps checking the timeLeft, and once it hits 0 alerts "Time's up!" and calls saveScore function
var countdown = function() {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Time's up!");
        saveScore();
    }
}

// Grabs a random question and choices, then build a radio button for each possible choice
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
        checkAnswer(chosenAnswer, chosenQuestion)});
    }

// checks user anaswer against expected answer, increases score of true and subtracts time if false. then re-calls for next question.
function checkAnswer(chosenAnswer) {
    if (chosenAnswer == chosenQuestion.answer) {
        console.log("correct");
        winCount++;
    } else {
        console.log("incorrect");
        timeLeft--;
        lossCount++;
    }
    showQuestions();
}

// changes the submit div to display so that it shows only after the countdown function is finished.
function saveScore() {
    el.style.display = "block";
    localStorage.setItem("initials", init.value + " - " + winCount);
    showScore();
}

// once scores are saved updates the "view high scores" section with the saved input value and score
function showScore() {
    var score = document.createElement("p");
    scoreEl.appendChild(score);
    score.textContent = localStorage.getItem("initials", init.value + " - " + winCount);
}

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// first listener is what starts the quiz, as soon as the "Start Quiz!" button is pressed.
document.getElementById("quiz").addEventListener("click", startQuiz);
document.getElementById("questions").addEventListener("onsubmit", checkAnswer);
