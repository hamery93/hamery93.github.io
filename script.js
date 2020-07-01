//Object containing questions 

var questions = [{
    title: "What is a function inside of a function called?",
    choices: ["Obama function", "Callback function", "Chair function", "Bagel function"],
    answer: "Callback function"
  },
  {
    title: "What does API stand for?",
    choices: ["Apples Pears Iguana", "Africa Pulls Igloos", "Arctic Pigs Inked", "Application Programming Interface"],
    answer: "Application Programming Interface"

  },
  {
    title: "What does URL stand for",
    choices: ["Unicorn Raffle Lion", "Union Revival Linguini", "Unified Resource Link", "Underneath Rivers Ligers"],
    answer: "Unified Resource Link"

  },

  {
    title: "What does Math.random() accomplish?",
    choices: ["Randomizes values", "Makes you a burger", "Gives you powers", "Chair"],
    answer: "Randomizes values"
  }

];

// Declaring Variables 

var timeLeft = questions.length * 15;
var questionIndex = questions.length; 
var inUseQuestionIndex = 0;
var highScore;
var timerID;

// Variables we will dynamically work with from HTML page

var initialDiv = document.getElementById("first");
var displayHighScore = document.getElementById("highScore");
var quizStart = document.getElementById("beginQuiz");
var timerCountdown = document.getElementById("countDown");
var submitEnd = document.getElementById("submitHS");
var typeInitials = document.getElementById("initial");
var buttonD = document.getElementById("back");
var submitEnd = document.getElementById("clearHS");
var questionEl = document.getElementById("questions");
var questionTitleEl = document.getElementById("questionTitle");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var finalScoreEl = document.getElementById("finalScore");
var finalButtonsEl= document.getElementById("finalButtons");

// Object containing quiz questions

function startQuiz() {
  //come back and see if I can make start screen hide/appear

  timerID = setInterval(clockTick, 1000)

  timerCountdown.textContent = timeLeft

  getQuestion()
}

function getQuestion() {

  var currentQuestion = questions[inUseQuestionIndex]
  questionTitleEl.textContent = currentQuestion.title

  choicesEl.innerHTML = "" //clears out choices

  currentQuestion.choices.forEach(function (choice, i) { 
    var choiceNode = document.createElement("button")
    choiceNode.setAttribute("value", choice)
    choiceNode.textContent = i + 1 + ". " + choice
    choiceNode.onclick = questionClick
    choicesEl.appendChild(choiceNode)
  })
}

//Function that gives meaning/logic to mouse click event

function questionClick() {

  if (this.value !== questions[inUseQuestionIndex].answer) {
    timeLeft -= 15
    if (timeLeft < 0) {
      timeLeft = 0
    }
    timerCountdown.textContent = timeLeft
    feedbackEl.textContent = "WRONG"
  } else {
    feedbackEl.textContent = "CORRECT"
  }
  inUseQuestionIndex++
  if (inUseQuestionIndex === questions.length) {
    quizEnd()
  } else {
    getQuestion()
  }
}

function quizEnd() {
  //can also do hide/show of screen

  clearInterval(timerID)
  finalScoreEl.textContent = (timeLeft + "  This is your final score!")
}

function clockTick() {
  timeLeft--
  timerCountdown.textContent = timeLeft
  if (timeLeft <= 0) {
    quizEnd()
  }

}
//save high score function if we want to save to local storage

quizStart.onclick = startQuiz