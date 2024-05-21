const startButton = document.querySelector('.quiz-start-btn');
const quizContainer = document.querySelector('.quiz-main-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizHeading = document.querySelector('.quiz-main-heading');
const progressBar = document.getElementById('progress-bar');

let questions = [{
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('quiz-hidden');
    quizHeading.classList.add('quiz-hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('quiz-hidden');
    progressBar.classList.remove('quiz-hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    const choices = ['choice1', 'choice2', 'choice3', 'choice4'];
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('quiz-btn');
        if (index + 1 === question.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);

        const optionNumber = document.createElement('div');
        optionNumber.innerText = `Option ${index + 1}`;
        optionNumber.classList.add('option-number');

        const optionText = document.createElement('div');
        optionText.innerText = question[choice];
        optionText.classList.add('option-text');

        button.appendChild(optionNumber);
        button.appendChild(optionText);

        answerButtonsElement.appendChild(button);
    });

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function resetState() {
    questionElement.classList.remove('result');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    progressBar.style.width = '0%';
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('button');
    const correct = selectedButton.dataset.correct;
    if (correct === 'true') {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! Your score is ${score} out of ${questions.length}.`;
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('quiz-hidden');
    questionElement.classList.add('result');
    progressBar.classList.add('quiz-hidden');
}