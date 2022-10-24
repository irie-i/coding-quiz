const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");
const infoEl = document.getElementById('info-box');
let shuffledQuestions, currentQuestionIndex;
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-btns');
const correctText = document.querySelector(".correct-answer");
// const wrongText =  document.querySelector(".wrong-answer");
const timerEl = document.querySelector(".timer");

var timerCount;
var timer;

startButton.addEventListener('click', startGame);


function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions = questionList.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    infoEl.classList.add('hide');
    timerEl.classList.remove('hide');
    startTimer();
    setNextQuestion();
}

function startTimer(time) {
    // Sets timer
   timer = setInterval(function () {
        timerCount--;
        timerCount.textContent = time;
       
    }, 1000);
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    })
}
// Resets quiz look back to default for next question
function resetState() {

    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        return;
    }
    answerButtonsEl.addEventListener('click', setNextQuestion);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
        correctText.classList.remove('hide');
    } else {
        // correctText.textContent = "Wrong"
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}



const questionList = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Color Style Settings', correct: false },
            { text: 'Cascadomg Style Settings', correct: false },
            { text: 'Color Selector Sheets', correct: false },
        ]
    },
    {
        question: "What does HTML stand for",
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'HypetText Messaging Log', correct: false },
            { text: 'HyperText Messaging Language', correct: false },
            { text: 'HyperText Markup Logs ', correct: false },
        ]
    },
    {
        question: "What is 8 + 2",
        answers: [
            { text: '10', correct: true },
            { text: '22', correct: false },
            { text: '8', correct: false },
            { text: '12', correct: false },
        ]
    },
    {
        question: "What is 10 + 2",
        answers: [
            { text: '12', correct: true },
            { text: '22', correct: false },
            { text: '8', correct: false },
            { text: '12', correct: false },
        ]
    },
    {
        question: "What is 10 - 2",
        answers: [
            { text: '8', correct: true },
            { text: '22', correct: false },
            { text: '8', correct: false },
            { text: '12', correct: false },
        ]
    },

];