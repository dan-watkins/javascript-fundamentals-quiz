var timeEl = document.querySelector(".timer");
var timeLeft = 10;

function setTime () {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if(timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    timeLeft = 10;
}

function startQuiz(event) {
    setTime();
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