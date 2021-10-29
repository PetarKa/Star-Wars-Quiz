
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const resultID = document.getElementById("rez");
const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');

function generateQuestions(index) {

    const question = questions[index];
    const option1Total = question.answer1Total;
    const option2Total = question.answer2Total;
    const option3Total = question.answer3Total;
    const option4Total = question.answer4Total;

    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
}


function loadNextQuestion() {
    const selectedOption = document.querySelector('input[type="radio"]:checked');

    if (!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    //Stavlja u varijablu vrijednost odabranog odgovora
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    score.push(answerScore);

    //prenamijenjena funkcija reduce za zbrajanje niza(inace ide total - currentNum)
    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    currentQuestion++;

    selectedOption.checked = false;

    if (currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    if (currentQuestion == totalQuestions) {
        let percentage = parseFloat((totalScore / totalQuestions) * 100).toFixed(2);
        let rank;
        container.style.display = 'none';

        if (percentage < 40) {
            rank = "youngling";
        }
        else if (percentage < 65) {
            rank = "padawan";
        }
        else if (percentage < 90) {
            rank = "jedi knight";
        }
        else if (percentage < 101) {
            rank = "jedi master";
        }

        resultID.style.display = "flex";
        resultID.innerHTML =
            `
         <div class="summary">
            <h1>Summary</h1>
            <p>You got ${totalScore} out of ${totalQuestions} questions correct.<br>Your rank is ${rank}.</p>      
            <div class="final-score">
                <h1>Your score: ${percentage}%</h1>  
            </div>      
            </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}


function loadPreviousQuestion() {
    if (currentQuestion < 1)
        return;

    currentQuestion--;
    score.pop();
    generateQuestions(currentQuestion);
}


function restartQuiz(e) {
    //e.target vraca element koji je triggera event
    if (e.target.matches('button')) {
        currentQuestion = 0;
        score = [];
        location.reload();
    }

}
resultID.style.display = "none";
generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
resultID.addEventListener('click', restartQuiz);


