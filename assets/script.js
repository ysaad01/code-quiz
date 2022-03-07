/* global variables */
var startQuizBtn = document.querySelector("#start-button");
var highScoreBtn = document.querySelector("#highscore-button");
var timer = document.querySelector(".timer");
var quizQuestions = document.querySelector("#quiz-questions");
var question = document.querySelector("#question");
var answer = document.querySelector("#answer");
var multipleChoice = document.querySelector("#multiple-choice");
var choiceA = document.querySelector("#multiple-choice-A");
var choiceB = document.querySelector("#multiple-choice-B");
var choiceC = document.querySelector("#multiple-choice-C");
var choiceD = document.querySelector("#multiple-choice-D");
var checkAnswerCorrect = document.querySelector("#check-answer-correct");
var checkAnswerIncorrect = document.querySelector(".check-answer-incorrect");
var inputScore = document.querySelector("#input-score");
var scoreBtn = document.querySelector("#score-button");
var highScore = document.querySelector("#high-score");
var initialsBox = document.querySelector("#initials-box");
var submitBtn = document.querySelector("#submit-button");
var backBtn = document.querySelector("#back-button");
var clearBtn = document.querySelector("#clear-button");
var start = document.querySelector(".start");

var timeLeft = 75;
var i = 0;
var s = 0;
var selection = 0;
var score = 0;
var scoreList = [];
var setTimeInterval;
loadScore();

/* question array  */
var questionArray = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    selection: ["<javascript>", "<scripting>", "<script>", "<js>"],
    answer: "<script>",
  },
  {
    question:
      "Which of the following type of variable is visible everywhere in your JavaScript code?",
    selection: [
      "Local Variable",
      "Global Variable",
      "Both of the Above",
      "None of the Above",
    ],
    answer: "Global Variable",
  },
  {
    question: "Which built-in method sorts the elements of an array?",
    selection: ["order()", "changeOrder(order)", "sort()", "None of the Above"],
    answer: "sort()",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in JavaScript?",
    selection: ["var", "let", "Both of the Above", "None of the Above"],
    answer: "Both of the Above",
  },
  {
    question: "Which method returns the character at the specified index?",
    selection: [
      "charAt()",
      "getCharAt()",
      "characterAt()",
      "None of the Above",
    ],
    answer: "charAt()",
  },
  {
    question: "Which of the following is not a mouse event?",
    selection: ["onmousemove", "onmouseover", "onclick", "onmousescroller"],
    answer: "onmousescroller",
  },
  {
    question: "The 'function' and 'var' are known as:",
    selection: [
      "Keywords",
      "Declaration Statements",
      "Data Types",
      "Prototypes",
    ],
    answer: "Declaration Statements",
  },
  {
    question:
      "Which of the following variables takes precedence over the others if the names are the same?",
    selection: [
      "The Local Element",
      "Global Variable",
      "Both of the Above",
      "None of the Above",
    ],
    answer: "The Local Element",
  },
  {
    question:
      "Choose the correct snipped from the following to check if the variable 'a' is not equal to 'NULL':",
    selection: ["if (a!)", "if(a!null)", "if(a!==null)", "if(a!=null)"],
    answer: "if(a!==null)",
  },
  {
    question:
      "Among the following, which one is a ternary operator in JavaScript?",
    selection: ["#", "::", "&:", "?:"],
    answer: "?:",
  },
];

/* display question and answer function */
function displayQuiz() {
  if (i < questionArray.length) {
    question.textContent = questionArray[i].question;
    choiceA.textContent = questionArray[i].selection[0];
    choiceB.textContent = questionArray[i].selection[1];
    choiceC.textContent = questionArray[i].selection[2];
    choiceD.textContent = questionArray[i].selection[3];
  } else {
    endQuiz();
  }
}

/* start quiz timer function */
function startTimer() {
  setTimeInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Timer: " + timeLeft;

    if (timeLeft < 0 || i >= questionArray) {
      clearInterval(setTimeInterval);
      endQuiz();
    }
  }, 1000);
}

/* right/wrong answer function */
function answerSelection(event) {
  if (i >= questionArray.length) {
    endQuiz();
    clearInterval(setTimeInterval);
  } else {
    if (event === questionArray[i].answer) {
      checkAnswerCorrect.textContent = "Correct";
    } else {
      timeLeft -= 10;
      checkAnswerIncorrect.textContent = "Incorrect";
    }
    score = timeLeft;
    i++;
    displayQuiz();
  }
}

/* end quiz function */
function endQuiz() {
  scoreBtn.innerHTML = score;
  quizQuestions.classList.add("hide");
  inputScore.classList.remove("hide");
  timer.classList.add("hide");
  highScoreBtn.classList.add("hide");
  scoreBoard();
}

/* retrieve scores from localStorage function and save highscore to localstorage function*/
function loadScore() {
  var savedScore = JSON.parse(localStorage.getItem("highScore"));
  if (savedScore !== null) {
    scoreList = savedScore;
  }
}

function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

/* top scores tracker function */
function scoreBoard() {
  clearScoreBoard();
  addScoreBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topScores = scoreList.slice(0, 5);

  for (var s = 0; s < topScores.length; s++) {
    var user = topScores[s].user;
    var userScore = topScores[s].score;

    var newDiv = document.createElement("div");
    scoreBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = user + ": " + userScore;
    newDiv.appendChild(newLabel);
  }
}

/* add user initials to scoreboard function */
function addScoreBoard() {
  scoreBoardDiv = document.createElement("div");
  scoreBoardDiv.setAttribute("id", "userInitials");
  document.getElementById("scoreBoard").appendChild(scoreBoardDiv);
}

/* clear score board function */
function clearScoreBoard() {
  var clearScores = document.getElementById("userInitials");
  if (clearScores !== null) {
    clearScores.remove();
  }
}

/* Event Listeners */
startQuizBtn.addEventListener("click", function (event) {
  startTimer();
  displayQuiz();
  start.classList.add("hide");
  quizQuestions.classList.remove("hide");
  highScoreBtn.style.display = "none";
  highScore.classList.add("hide");
});

multipleChoice.addEventListener("click", function (event) {
  var event = event.target;
  answerSelection(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = initialsBox.value.trim();
  var newScore = {
    user: userInitials,
    score: score,
  };

  scoreList.push(newScore);
  saveScore();
  scoreBoard();
  inputScore.classList.add("hide");
  highScore.classList.remove("hide");
});

highScoreBtn.addEventListener("click", function (event) {
  highScore.classList.remove("hide");
  highScoreBtn.classList.add("hide");
  start.classList.add("hide");
  scoreBoard();
});

backBtn.addEventListener("click", function (event) {
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  scoreBoard();
  saveScore();
});
