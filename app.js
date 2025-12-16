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

// Define the data for each category. Each question now includes a unique `id`
// property so progress can be tracked across sessions. Feel free to extend
// the categories with additional questions. Note that the IDs should remain
// stable to preserve progress in localStorage.
const categories = [
  {
    name: 'World History',
    questions: [
      {
        id: 'WH1',
        question: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
        answer: 0,
        explanation: 'George Washington served as the first President of the United States from 1789 to 1797.'
      },
      {
        id: 'WH2',
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
        id: 'SC1',
        question: 'What part of the brain is most responsible for executive function?',
        options: ['Cerebellum', 'Brainstem', 'Prefrontal cortex', 'Occipital lobe'],
        answer: 2,
        explanation: 'The prefrontal cortex is responsible for planning, impulse control, and decision‑making.'
      },
      {
        id: 'SC2',
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Golgi apparatus'],
        answer: 2,
        explanation: 'Mitochondria produce ATP, the energy currency of the cell.'
      },
      {
        id: 'SC3',
        question: 'Which fundamental force keeps planets in orbit around the sun?',
        options: ['Electromagnetic force', 'Gravitational force', 'Strong nuclear force', 'Weak nuclear force'],
        answer: 1,
        explanation: 'Gravitational force between masses is responsible for planetary orbits.'
      },
      {
        id: 'SC4',
        question: 'In medicine, what does MRI stand for?',
        options: ['Magnetic Resonance Imaging', 'Medical Resonance Instrument', 'Massive Radiation Investigation', 'Magnetic Radio Interference'],
        answer: 0,
        explanation: 'MRI stands for Magnetic Resonance Imaging, a technique that uses magnetic fields and radio waves to create images.'
      }
    ]
  },
  {
    name: 'Math & Logic',
    questions: [
      {
        id: 'ML1',
        question: 'What is the value of π (pi) approximately?',
        options: ['2.14', '3.14', '4.14', '5.14'],
        answer: 1,
        explanation: 'Pi is approximately equal to 3.14159.'
      },
      {
        id: 'ML2',
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
        id: 'EF1',
        question: 'What economic term describes a general increase in prices and fall in the purchasing value of money?',
        options: ['Deflation', 'Inflation', 'Stagflation', 'Recession'],
        answer: 1,
        explanation: 'Inflation refers to a sustained rise in the general price level of goods and services.'
      },
      {
        id: 'EF2',
        question: 'In finance, what does ROI stand for?',
        options: ['Rate of Increase', 'Return on Investment', 'Risk of Investment', 'Revenue on Items'],
        answer: 1,
        explanation: 'ROI stands for Return on Investment and measures the gain or loss generated relative to the amount invested.'
      },
      {
        id: 'EF3',
        question: 'What is the formula for calculating compound annual growth rate (CAGR)?',
        options: ['Final Value / Initial Value ^ (1/n) - 1', 'Final Value - Initial Value / n', 'Initial Value / Final Value ^ (n) - 1', 'Final Value / Initial Value * n'],
        answer: 0,
        explanation: 'CAGR = (Final Value / Initial Value)^(1/n) - 1, where n is the number of periods.'
      },
      {
        id: 'EF4',
        question: 'Duration measures the sensitivity of a bond\'s price to changes in what?',
        options: ['Interest rates', 'Stock market', 'Inflation', 'Currency exchange rates'],
        answer: 0,
        explanation: 'Duration measures the sensitivity of a bond’s price to interest rate changes.'
      }
    ]
  },
  {
    name: 'Politics & Law',
    questions: [
      {
        id: 'PL1',
        question: 'Which document begins with the words “We the People”?',
        options: ['Bill of Rights', 'Declaration of Independence', 'U.S. Constitution', 'Articles of Confederation'],
        answer: 2,
        explanation: 'The preamble of the U.S. Constitution famously begins with “We the People.”'
      },
      {
        id: 'PL2',
        question: 'How many justices serve on the U.S. Supreme Court?',
        options: ['7', '8', '9', '10'],
        answer: 2,
        explanation: 'There are nine justices on the U.S. Supreme Court: one Chief Justice and eight Associate Justices.'
      }
    ]
  },
  {
    name: 'Judaism & Jewish Studies',
    questions: [
      {
        id: 'JS1',
        question: 'The Talmud consists of the Mishnah and what other component?',
        options: ['Midrash', 'Gemara', 'Torah', 'Ketuvim'],
        answer: 1,
        explanation: 'The Talmud comprises the Mishnah and the Gemara.'
      },
      {
        id: 'JS2',
        question: 'What does “Kosher” mean?',
        options: ['Blessed by a Rabbi', 'Fit or proper according to Jewish law', 'Cooked in a synagogue', 'Clean and organic'],
        answer: 1,
        explanation: 'Kosher means “fit” or “proper” according to Jewish dietary laws.'
      },
      {
        id: 'JS3',
        question: 'What is the Hebrew word for the Jewish Day of Atonement?',
        options: ['Passover', 'Rosh Hashanah', 'Yom Kippur', 'Sukkot'],
        answer: 2,
        explanation: 'Yom Kippur is the holiest day of the Jewish year, devoted to atonement and fasting.'
      },
      {
        id: 'JS4',
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
        id: 'LP1',
        question: 'Who wrote the philosophical work “Meditations” while on campaign?',
        options: ['Plato', 'Marcus Aurelius', 'Immanuel Kant', 'Aristotle'],
        answer: 1,
        explanation: 'Roman emperor Marcus Aurelius wrote “Meditations” as a series of personal reflections and stoic philosophy.'
      },
      {
        id: 'LP2',
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
        id: 'DT1',
        question: 'What is the philosophical study of knowledge called?',
        options: ['Metaphysics', 'Epistemology', 'Ethics', 'Ontology'],
        answer: 1,
        explanation: 'Epistemology is the branch of philosophy concerned with the nature and scope of knowledge.'
      },
      {
        id: 'DT2',
        question: 'According to physics, what is the term for the property of a body to remain at rest or in uniform motion unless acted upon by a force?',
        options: ['Inertia', 'Gravity', 'Momentum', 'Acceleration'],
        answer: 0,
        explanation: 'Inertia is Newton’s first law of motion describing an object’s resistance to changes in its state of motion.'
      }
    ]
  }
];

