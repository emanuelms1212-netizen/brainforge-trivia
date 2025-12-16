/*
 * BrainForge Trivia Game
 *
 * This JavaScript file contains the logic for a simple trivia game designed to
 * run as a Progressive Web App (PWA). It displays categories to the user,
 * presents multiple‑choice questions with explanations, and tracks a score
 * within each category. The game is intentionally lightweight and
 * self‑contained so it can be hosted as a static site and installed on
 * mobile devices via “Add to Home Screen” in Safari (iOS) or Chrome.
 */

// Define the data for each category. You can extend this array with more
// categories and questions. Each question includes four options, the index of
// the correct option, and a short explanation shown after answering.
const categories = [
  {
    name: 'World History',
    questions: [
      {
        question: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
        answer: 0,
        explanation: 'George Washington served as the first President of the United States from 1789 to 1797.'
      },
      {
        question: 'The ancient city of Rome was founded on which river?',
        options: ['Tiber', 'Nile', 'Danube', 'Seine'],
        answer: 0,
        explanation: 'Rome was built on the banks of the Tiber River in central Italy.'
      }
    ]
  },
  {
    name: 'Science & Medicine',
    questions: [
      {
        question: 'What part of the brain is most responsible for executive function?',
        options: ['Cerebellum', 'Brainstem', 'Prefrontal cortex', 'Occipital lobe'],
        answer: 2,
        explanation: 'The prefrontal cortex is responsible for planning, impulse control, and decision‑making.'
      },
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Golgi apparatus'],
        answer: 2,
        explanation: 'Mitochondria produce ATP, the energy currency of the cell.'
      }
    ]
  },
  {
    name: 'Math & Logic',
    questions: [
      {
        question: 'What is the value of π (pi) approximately?',
        options: ['2.14', '3.14', '4.14', '5.14'],
        answer: 1,
        explanation: 'Pi is approximately equal to 3.14159.'
      },
      {
        question: 'How many degrees are in the interior angles of a triangle?',
        options: ['90°', '180°', '270°', '360°'],
        answer: 1,
        explanation: 'The sum of the interior angles of any triangle is always 180°.'
      }
    ]
  },
  {
    name: 'Economics & Finance',
    questions: [
      {
        question: 'What economic term describes a general increase in prices and fall in the purchasing value of money?',
        options: ['Deflation', 'Inflation', 'Stagflation', 'Recession'],
        answer: 1,
        explanation: 'Inflation refers to a sustained rise in the general price level of goods and services.'
      },
      {
        question: 'In finance, what does ROI stand for?',
        options: ['Rate of Increase', 'Return on Investment', 'Risk of Investment', 'Revenue on Items'],
        answer: 1,
        explanation: 'ROI stands for Return on Investment and measures the gain or loss generated relative to the amount invested.'
      }
    ]
  },
  {
    name: 'Politics & Law',
    questions: [
      {
        question: 'Which document begins with the words “We the People”?',
        options: ['Bill of Rights', 'Declaration of Independence', 'U.S. Constitution', 'Articles of Confederation'],
        answer: 2,
        explanation: 'The preamble of the U.S. Constitution famously begins with “We the People.”'
      },
      {
        question: 'How many justices serve on the U.S. Supreme Court?',
        options: ['7', '8', '9', '10'],
        answer: 2,
        explanation: 'There are nine justices on the U.S. Supreme Court: one Chief Justice and eight Associate Justices.'
      }
    ]
  },
  {
    name: 'Judaism & Jewish History',
    questions: [
      {
        question: 'What is the Hebrew word for the Jewish Day of Atonement?',
        options: ['Passover', 'Rosh Hashanah', 'Yom Kippur', 'Sukkot'],
        answer: 2,
        explanation: 'Yom Kippur is the holiest day of the Jewish year, devoted to atonement and fasting.'
      },
      {
        question: 'Which Jewish holiday commemorates the rededication of the Second Temple in Jerusalem?',
        options: ['Purim', 'Hanukkah', 'Shavuot', 'Tisha B’Av'],
        answer: 1,
        explanation: 'Hanukkah celebrates the Maccabean victory and the miracle of the oil that burned for eight days.'
      }
    ]
  },
  {
    name: 'Literature & Philosophy',
    questions: [
      {
        question: 'Who wrote the philosophical work “Meditations” while on campaign?',
        options: ['Plato', 'Marcus Aurelius', 'Immanuel Kant', 'Aristotle'],
        answer: 1,
        explanation: 'Roman emperor Marcus Aurelius wrote “Meditations” as a series of personal reflections and stoic philosophy.'
      },
      {
        question: 'Which novel begins with the line “Call me Ishmael”?',
        options: ['Moby‑Dick', 'War and Peace', 'The Great Gatsby', 'Crime and Punishment'],
        answer: 0,
        explanation: 'The opening line of Herman Melville’s classic novel “Moby‑Dick” is “Call me Ishmael.”'
      }
    ]
  },
  {
    name: 'Deep Thinking',
    questions: [
      {
        question: 'What is the philosophical study of knowledge called?',
        options: ['Metaphysics', 'Epistemology', 'Ethics', 'Ontology'],
        answer: 1,
        explanation: 'Epistemology is the branch of philosophy concerned with the nature and scope of knowledge.'
      },
      {
        question: 'According to physics, what is the term for the property of a body to remain at rest or in uniform motion unless acted upon by a force?',
        options: ['Inertia', 'Gravity', 'Momentum', 'Acceleration'],
        answer: 0,
        explanation: 'Inertia is Newton’s first law of motion describing an object’s resistance to changes in its state of motion.'
      }
    ]
  }
];

