// Short JS to grade the quiz and show explanations

// Correct answers and short explanations for each question
const ANSWERS = {
  q1: { correct: "5x", explain: "2x + 3x = (2+3)x = 5x." },
  q2: { correct: "5", explain: "x + 7 = 12 → subtract 7 from both sides: x = 5." },
  q3: { correct: "10", explain: "When x = 3: 4·3 - 2 = 12 - 2 = 10." },
  q4: { correct: "7", explain: "2x - 4 = 10 → add 4 to both sides: 2x = 14 → x = 7." },
  q5: { correct: "3", explain: "3(x + 2) = 15 → divide both sides by 3: x + 2 = 5 → x = 3." }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const resultsDiv = document.getElementById("results");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");

  // Helper to read which radio is selected for a question
  function getAnswerValue(name) {
    const el = form.elements[name];
    if (!el) return null;
    for (let i = 0; i < el.length; i++) {
      if (el[i].checked) return el[i].value;
    }
    return null;
  }

  // Grade the quiz
  function gradeQuiz(e) {
    if (e) e.preventDefault();

    // Prevent double submissions
    submitBtn.disabled = true;

    let score = 0;
    let total = Object.keys(ANSWERS).length;
    resultsDiv.innerHTML = ""; // clear previous results

    // Iterate through questions and display feedback
    Object.keys(ANSWERS).forEach((qid, idx) => {
      const selected = getAnswerValue(qid);
      const { correct, explain } = ANSWERS[qid];

      // Create a result block per question
      const block = document.createElement("div");
      block.className = "result-block";
      block.style.padding = "0.5rem 0.25rem";
      block.style.borderBottom = "1px solid #f1e6e0";

      const qTitle = document.createElement("div");
      qTitle.innerHTML = `<strong>Question ${idx + 1}:</strong>`;
      block.appendChild(qTitle);

      const answerLine = document.createElement("div");
      if (selected === null) {
        // No answer selected
        answerLine.innerHTML = `<span style="color:#b07a00">No answer selected. Correct answer: <strong>${correct}</strong>.</span>`;
        block.classList.add("answer-wrong");
      } else if (selected === correct) {
        score++;
        answerLine.innerHTML = `<span style="color:green">Correct — <strong>${selected}</strong>.</span>`;
        block.classList.add("answer-correct");
      } else {
        answerLine.innerHTML = `<span style="color:#b22222">Wrong — you picked <strong>${selected}</strong>. Correct answer: <strong>${correct}</strong>.</span>`;
        block.classList.add("answer-wrong");
      }
      block.appendChild(answerLine);

      // Add short explanation
      const exp = document.createElement("div");
      exp.style.marginTop = "0.35rem";
      exp.style.color = "#555";
      exp.style.fontSize = "0.95rem";
      exp.textContent = explain;
      block.appendChild(exp);

      resultsDiv.appendChild(block);
    });

    // Overall score
    const scoreBlock = document.createElement("div");
    scoreBlock.style.marginTop = "0.75rem";
    scoreBlock.style.paddingTop = "0.5rem";
    scoreBlock.innerHTML = `<strong>Your score: ${score} / ${total}</strong>`;
    resultsDiv.prepend(scoreBlock);

    // Make quiz inputs readonly (disable) to keep state until reset
    const radios = form.querySelectorAll("input[type='radio']");
    radios.forEach(r => r.disabled = true);
  }

  // Reset quiz to initial state
  function resetQuiz() {
    // Re-enable submit
    submitBtn.disabled = false;
    resultsDiv.innerHTML = "";
    const radios = form.querySelectorAll("input[type='radio']");
    radios.forEach(r => {
      r.checked = false;
      r.disabled = false;
    });

    // Remove answer state classes from question fieldsets
    const fieldsets = form.querySelectorAll("fieldset.question");
    fieldsets.forEach(fs => {
      fs.classList.remove("answer-correct", "answer-wrong");
    });
  }

  form.addEventListener("submit", gradeQuiz);
  resetBtn.addEventListener("click", resetQuiz);
});
