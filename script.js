
// ======================================
// САМОСТІЙНА РОБОТА З МАТЕМАТИКИ
// 10 клас
// Ірраціональні рівняння та їх системи
// ======================================

// Пізніше сюди вставимо адресу Google Apps Script
const GOOGLE_SCRIPT_URL = "";

// Банк завдань
const questions = [

  {
    title: "Завдання 1. Область визначення",
    text: "Якою є область визначення виразу √(x − 3)?",
    type: "choice",
    points: 1,
    options: [
      "x > 3",
      "x ≥ 3",
      "x ≤ 3",
      "Усі дійсні числа"
    ],
    answer: 1
  },

  {
    title: "Завдання 2. Найпростіше рівняння",
    text: "Розв'яжіть рівняння √x = 5.",
    type: "choice",
    points: 1,
    options: [
      "x = 5",
      "x = 10",
      "x = 25",
      "x = −25"
    ],
    answer: 2
  },

  {
    title: "Завдання 3. Ірраціональне рівняння",
    text: "Розв'яжіть рівняння √(x + 5) = x − 1.",
    type: "choice",
    points: 1,
    options: [
      "x = 2",
      "x = 4",
      "x = 5",
      "x = −1"
    ],
    answer: 1
  },

  {
    title: "Завдання 4. Знаходження кореня",
    text: "Розв'яжіть рівняння √(3x − 2) = 4.",
    type: "choice",
    points: 1,
    options: [
      "x = 5",
      "x = 6",
      "x = 7",
      "x = 2"
    ],
    answer: 1
  },

  {
    title: "Завдання 5. Перевірка коренів",
    text: "Знайдіть корінь рівняння √(x + 12) = x.",
    type: "choice",
    points: 1,
    options: [
      "x = −3",
      "x = 3",
      "x = 4",
      "x = 12"
    ],
    answer: 2
  },

  {
    title: "Завдання 6. Піднесення до квадрата",
    text: "Розв'яжіть рівняння √(2x + 1) = x + 1.",
    type: "choice",
    points: 1,
    options: [
      "x = −1",
      "x = 0",
      "x = 1",
      "x = 2"
    ],
    answer: 1
  },

  {
    title: "Завдання 7. Сторонній корінь",
    text: "Під час розв'язування рівняння √(x + 1) = x − 1 піднесенням обох частин до квадрата отримали x = 0 та x = 3. Який із цих коренів є стороннім?",
    type: "choice",
    points: 1,
    options: [
      "x = 0",
      "x = 3",
      "Обидва корені",
      "Жоден корінь"
    ],
    answer: 0
  },

  {
    title: "Завдання 8. Система рівнянь",
    text: "Розв'яжіть систему: x + y = 13; √x + √y = 5.",
    type: "choice",
    points: 1,
    options: [
      "(4; 9) і (9; 4)",
      "(2; 3) і (3; 2)",
      "(5; 8)",
      "(1; 12)"
    ],
    answer: 0
  },

  {
    title: "Завдання 9. Самостійне розв'язування",
    text: "Розв'яжіть рівняння √(x − 2) = x − 4. Введіть значення x.",
    type: "number",
    points: 2,
    answer: ["6"]
  },

  {
    title: "Завдання 10. Система ірраціональних рівнянь",
    text: "Розв'яжіть систему: √x + √y = 5; x − y = −5. Запишіть відповідь у форматі x; y.",
    type: "pair",
    points: 2,
    answer: ["4;9", "4,9", "4 9"]
  }

];

// ======================================
// ВІДОБРАЖЕННЯ ЗАВДАНЬ
// ======================================

const questionsContainer = document.getElementById("questions");

questions.forEach((q, index) => {

  const block = document.createElement("div");
  block.className = "question";

  const title = document.createElement("h3");
  title.textContent = q.title;

  const text = document.createElement("p");
  text.textContent = q.text;

  block.appendChild(title);
  block.appendChild(text);

  if (q.type === "choice") {

    q.options.forEach((option, optionIndex) => {

      const label = document.createElement("label");
      label.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "q" + index;
      radio.value = optionIndex;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));

      block.appendChild(label);

    });

  } else {

    const input = document.createElement("input");
    input.type = "text";
    input.id = "answer-" + index;
    input.placeholder = q.type === "pair"
      ? "Наприклад: 4; 9"
      : "Введіть значення x";

    input.autocomplete = "off";
    input.setAttribute("aria-label", q.title);

    block.appendChild(input);

  }

  questionsContainer.appendChild(block);

});

// ======================================
// НОРМАЛІЗАЦІЯ ВІДПОВІДЕЙ
// ======================================