// Create references to the root element and maintain state variables
const app = document.getElementById('app');
let currentCategoryIndex = null;
let currentQuestionIndex = 0;
let score = 0;

// Entry point: show the list of available categories
function showCategories() {
  currentCategoryIndex = null;
  currentQuestionIndex = 0;
  score = 0;
  app.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'card';
  const heading = document.createElement('h1');
  heading.textContent = 'BrainForge Trivia';
  container.appendChild(heading);
  const subheading = document.createElement('p');
  subheading.textContent = 'Select a category to begin:';
  container.appendChild(subheading);
  categories.forEach((cat, index) => {
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = cat.name;
    button.addEventListener('click', () => startQuiz(index));
    container.appendChild(button);
  });
  app.appendChild(container);
}

// Start a quiz for the given category index
function startQuiz(catIndex) {
  currentCategoryIndex = catIndex;
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// Display the current question and answer choices
function showQuestion() {
  const category = categories[currentCategoryIndex];
  const questionObj = category.questions[currentQuestionIndex];
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = category.name;
  card.appendChild(heading);
  const question = document.createElement('p');
  question.textContent = questionObj.question;
  card.appendChild(question);
  questionObj.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(idx));
    card.appendChild(btn);
  });
  const status = document.createElement('p');
  status.className = 'status';
  status.textContent = `Question ${currentQuestionIndex + 1} of ${category.questions.length}`;
  card.appendChild(status);
  app.appendChild(card);
}

// Handle a user's answer selection
function checkAnswer(selectedIndex) {
  const category = categories[currentCategoryIndex];
  const q = category.questions[currentQuestionIndex];
  const correct = selectedIndex === q.answer;
  if (correct) {
    score++;
  }
  // Display result and explanation
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = correct ? 'Correct!' : 'Incorrect';
  card.appendChild(heading);
  const answerInfo = document.createElement('p');
  answerInfo.innerHTML = `<strong>Answer:</strong> ${q.options[q.answer]}`;
  card.appendChild(answerInfo);
  const explanation = document.createElement('p');
  explanation.textContent = q.explanation;
  card.appendChild(explanation);
  currentQuestionIndex++;
  if (currentQuestionIndex < category.questions.length) {
    const nextButton = document.createElement('button');
    nextButton.className = 'button';
    nextButton.textContent = 'Next Question';
    nextButton.addEventListener('click', showQuestion);
    card.appendChild(nextButton);
  } else {
    const finalButton = document.createElement('button');
    finalButton.className = 'button';
    finalButton.textContent = 'Return to Categories';
    finalButton.addEventListener('click', showCategories);
    card.appendChild(finalButton);
    const scoreEl = document.createElement('p');
    scoreEl.style.marginTop = '10px';
    scoreEl.innerHTML = `You answered ${score} out of ${category.questions.length} questions correctly.`;
    card.appendChild(scoreEl);
  }
  app.appendChild(card);
}

// Initialize the view when the DOM has loaded
document.addEventListener('DOMContentLoaded', showCategories);