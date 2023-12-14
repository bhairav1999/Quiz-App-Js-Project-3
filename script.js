const questions = [
    {
        question: 'Which river is considered the holiest in Hinduism and holds great cultural significance in India?',
        answer: [
            { text: 'Ganges', correct: true },
            { text: 'Yamuna', correct: false },
            { text: 'Brahmaputra', correct: false },
            { text: 'Godavari', correct: false },
        ]
    },
    {
        question: 'What is the capital city of India?',
        answer: [
            { text: 'Mumbai', correct: false },
            { text: 'New Delhi', correct: true },
            { text: 'Kolkata', correct: false },
            { text: 'Chennai', correct: false },
        ]
    },
    {
        question: 'Which of the following is a UNESCO World Heritage Site located in India?',
        answer: [
            { text: 'Machu Picchu', correct: false },
            { text: 'Petra', correct: false },
            { text: 'Taj Mahal', correct: true },
            { text: 'Great wall of china', correct: false },
        ]
    },
    {
        question: 'Who was the leader of the Indian independence movement and the first Prime Minister of independent India?',
        answer: [
            { text: ' Mahatma Gandhi', correct: false },
            { text: 'Jawaharlal Nehru', correct: true },
            { text: 'Sardar Patel', correct: false },
            { text: 'Subhas Chandra Bose', correct: false },
        ]
    },
]

// --------------------------------------Start------------------------------------------------------->

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;


const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();

}


const showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })

}


const resetState = () => {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}


const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const iscorrectAnswer = selectedBtn.dataset.correct === "true"
    if (iscorrectAnswer) {
        selectedBtn.classList.add("correct")
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

const handledNextbutton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handledNextbutton();
    } else {
        startQuiz();
    }
})

startQuiz()