// Key names for persisting progress and daily challenge selections in
// localStorage. Using unique keys avoids collisions with other web apps.
const PROGRESS_KEY = 'brainforge-progress';
const DAILY_KEY = 'brainforge-daily';

// Modes: determines whether the user is playing a single category or a daily
// challenge. When in 'category' mode the indices refer to categories array.
// In 'daily' mode we keep a list of question references with category and
// question indices.
let currentMode = 'category';
let dailyQuestions = [];
let dailyIndex = 0;

// Load progress from localStorage. Returns an object keyed by question ID.
function loadProgress() {
  try {
    const item = localStorage.getItem(PROGRESS_KEY);
    return item ? JSON.parse(item) : {};
  } catch (e) {
    return {};
  }
}

// Save progress back to localStorage. Always call after modifying.
function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// Update the progress entry for a given question ID based on whether the
// answer was correct. Tracks times seen, times correct and distinct dates
// when the question was answered correctly. Computes a mastery state:
// 0 = New, 1 = Learning, 2 = Mastered.
function updateProgress(questionId, correct) {
  const progress = loadProgress();
  const today = new Date().toISOString().split('T')[0];
  let entry = progress[questionId];
  if (!entry) {
    entry = { timesSeen: 0, timesCorrect: 0, correctDates: [], mastery: 0 };
  }
  entry.timesSeen += 1;
  if (correct) {
    entry.timesCorrect += 1;
    if (!entry.correctDates.includes(today)) {
      entry.correctDates.push(today);
    }
  }
  // Determine mastery level
  if (entry.correctDates.length >= 3) {
    entry.mastery = 2; // mastered
  } else if (entry.correctDates.length >= 1) {
    entry.mastery = 1; // learning
  } else {
    entry.mastery = 0; // new
  }
  progress[questionId] = entry;
  saveProgress(progress);
}

// Return a human‑readable label for a mastery state
function getMasteryLabel(mastery) {
  switch (mastery) {
    case 2: return 'Mastered';
    case 1: return 'Learning';
    default: return 'New';
  }
}

// Retrieve the current daily challenge set or generate a new one if the
// stored set is from a previous day. A set contains an array of objects
// { categoryIndex, questionIndex } representing individual questions.
function getDailyChallengeSet() {
  const today = new Date().toISOString().split('T')[0];
  try {
    const stored = JSON.parse(localStorage.getItem(DAILY_KEY));
    if (stored && stored.date === today && Array.isArray(stored.questions)) {
      return stored.questions;
    }
  } catch (_) { /* ignore errors */ }
  // Generate a new set if none exists for today
  const progress = loadProgress();
  let weighted = [];
  categories.forEach((cat, cIdx) => {
    cat.questions.forEach((q, qIdx) => {
      const entry = progress[q.id];
      const mastery = entry ? entry.mastery : 0;
      let weight;
      // Lower mastery means higher weight to encourage repetition
      if (mastery === 2) weight = 1;
      else if (mastery === 1) weight = 2;
      else weight = 3;
      for (let i = 0; i < weight; i++) {
        weighted.push({ categoryIndex: cIdx, questionIndex: qIdx });
      }
    });
  });
  // Shuffle weighted list
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
  }
  // Select up to 5 unique questions
  const selected = [];
  weighted.some(item => {
    const exists = selected.some(s => s.categoryIndex === item.categoryIndex && s.questionIndex === item.questionIndex);
    if (!exists) {
      selected.push(item);
    }
    return selected.length >= 5;
  });
  const newSet = { date: today, questions: selected };
  localStorage.setItem(DAILY_KEY, JSON.stringify(newSet));
  return selected;
}

