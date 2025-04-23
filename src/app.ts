enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
}

const questions: Question[] = [
  {
    text: "What does 'DOM' stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Output Machine",
      "Document Operation Method",
    ],
    correctIndex: 0,
    difficulty: Difficulty.Easy,
  },
  {
    text: "Which keyword creates a constant in JavaScript?",
    options: ["let", "const", "var", "static"],
    correctIndex: 1,
    difficulty: Difficulty.Medium,
  },
  {
    text: "Which type in TypeScript is used for a function that never returns?",
    options: ["null", "void", "never", "undefined"],
    correctIndex: 3,
    difficulty: Difficulty.Hard,
  },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById(
  "quiz-container"
) as HTMLDivElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const result = document.getElementById("result") as HTMLDivElement;

function renderQuestion(index: number) {
  const q = questions[index];
  quizContainer.innerHTML = `
  <div class="question">${q.text}<small>${q.difficulty}</small></div>
  <div class="options">
       ${q.options.map(
         (opt, i) => `
                  <label>
                    <input type="radio" name="option" value="${i}"/>
                    ${opt}  
                  </label>
               `
       )}
  </div>
  `;
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector(
    "input[name='option']:checked"
  ) as HTMLInputElement;
  if (!selected) {
    result.textContent = "Please select an option!";
    return;
  }
  const answer = parseInt(selected.value);
  if (answer === questions[currentQuestion].correctIndex) {
    score++;
    result.textContent = "Correct!";
  } else {
    result.textContent = "Wrong!";
  }
  submitBtn.style.display = "nonw";
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  result.textContent = "";
  if (currentQuestion < questions.length) {
    renderQuestion(currentQuestion);
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
  } else {
    quizContainer.innerHTML = "";
    result.textContent = `Quiz completed Your score : ${score}/${questions.length}`;
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
});

// Loading first question
renderQuestion(currentQuestion);