function normalizeNumber(value) {
  return value
    .trim()
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/−/g, "-");
}

function normalizePair(value) {
  return value
    .toLowerCase()
    .replace(/x\s*=/g, "")
    .replace(/y\s*=/g, "")
    .replace(/[()\s]/g, "")
    .replace(/,/g, ";")
    .replace(/;/g, ";")
    .replace(/−/g, "-");
}

// ======================================
// ОТРИМАННЯ ВІДПОВІДЕЙ
// ======================================

function getStudentAnswers() {

  return questions.map((q, index) => {

    if (q.type === "choice") {

      const selected = document.querySelector(
        'input[name="q' + index + '"]:checked'
      );

      return selected ? selected.value : "";

    }

    return document.getElementById(
      "answer-" + index
    ).value.trim();

  });

}

// ======================================
// ПЕРЕВІРКА ЗАВДАНЬ
// ======================================

function checkAnswers(answers) {

  let score = 0;
  const details = [];

  questions.forEach((q, index) => {

    let correct = false;
    const studentAnswer = answers[index];

    if (q.type === "choice") {

      correct = Number(studentAnswer) === q.answer;

    } else if (q.type === "number") {

      correct = q.answer.includes(
        normalizeNumber(studentAnswer)
      );

    } else if (q.type === "pair") {

      correct = q.answer.includes(
        normalizePair(studentAnswer)
      );

    }

    if (correct) {
      score += q.points;
    }

    details.push({
      question: index + 1,
      answer: studentAnswer,
      correct: correct,
      points: correct ? q.points : 0
    });

  });

  return {
    score: score,
    details: details
  };

}

// ======================================
// ПЕРЕВЕДЕННЯ БАЛІВ У 12-БАЛЬНУ ШКАЛУ
// ======================================

function calculateGrade(score) {
  return score;
}

// ======================================
// ЗАВЕРШЕННЯ РОБОТИ
// ======================================

const finishButton = document.getElementById("finishButton");
const resultBlock = document.getElementById("result");

let finalData = null;

finishButton.addEventListener("click", () => {

  const name = document.getElementById("studentName").value.trim();
  const studentClass = document.getElementById("studentClass").value;

  if (!name || !studentClass) {
    alert("Будь ласка, введіть прізвище, ім'я та оберіть клас.");
    return;
  }

  const answers = getStudentAnswers();

  const unanswered = answers.findIndex(
    answer => answer === ""
  );

  if (unanswered !== -1) {
    alert("Ви не відповіли на завдання №" + (unanswered + 1) + ".");
    document.querySelectorAll(".question")[unanswered]
      .scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const checked = checkAnswers(answers);
  const grade = calculateGrade(checked.score);

  finalData = {
    name: name,
    studentClass: studentClass,
    score: checked.score,
    grade: grade,
    answers: answers,
    details: checked.details,
    timestamp: new Date().toISOString()
  };

  document.getElementById("score").textContent =
    "Правильних балів: " + checked.score + " із 12. Оцінка: " + grade + " балів.";

  let feedback = "";

  if (grade >= 10) {
    feedback = "Чудова робота! Ти добре засвоїв тему! 🌟";
  } else if (grade >= 7) {
    feedback = "Гарний результат! Є ще над чим попрацювати.";
  } else if (grade >= 4) {
    feedback = "Потрібно повторити правила та способи розв'язування.";
  } else {
    feedback = "Не засмучуйся! Повтори тему та спробуй ще раз.";
  }

  document.getElementById("feedback").textContent = feedback;

  resultBlock.hidden = false;

  finishButton.disabled = true;
  finishButton.textContent = "Роботу завершено";

  resultBlock.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});

// ======================================
// НАДСИЛАННЯ В GOOGLE ТАБЛИЦЮ
// ======================================

const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", async () => {

  if (!finalData) {
    return;
  }

  if (!GOOGLE_SCRIPT_URL) {
    document.getElementById("sendStatus").textContent =
      "Таблицю ще не підключено. Це зробимо на наступному етапі.";
    return;
  }

  sendButton.disabled = true;
  sendButton.textContent = "Надсилання...";

  try {

    const payload = new URLSearchParams();

    payload.append("payload", JSON.stringify(finalData));

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    document.getElementById("sendStatus").textContent =
      "Запит на надсилання відправлено. Дякуємо за роботу!";

    sendButton.textContent = "Відповіді надіслано";

  } catch (error) {

    document.getElementById("sendStatus").textContent =
      "Не вдалося надіслати відповіді. Спробуйте ще раз.";

    sendButton.disabled = false;
    sendButton.textContent = "Надіслати відповіді вчителю";

  }

});
