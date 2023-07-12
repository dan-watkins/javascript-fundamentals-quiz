var scoreEl = document.querySelector(".scores");
var timeEl = document.querySelector(".timer");
var questionEl = document.querySelector("#questions");
var submitEl = document.querySelector("#submit");
var questions = [
    {
        question: "Javascript is an _______ language?",
        choices: ["Object-Oriented","Object-Based","Procedural","None of the above"],
        answer: "Object-Oriented"
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var","let","Both A and B","None of the above"],
        answer: "Both A and B"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementbyId()","getElementsByClassName()","Both A and B","None of the above"],
        answer: "Both A and B"
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        choices: ["Throws an error","Ignores the statements","Gives a warning","None of the above"],
        answer: "Ignores the statements"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()","console.log()","window.alert()","All of the above"],
        answer: "All of the above"
    },
    {
        question: "How can a datatype be declared to be a constant type??",
        choices: ["const","var","let","constant"],
        answer: "const"
    },
    {
        question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
        choices: ["Both the datatype and the result of the expression are compared.","Only the datatype of the expression is compared","Only the value of the expression is compared.","None of the above."],
        answer: "Both the datatype and the result of the expression are compared."
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        choices: ["in","is in","exists","lies"],
        answer: "in"
    },
    {
        question: "What does the Javascript “debugger” statement do?",
        choices: ["It will debug all the errors in the program at runtime.","It acts as a breakpoint in a program.","It will debug error in the current statement if any.","All of the above."],
        answer: "It acts as a breakpoint in a program."
    }
]
var currentQuestions;
var chosenAnswer = "";
var timeLeft = 60;
var timerInterval;
var winCount = 0;
var lossCount = 0;
// hides submitting your initials so you can't submit early
var el = document.getElementById("submit");
el.style.display = "none";
var quizEl = document.getElementById("quiz");


// Click event on "Start Quiz!" button triggers the beginning of the test
function startQuiz(event) {
  // ...is cloning the array "questions"
  currentQuestions = [...questions];
  setTime();
  hideQuiz();
    showQuestions(event, currentQuestions);
}

// once "Start Quiz!" has been clicked hide the button to prevent restarting
function hideQuiz() {
    quizEl.style.visibility = "hidden";
    el.style.display = "none";
}

function setTime () {
    // This avoids multiple countdowns from being run if spamming the start quiz button
    if (timerInterval) {
        clearInterval(timerInterval);
    };
    timerInterval = setInterval(countdown, 1000);
    // timeLeft = 10;
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
        showForm();
    }
}

// Grabs a random question and choices, then build a radio button for each possible choice
function showQuestions() {
        chosenQuestion = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
        document.getElementById("questions").innerHTML = "<p>" + chosenQuestion.question + "</p>";
        var options = chosenQuestion.choices;
        questionEl.appendChild(document.createElement("br"));
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

    var submitAnswer = document.createElement("input");
    submitAnswer.type = "button";
    submitAnswer.value = "Submit";
    questionEl.appendChild(submitAnswer);
    submitAnswer.addEventListener("click", function () {
        checkAnswer(chosenAnswer, chosenQuestion)});
    }

// checks user answer against expected answer, increases score of true and subtracts time if false. then re-calls for next question.
function checkAnswer(chosenAnswer, chosenQuestion) {
    if (chosenAnswer == chosenQuestion.answer) {
        winCount++;
    } else {
        timeLeft -= 5;
        lossCount++;
    };
    currentQuestions.splice(chosenQuestion, 1);
    if (currentQuestions.length > 0) {
        showQuestions(currentQuestions);
    } else {
        timeLeft = 0;
    };
}

// makes both the "start quiz" button and the form to submit initials visible after the quiz has ended
function showForm() {
    el.style.display = "block";
    quizEl.style.visibility = "visible";
}

// once scores are saved updates the "view high scores" section with the saved input value and score
function showScore() {
    var score = document.createElement("p");
    scoreEl.appendChild(score);
    score.textContent = localStorage.getItem("initials");
}

// if any scores are available in local storage display on screen
function init() {
  if (localStorage.getItem("initials")) {
    showScore();
  }
};

init();

// first listener is what starts the quiz, as soon as the "Start Quiz!" button is pressed.
document.getElementById("quiz").addEventListener("click", startQuiz);
document.getElementById("saveScore").addEventListener("click", function () {
  var initialsInput = document.getElementById("initials");
  localStorage.setItem("initials", winCount + " - " + initialsInput.value);
  showScore();
});