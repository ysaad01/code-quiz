/* question array  */
var questionArray = [
  {
    question: "Select Option 1",
    selection: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 1",
  },
  {
    question: "Select Option 2",
    selection: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 2",
  },
  {
    question: "Select Option 3",
    selection: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 3",
  },
  {
    question: "Select Option 4",
    selection: ["Option 1", "Option 2", "Option 3", "Option 4"],
    answer: "Option 4",
  },
];

/* global variables */
var startQuizBtn = document.querySelector("#start-button");
var highScoreBtn = document.querySelector("#highscore-button");
var timer = document.querySelector(".timer");
var questionCard = document.querySelector("#question-card");
var question = document.querySelector("#question");
var answer = document.querySelector("#answer");
var multipleChoice = document.querySelector("#multiple-choice");
var choiceA = document.querySelector("#multiple-choice-A");
var choiceB = document.querySelector("#multiple-choice-B");
var choiceC = document.querySelector("#multiple-choice-C");
var choiceD = document.querySelector("#multiple-choice-D");
var inputScore = document.querySelector("#input-score");
var highScore = document.querySelector("#high-score");
var initialsBox = document.querySelector("#initials-box");
var submitBtn = document.querySelector("#submit-button");
var backBtn = document.querySelector("#back-button");
var clearBtn = document.querySelector("#clear-button");
var start = document.querySelector(".start");