// Start a daily challenge: prepare the questions and set state variables
function startDailyChallenge() {
  currentMode = 'daily';
  dailyQuestions = getDailyChallengeSet();
  dailyIndex = 0;
  score = 0;
  showQuestion();
}

// Create references to the root element and maintain state variables
const app = document.getElementById('app');
let currentCategoryIndex = null;
let currentQuestionIndex = 0;
let score = 0;

// Entry point: show the list of available categories
function showCategories() {
  // Reset state for category mode
  currentMode = 'category';
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
  // Insert a button to start the daily challenge. The daily challenge pulls
  // from all categories and prioritizes questions you haven\'t mastered yet.
  const dailyBtn = document.createElement('button');
  dailyBtn.className = 'button';
  dailyBtn.style.marginBottom = '12px';
  dailyBtn.textContent = 'Daily Challenge';
  dailyBtn.addEventListener('click', startDailyChallenge);
  container.appendChild(dailyBtn);
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
  currentMode = 'category';
  currentCategoryIndex = catIndex;
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// Display the current question and answer choices
function showQuestion() {
  // Determine the current question based on mode (category or daily)
  let qInfo;
  let displayCategory;
  let totalQuestions;
  let indexInSet;
  if (currentMode === 'category') {
    const category = categories[currentCategoryIndex];
    qInfo = category.questions[currentQuestionIndex];
    displayCategory = category.name;
    totalQuestions = category.questions.length;
    indexInSet = currentQuestionIndex;
  } else {
    const ref = dailyQuestions[dailyIndex];
    const category = categories[ref.categoryIndex];
    qInfo = category.questions[ref.questionIndex];
    displayCategory = 'Daily Challenge';
    totalQuestions = dailyQuestions.length;
    indexInSet = dailyIndex;
  }
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = displayCategory;
  card.appendChild(heading);
  const question = document.createElement('p');
  question.textContent = qInfo.question;
  card.appendChild(question);
  // Render options
  qInfo.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(idx));
    card.appendChild(btn);
  });
  // Display status including mastery of current question
  const status = document.createElement('p');
  status.className = 'status';
  const progress = loadProgress();
  const entry = progress[qInfo.id];
  const masteryLabel = getMasteryLabel(entry ? entry.mastery : 0);
  status.textContent = `Question ${indexInSet + 1} of ${totalQuestions} • Status: ${masteryLabel}`;
  card.appendChild(status);
  app.appendChild(card);
}

// Handle a user's answer selection
function checkAnswer(selectedIndex) {
  // Determine current question and correct answer based on mode
  let qInfo;
  if (currentMode === 'category') {
    qInfo = categories[currentCategoryIndex].questions[currentQuestionIndex];
  } else {
    const ref = dailyQuestions[dailyIndex];
    qInfo = categories[ref.categoryIndex].questions[ref.questionIndex];
  }
  const correct = selectedIndex === qInfo.answer;
  // Update score and progress
  if (correct) {
    score++;
  }
  updateProgress(qInfo.id, correct);
  // Display result and explanation
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = correct ? 'Correct!' : 'Incorrect';
  card.appendChild(heading);
  const answerInfo = document.createElement('p');
  answerInfo.innerHTML = `<strong>Answer:</strong> ${qInfo.options[qInfo.answer]}`;
  card.appendChild(answerInfo);
  const explanation = document.createElement('p');
  explanation.textContent = qInfo.explanation;
  card.appendChild(explanation);
  // Advance to next question or finish
  let hasMore = false;
  if (currentMode === 'category') {
    currentQuestionIndex++;
    if (currentQuestionIndex < categories[currentCategoryIndex].questions.length) {
      hasMore = true;
    }
  } else {
    dailyIndex++;
    if (dailyIndex < dailyQuestions.length) {
      hasMore = true;
    }
  }
  if (hasMore) {
    const nextButton = document.createElement('button');
    nextButton.className = 'button';
    nextButton.textContent = 'Next Question';
    nextButton.addEventListener('click', showQuestion);
    card.appendChild(nextButton);
  } else {
    const finalButton = document.createElement('button');
    finalButton.className = 'button';
    finalButton.textContent = 'Return to Home';
    finalButton.addEventListener('click', showCategories);
    card.appendChild(finalButton);
    const scoreEl = document.createElement('p');
    scoreEl.style.marginTop = '10px';
    if (currentMode === 'category') {
      scoreEl.innerHTML = `You answered ${score} out of ${categories[currentCategoryIndex].questions.length} questions correctly.`;
    } else {
      scoreEl.innerHTML = `Daily challenge complete! You answered ${score} out of ${dailyQuestions.length} questions correctly.`;
    }
    card.appendChild(scoreEl);
  }
  app.appendChild(card);
}

// Initialize the view when the DOM has loaded
document.addEventListener('DOMContentLoaded', showCategories);