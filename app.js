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
      ,
      {
        id: 'WH3',
        question: 'In which year did the French Revolution begin?',
        options: ['1776', '1789', '1804', '1812'],
        answer: 1,
        explanation: 'The French Revolution began in 1789 with the storming of the Bastille.'
      },
      {
        id: 'WH4',
        question: 'Who was the first emperor of Rome?',
        options: ['Julius Caesar', 'Augustus', 'Nero', 'Marcus Aurelius'],
        answer: 1,
        explanation: 'Augustus, also known as Octavian, became the first Roman emperor in 27 BCE.'
      },
      {
        id: 'WH5',
        question: 'Which ancient civilization built the Pyramids of Giza?',
        options: ['Greek', 'Roman', 'Egyptian', 'Mesopotamian'],
        answer: 2,
        explanation: 'The Egyptians constructed the Pyramids of Giza during the Old Kingdom period.'
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
      ,
      {
        id: 'SC5',
        question: 'Which organ in the human body produces insulin?',
        options: ['Liver', 'Pancreas', 'Kidney', 'Spleen'],
        answer: 1,
        explanation: 'The pancreas produces insulin, a hormone that regulates blood sugar levels.'
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
      ,
      {
        id: 'ML3',
        question: 'What is the square root of 49?',
        options: ['6', '7', '8', '9'],
        answer: 1,
        explanation: 'The square root of 49 is 7.'
      },
      {
        id: 'ML4',
        question: 'What is the next prime number after 7?',
        options: ['9', '10', '11', '13'],
        answer: 2,
        explanation: 'The prime numbers after 7 are 11 and 13; the next one is 11.'
      },
      {
        id: 'ML5',
        question: 'A logical fallacy that attacks the person rather than the argument is called what?',
        options: ['Strawman', 'Ad hominem', 'Red herring', 'Circular reasoning'],
        answer: 1,
        explanation: 'An ad hominem fallacy attacks the person instead of addressing the argument.'
      }
    ]
  },
  {
    name: 'Real Estate',
    questions: [
      {
        id: 'RE1',
        question: 'What does NOI stand for in commercial real estate?',
        options: ['Net Operating Income', 'Net Ownership Interest', 'Nominal Occupancy Index', 'National Office Index'],
        answer: 0,
        explanation: 'NOI (Net Operating Income) is the revenue from a property minus operating expenses, used to assess profitability.'
      },
      {
        id: 'RE2',
        question: 'Cap rate is calculated by dividing which figure by the property\'s current market value?',
        options: ['Net Operating Income', 'Gross Rental Income', 'Debt Service', 'Vacancy Rate'],
        answer: 0,
        explanation: 'The capitalization rate equals Net Operating Income divided by current market value, measuring yield on investment.'
      },
      {
        id: 'RE3',
        question: 'What type of lease requires the tenant to pay property taxes, insurance, and maintenance?',
        options: ['Triple net (NNN) lease', 'Gross lease', 'Modified gross lease', 'Percentage lease'],
        answer: 0,
        explanation: 'In a triple-net lease, the tenant pays taxes, insurance, and maintenance in addition to base rent.'
      },
      {
        id: 'RE4',
        question: 'Which ratio compares annual debt obligations to net operating income?',
        options: ['Loan-to-value ratio', 'Debt-service coverage ratio', 'Capitalization ratio', 'Gross rent multiplier'],
        answer: 1,
        explanation: 'The debt-service coverage ratio (DSCR) compares net operating income to debt payments.'
      },
      {
        id: 'RE5',
        question: 'Class A buildings generally refer to properties that are:',
        options: ['Older but well-maintained buildings', 'Newer, high-quality buildings in prime locations', 'Industrial warehouses', 'Unimproved land'],
        answer: 1,
        explanation: 'Class A properties are newer, high-quality buildings in prime locations, commanding top rents.'
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
      ,
      {
        id: 'EF5',
        question: 'In investing, what is diversification intended to do?',
        options: ['Increase volatility', 'Spread risk across different assets', 'Concentrate holdings in one asset', 'Eliminate all risk'],
        answer: 1,
        explanation: 'Diversification spreads investment risk across different assets to reduce the impact of any single asset’s poor performance.'
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
      ,
      {
        id: 'PL3',
        question: 'How many amendments does the U.S. Constitution have?',
        options: ['10', '27', '33', '5'],
        answer: 1,
        explanation: 'There are 27 amendments to the U.S. Constitution.'
      },
      {
        id: 'PL4',
        question: 'Which branch of government interprets laws?',
        options: ['Legislative', 'Executive', 'Judicial', 'Administrative'],
        answer: 2,
        explanation: 'The judicial branch interprets laws.'
      },
      {
        id: 'PL5',
        question: 'What legal doctrine requires courts to follow precedents established in previous cases?',
        options: ['Habeas Corpus', 'Mens Rea', 'Stare Decisis', 'Res Judicata'],
        answer: 2,
        explanation: 'Stare decisis is the doctrine that courts should follow precedent.'
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
      ,
      {
        id: 'JS5',
        question: 'What is the name of the prayer that declares the unity of God?',
        options: ['Amidah', 'Kaddish', 'Shema', 'Aleinu'],
        answer: 2,
        explanation: 'The Shema is the central prayer declaring the unity of God: “Hear, O Israel…”.'
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
      ,
      {
        id: 'LP3',
        question: 'Who wrote “The Prince”?',
        options: ['Niccolò Machiavelli', 'Thomas More', 'John Locke', 'Francesco Petrarch'],
        answer: 0,
        explanation: '“The Prince” was written by Niccolò Machiavelli in the 16th century.'
      },
      {
        id: 'LP4',
        question: 'What is a story that uses animals to convey morals called?',
        options: ['Myth', 'Legend', 'Fable', 'Epic'],
        answer: 2,
        explanation: 'A fable is a short story that uses animals or inanimate objects to teach a moral lesson.'
      },
      {
        id: 'LP5',
        question: 'Which philosopher is known for the statement “I think, therefore I am”?',
        options: ['Socrates', 'Immanuel Kant', 'René Descartes', 'David Hume'],
        answer: 2,
        explanation: 'René Descartes made the philosophical statement “Cogito, ergo sum” meaning “I think, therefore I am.”'
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
      ,
      {
        id: 'DT3',
        question: 'What is the philosophical study of being called?',
        options: ['Metaphysics', 'Ontology', 'Ethics', 'Phenomenology'],
        answer: 1,
        explanation: 'Ontology is the branch of metaphysics that studies the nature of being and existence.'
      },
      {
        id: 'DT4',
        question: 'Which thought experiment describes a cat that is simultaneously alive and dead until observed?',
        options: ['Trolley Problem', 'Schrödinger\'s cat', 'Ship of Theseus', 'Brain in a vat'],
        answer: 1,
        explanation: 'Schrödinger’s cat illustrates quantum superposition, showing that a particle can exist in multiple states until observed.'
      },
      {
        id: 'DT5',
        question: 'Which branch of philosophy deals with questions of morality and right action?',
        options: ['Epistemology', 'Aesthetics', 'Ethics', 'Logic'],
        answer: 2,
        explanation: 'Ethics is the philosophical study of moral values and rules.'
      }
    ]
  }
];

// Key names for persisting progress and daily challenge selections in
// localStorage. Using unique keys avoids collisions with other web apps.
const PROGRESS_KEY = 'brainforge-progress';
const DAILY_KEY    = 'brainforge-daily';

// Keys for storing XP, streak, last played date, bookmarks and path progress.
// XP is a running total of points earned. Streak counts consecutive days
// with at least one question answered. Last date stores the last day the
// user played to calculate streak progression. Bookmarks stores an array
// of question IDs that the user has saved for later review. Path progress
// tracks the current position within each learning path by name.
const XP_KEY          = 'brainforge-xp';
const STREAK_KEY      = 'brainforge-streak';
const LAST_DATE_KEY   = 'brainforge-last-date';
const BOOKMARKS_KEY   = 'brainforge-bookmarks';
const PATH_PROGRESS_KEY = 'brainforge-path-progress';

// Key for storing the user\'s theme preference (light vs dark)
const THEME_KEY = 'brainforge-theme';

// Load the saved theme preference from localStorage. Returns true if dark
// mode is enabled, false otherwise.
function loadTheme() {
  try {
    const val = localStorage.getItem(THEME_KEY);
    return val === 'dark';
  } catch (_) {
    return false;
  }
}

// Apply the current theme by toggling the `dark` class on the body. Pass
// `isDark` true to enable dark mode.
function applyTheme(isDark) {
  document.body.classList.toggle('dark', !!isDark);
}

// Toggle the theme preference and update the UI accordingly.
function toggleTheme() {
  const dark = !loadTheme();
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  applyTheme(dark);
  // Update toggle button text if it exists
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.textContent = dark ? 'Light Mode' : 'Dark Mode';
  }
}

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

// ----------------------- XP and Streak Utilities -----------------------
// Load the accumulated XP from localStorage. Returns 0 if not set.
function loadXP() {
  const val = localStorage.getItem(XP_KEY);
  return val ? parseInt(val, 10) || 0 : 0;
}

// Save the XP back to localStorage.
function saveXP(xp) {
  localStorage.setItem(XP_KEY, String(xp));
}

// Add a number of points to the user\'s XP and persist. Returns the new total.
function addXP(points) {
  const current = loadXP();
  const updated = current + points;
  saveXP(updated);
  return updated;
}

// Load the current streak (consecutive days of play).
function loadStreak() {
  const val = localStorage.getItem(STREAK_KEY);
  return val ? parseInt(val, 10) || 0 : 0;
}

// Save the streak value.
function saveStreak(streak) {
  localStorage.setItem(STREAK_KEY, String(streak));
}

// Update the daily streak. Called when the user answers at least one
// question on a given day. If the user played yesterday, increment the
// streak. Otherwise reset to 1. The last played date is stored to
// determine continuity.
function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  const last = localStorage.getItem(LAST_DATE_KEY);
  if (last === today) {
    // Already updated today
    return;
  }
  let streak = loadStreak();
  if (last) {
    // Determine if last play was yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];
    if (last === yStr) {
      streak += 1;
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }
  saveStreak(streak);
  localStorage.setItem(LAST_DATE_KEY, today);
}

// ----------------------- Bookmark Utilities -----------------------
// Load bookmarks as an array of question IDs.
function loadBookmarks() {
  try {
    const val = localStorage.getItem(BOOKMARKS_KEY);
    return val ? JSON.parse(val) : [];
  } catch (e) {
    return [];
  }
}

// Save bookmarks back to localStorage.
function saveBookmarks(bookmarks) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

// Toggle the presence of a question ID in the bookmarks. Returns true if
// the question was added, false if removed.
function toggleBookmark(questionId) {
  const bookmarks = loadBookmarks();
  const idx = bookmarks.indexOf(questionId);
  let added;
  if (idx === -1) {
    bookmarks.push(questionId);
    added = true;
  } else {
    bookmarks.splice(idx, 1);
    added = false;
  }
  saveBookmarks(bookmarks);
  return added;
}

// Check if a question ID is bookmarked.
function isBookmarked(questionId) {
  const bookmarks = loadBookmarks();
  return bookmarks.includes(questionId);
}

// ----------------------- Learning Path Utilities -----------------------
// Predefined learning paths for Jewish studies and potentially other subjects.
// Each path has a name and an array of question IDs representing a curated
// sequence of questions. Additional paths can be added here.
const paths = [
  {
    name: 'Judaism Basics',
    questions: ['JS1','JS2','JS3','JS4','JS5']
  },
  {
    name: 'Philosophy Sampler',
    questions: ['LP1','LP3','DT1','DT3','DT5']
  }
];

// Load path progress from localStorage. The structure is an object where
// keys are path names and values are indices indicating the next
// question to ask. If no progress exists, return an empty object.
function loadPathProgress() {
  try {
    const val = localStorage.getItem(PATH_PROGRESS_KEY);
    return val ? JSON.parse(val) : {};
  } catch (e) {
    return {};
  }
}

// Save path progress to localStorage.
function savePathProgress(progress) {
  localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));
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

// Display a statistics view showing mastery progress for each category.
function showStats() {
  currentMode = 'stats';
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = 'Your Stats';
  card.appendChild(heading);
  // Display overall XP and streak at top of stats
  const totalXp = loadXP();
  const streak = loadStreak();
  const level = Math.floor(totalXp / 100) + 1;
  const xpInLevel = totalXp % 100;
  const xpSummary = document.createElement('p');
  xpSummary.style.fontWeight = '600';
  xpSummary.textContent = `Level ${level} • XP: ${totalXp} • Streak: ${streak}`;
  card.appendChild(xpSummary);
  const progress = loadProgress();
  categories.forEach(cat => {
    const total = cat.questions.length;
    let mastered = 0;
    let learning = 0;
    let newCount = 0;
    cat.questions.forEach(q => {
      const entry = progress[q.id];
      if (entry) {
        if (entry.mastery === 2) mastered++;
        else if (entry.mastery === 1) learning++;
        else newCount++;
      } else {
        newCount++;
      }
    });
    const section = document.createElement('div');
    const catTitle = document.createElement('h3');
    catTitle.textContent = cat.name;
    section.appendChild(catTitle);
    const statsLine = document.createElement('p');
    statsLine.innerHTML = `<strong>Total:</strong> ${total} • <span style="color: #388e3c; font-weight:bold;">Mastered</span> ${mastered} • <span style="color: #f57c00; font-weight:bold;">Learning</span> ${learning} • <span style="color: #616161; font-weight:bold;">New</span> ${newCount}`;
    section.appendChild(statsLine);
    card.appendChild(section);
  });
  // Buttons to reset progress and return home
  const resetBtn = document.createElement('button');
  resetBtn.className = 'button secondary';
  resetBtn.textContent = 'Reset Progress';
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem(PROGRESS_KEY);
    showStats();
  });
  card.appendChild(resetBtn);
  const backBtn = document.createElement('button');
  backBtn.className = 'button';
  backBtn.textContent = 'Return Home';
  backBtn.addEventListener('click', showCategories);
  card.appendChild(backBtn);
  app.appendChild(card);
}

// Create references to the root element and maintain state variables
const app = document.getElementById('app');
let currentCategoryIndex = null;
let currentQuestionIndex = 0;
let score = 0;

// Variables for case study and learning paths
let caseQuestions = [];
let caseIndex = 0;
let currentPathIndex = null;
let pathQuestionIndex = 0;

// Show the user\'s saved bookmarks. Displays each bookmarked question with
// its text, answer and explanation and allows removal. Also provides a
// button to practice all bookmarked questions.
function showBookmarks() {
  currentMode = 'bookmarks';
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = 'Saved Questions';
  card.appendChild(heading);
  const bookmarks = loadBookmarks();
  if (bookmarks.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = 'You have no saved questions yet.';
    card.appendChild(msg);
  } else {
    // Gather question objects by ID
    const questionObjs = [];
    categories.forEach(cat => {
      cat.questions.forEach(q => {
        if (bookmarks.includes(q.id)) {
          questionObjs.push({ ...q, category: cat.name });
        }
      });
    });
    questionObjs.forEach(obj => {
      const qCard = document.createElement('div');
      qCard.style.borderTop = '1px solid var(--secondary-bg)';
      qCard.style.paddingTop = '12px';
      const qText = document.createElement('p');
      qText.innerHTML = `<strong>Category:</strong> ${obj.category}<br><strong>Question:</strong> ${obj.question}`;
      qCard.appendChild(qText);
      const aText = document.createElement('p');
      aText.innerHTML = `<strong>Answer:</strong> ${obj.options[obj.answer]}`;
      qCard.appendChild(aText);
      const expText = document.createElement('p');
      expText.textContent = obj.explanation;
      qCard.appendChild(expText);
      const removeBtn = document.createElement('button');
      removeBtn.className = 'button secondary';
      removeBtn.textContent = 'Remove Bookmark';
      removeBtn.addEventListener('click', () => {
        toggleBookmark(obj.id);
        showBookmarks();
      });
      qCard.appendChild(removeBtn);
      card.appendChild(qCard);
    });
  }
  // Button to practice bookmarks
  if (bookmarks.length > 0) {
    const practiceBtn = document.createElement('button');
    practiceBtn.className = 'button';
    practiceBtn.textContent = 'Practice Bookmarks';
    practiceBtn.addEventListener('click', () => {
      startPracticeBookmarks();
    });
    card.appendChild(practiceBtn);
  }
  const backBtn = document.createElement('button');
  backBtn.className = 'button';
  backBtn.textContent = 'Return Home';
  backBtn.addEventListener('click', showCategories);
  card.appendChild(backBtn);
  app.appendChild(card);
}

// Start a quiz mode for practicing bookmarked questions. This uses the
// existing quiz logic but restricts the set of questions to the user\'s
// bookmarks. If no bookmarks exist, it simply returns home.
function startPracticeBookmarks() {
  const bookmarks = loadBookmarks();
  if (bookmarks.length === 0) {
    showCategories();
    return;
  }
  // Flatten bookmarked questions into a list similar to dailyQuestions
  dailyQuestions = [];
  categories.forEach((cat, cIdx) => {
    cat.questions.forEach((q, qIdx) => {
      if (bookmarks.includes(q.id)) {
        dailyQuestions.push({ categoryIndex: cIdx, questionIndex: qIdx });
      }
    });
  });
  if (dailyQuestions.length === 0) {
    showCategories();
    return;
  }
  currentMode = 'bookmarks-quiz';
  dailyIndex = 0;
  score = 0;
  showQuestion();
}

// Start a Real Estate case study. Displays an introduction and then
// proceeds through all questions in the Real Estate category as part of
// a cohesive scenario.
function startCaseStudy() {
  // Find Real Estate category
  const idx = categories.findIndex(cat => cat.name === 'Real Estate');
  if (idx === -1) {
    alert('Real Estate category not found.');
    return;
  }
  currentMode = 'caseStudy';
  caseQuestions = categories[idx].questions;
  caseIndex = 0;
  // Show introduction to the scenario
  showCaseIntro();
}

// Display an introduction to the real estate case study.
function showCaseIntro() {
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = 'Real Estate Case Study';
  card.appendChild(heading);
  const intro = document.createElement('p');
  intro.textContent = 'You are evaluating a commercial property investment. Answer the following questions to analyze the deal. Each answer helps you understand key metrics and concepts.';
  card.appendChild(intro);
  const startBtn = document.createElement('button');
  startBtn.className = 'button';
  startBtn.textContent = 'Begin Case Study';
  startBtn.addEventListener('click', showCaseQuestion);
  card.appendChild(startBtn);
  const backBtn = document.createElement('button');
  backBtn.className = 'button secondary';
  backBtn.textContent = 'Return Home';
  backBtn.addEventListener('click', showCategories);
  card.appendChild(backBtn);
  app.appendChild(card);
}

// Display the current question in the case study sequence.
function showCaseQuestion() {
  if (caseIndex >= caseQuestions.length) {
    // Finish case study
    app.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    const heading = document.createElement('h2');
    heading.textContent = 'Case Study Complete!';
    card.appendChild(heading);
    const summary = document.createElement('p');
    summary.innerHTML = `You answered ${score} out of ${caseQuestions.length} questions correctly in the real estate case study.`;
    card.appendChild(summary);
    const doneBtn = document.createElement('button');
    doneBtn.className = 'button';
    doneBtn.textContent = 'Return Home';
    doneBtn.addEventListener('click', showCategories);
    card.appendChild(doneBtn);
    app.appendChild(card);
    return;
  }
  const qInfo = caseQuestions[caseIndex];
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = 'Real Estate Case Study';
  card.appendChild(heading);
  const question = document.createElement('p');
  question.textContent = qInfo.question;
  card.appendChild(question);
  qInfo.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = option;
    btn.addEventListener('click', () => checkCaseAnswer(idx));
    card.appendChild(btn);
  });
  const status = document.createElement('p');
  status.className = 'status';
  const progress = loadProgress();
  const entry = progress[qInfo.id];
  const masteryLabel = getMasteryLabel(entry ? entry.mastery : 0);
  status.textContent = `Question ${caseIndex + 1} of ${caseQuestions.length} • Status: ${masteryLabel}`;
  card.appendChild(status);
  app.appendChild(card);
}

// Handle answer selection in case study mode
function checkCaseAnswer(selectedIndex) {
  const qInfo = caseQuestions[caseIndex];
  const correct = selectedIndex === qInfo.answer;
  if (correct) {
    score++;
    addXP(10);
  } else {
    addXP(2);
  }
  updateProgress(qInfo.id, correct);
  updateStreak();
  // Show feedback
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = correct ? 'Correct!' : 'Incorrect';
  card.appendChild(heading);
  const aInfo = document.createElement('p');
  aInfo.innerHTML = `<strong>Answer:</strong> ${qInfo.options[qInfo.answer]}`;
  card.appendChild(aInfo);
  const exp = document.createElement('p');
  exp.textContent = qInfo.explanation;
  card.appendChild(exp);
  // Save for review button
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'button secondary';
  const initialLabel = isBookmarked(qInfo.id) ? 'Remove Bookmark' : 'Save for Review';
  bookmarkBtn.textContent = initialLabel;
  bookmarkBtn.addEventListener('click', () => {
    const added = toggleBookmark(qInfo.id);
    bookmarkBtn.textContent = added ? 'Remove Bookmark' : 'Save for Review';
  });
  card.appendChild(bookmarkBtn);
  // Next or finish
  caseIndex++;
  if (caseIndex < caseQuestions.length) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'button';
    nextBtn.textContent = 'Next Question';
    nextBtn.addEventListener('click', showCaseQuestion);
    card.appendChild(nextBtn);
  } else {
    const finishBtn = document.createElement('button');
    finishBtn.className = 'button';
    finishBtn.textContent = 'Finish Case Study';
    finishBtn.addEventListener('click', showCaseQuestion);
    card.appendChild(finishBtn);
  }
  app.appendChild(card);
}

// Display available learning paths and their progress. Allows the user to
// start or continue a path.
function showPaths() {
  currentMode = 'paths';
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = 'Learning Paths';
  card.appendChild(heading);
  const progress = loadPathProgress();
  paths.forEach((path, idx) => {
    const section = document.createElement('div');
    section.style.borderTop = '1px solid var(--secondary-bg)';
    section.style.paddingTop = '12px';
    const title = document.createElement('h3');
    title.textContent = path.name;
    section.appendChild(title);
    const currentIndex = progress[path.name] || 0;
    const total = path.questions.length;
    const statusText = document.createElement('p');
    statusText.textContent = `Progress: ${Math.min(currentIndex, total)} / ${total}`;
    section.appendChild(statusText);
    const startBtn = document.createElement('button');
    startBtn.className = 'button';
    startBtn.textContent = currentIndex >= total ? 'Restart Path' : (currentIndex === 0 ? 'Start Path' : 'Continue Path');
    startBtn.addEventListener('click', () => startPath(idx));
    section.appendChild(startBtn);
    card.appendChild(section);
  });
  const backBtn = document.createElement('button');
  backBtn.className = 'button';
  backBtn.textContent = 'Return Home';
  backBtn.addEventListener('click', showCategories);
  card.appendChild(backBtn);
  app.appendChild(card);
}

// Fetch additional questions from the Open Trivia Database. This helper returns
// an array of question objects formatted like our built‑in categories. It uses
// the public Open Trivia DB API to retrieve random multiple‑choice questions.
async function fetchOpenTrivia(amount = 10) {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
    const data = await response.json();
    if (!data || !Array.isArray(data.results)) {
      return [];
    }
    // Helper to decode HTML entities from the API response
    const decode = (str) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(str, 'text/html');
      return doc.documentElement.textContent;
    };
    return data.results.map((item, idx) => {
      // Combine correct and incorrect answers, then shuffle
      const allOptions = [...item.incorrect_answers.map(decode), decode(item.correct_answer)];
      // Shuffle options
      for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
      }
      // Determine the index of the correct answer after shuffle
      const answerIndex = allOptions.indexOf(decode(item.correct_answer));
      return {
        id: `OT${Date.now()}-${idx}`,
        question: decode(item.question),
        options: allOptions,
        answer: answerIndex,
        // Use the correct answer as a simple explanation
        explanation: decode(item.correct_answer)
      };
    });
  } catch (err) {
    console.error('Failed to fetch from OpenTriviaDB', err);
    return [];
  }
}

// Start a quiz using questions fetched from the Open Trivia DB. This function
// retrieves a batch of questions and then enters quiz mode as if they were a
// regular category. Each call fetches a new set of questions so users can play
// indefinitely. XP is awarded in the same way as built‑in questions.
async function startOpenTrivia() {
  currentMode = 'category';
  app.innerHTML = '';
  const loadingCard = document.createElement('div');
  loadingCard.className = 'card';
  const loadingText = document.createElement('p');
  loadingText.textContent = 'Fetching questions…';
  loadingCard.appendChild(loadingText);
  app.appendChild(loadingCard);
  // Attempt to fetch 15 questions from the API
  const fetchedQuestions = await fetchOpenTrivia(15);
  if (!fetchedQuestions.length) {
    loadingText.textContent = 'Unable to load questions. Please try again later.';
    return;
  }
  // Use a temporary category object for this session
  currentCategoryIndex = null;
  questions = fetchedQuestions;
  currentQuestionIndex = 0;
  score = 0;
  // Replace the loading UI with the first question
  showQuestion();
}

// Start or continue a specific learning path
function startPath(pathIndex) {
  currentMode = 'path';
  currentPathIndex = pathIndex;
  const progress = loadPathProgress();
  pathQuestionIndex = progress[paths[pathIndex].name] || 0;
  score = 0;
  showPathQuestion();
}

// Display the current question in a learning path. When the path is
// completed, show a completion message and reset progress.
function showPathQuestion() {
  const path = paths[currentPathIndex];
  const progress = loadPathProgress();
  if (pathQuestionIndex >= path.questions.length) {
    // Completed the path
    const updated = { ...progress, [path.name]: 0 };
    savePathProgress(updated);
    app.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    const heading = document.createElement('h2');
    heading.textContent = 'Path Complete!';
    card.appendChild(heading);
    const msg = document.createElement('p');
    msg.textContent = `You completed the ${path.name} learning path and earned ${score} points!`;
    card.appendChild(msg);
    const homeBtn = document.createElement('button');
    homeBtn.className = 'button';
    homeBtn.textContent = 'Return Home';
    homeBtn.addEventListener('click', showCategories);
    card.appendChild(homeBtn);
    app.appendChild(card);
    return;
  }
  // Find the question object by ID
  const qId = path.questions[pathQuestionIndex];
  let qInfo;
  categories.forEach(cat => {
    cat.questions.forEach(q => {
      if (q.id === qId) {
        qInfo = q;
      }
    });
  });
  if (!qInfo) {
    // If the ID is missing, skip to next
    pathQuestionIndex++;
    showPathQuestion();
    return;
  }
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = path.name;
  card.appendChild(heading);
  const question = document.createElement('p');
  question.textContent = qInfo.question;
  card.appendChild(question);
  qInfo.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = option;
    btn.addEventListener('click', () => checkPathAnswer(idx));
    card.appendChild(btn);
  });
  const status = document.createElement('p');
  status.className = 'status';
  const progEntry = loadProgress()[qInfo.id];
  const masteryLabel = getMasteryLabel(progEntry ? progEntry.mastery : 0);
  status.textContent = `Question ${pathQuestionIndex + 1} of ${path.questions.length} • Status: ${masteryLabel}`;
  card.appendChild(status);
  app.appendChild(card);
}

// Handle answer selection in a learning path
function checkPathAnswer(selectedIndex) {
  const path = paths[currentPathIndex];
  const qId = path.questions[pathQuestionIndex];
  let qInfo;
  categories.forEach(cat => {
    cat.questions.forEach(q => {
      if (q.id === qId) qInfo = q;
    });
  });
  const correct = selectedIndex === qInfo.answer;
  if (correct) {
    score++;
    addXP(10);
  } else {
    addXP(2);
  }
  updateProgress(qInfo.id, correct);
  updateStreak();
  // Show feedback
  app.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  const heading = document.createElement('h2');
  heading.textContent = correct ? 'Correct!' : 'Incorrect';
  card.appendChild(heading);
  const aInfo = document.createElement('p');
  aInfo.innerHTML = `<strong>Answer:</strong> ${qInfo.options[qInfo.answer]}`;
  card.appendChild(aInfo);
  const exp = document.createElement('p');
  exp.textContent = qInfo.explanation;
  card.appendChild(exp);
  // Bookmark toggle button
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'button secondary';
  const initialLabel = isBookmarked(qInfo.id) ? 'Remove Bookmark' : 'Save for Review';
  bookmarkBtn.textContent = initialLabel;
  bookmarkBtn.addEventListener('click', () => {
    const added = toggleBookmark(qInfo.id);
    bookmarkBtn.textContent = added ? 'Remove Bookmark' : 'Save for Review';
  });
  card.appendChild(bookmarkBtn);
  // Next or finish
  pathQuestionIndex++;
  const updated = loadPathProgress();
  updated[path.name] = pathQuestionIndex;
  savePathProgress(updated);
  if (pathQuestionIndex < path.questions.length) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'button';
    nextBtn.textContent = 'Next Question';
    nextBtn.addEventListener('click', showPathQuestion);
    card.appendChild(nextBtn);
  } else {
    const finishBtn = document.createElement('button');
    finishBtn.className = 'button';
    finishBtn.textContent = 'Finish Path';
    finishBtn.addEventListener('click', showPathQuestion);
    card.appendChild(finishBtn);
  }
  app.appendChild(card);
}

// Entry point: show the list of available categories
function showCategories() {
  // Reset state for category mode
  currentMode = 'category';
  currentCategoryIndex = null;
  currentQuestionIndex = 0;
  score = 0;
  app.innerHTML = '';
  // Outer card container for home page
  const container = document.createElement('div');
  container.className = 'card';
  // Header with title and theme toggle
  const header = document.createElement('div');
  header.className = 'header';
  const title = document.createElement('h1');
  title.textContent = 'BrainForge Trivia';
  header.appendChild(title);
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.id = 'themeToggleBtn';
  themeToggle.textContent = loadTheme() ? 'Light Mode' : 'Dark Mode';
  themeToggle.addEventListener('click', toggleTheme);
  header.appendChild(themeToggle);
  container.appendChild(header);
  // XP and streak display
  const xp = loadXP();
  const streak = loadStreak();
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const xpContainer = document.createElement('div');
  xpContainer.className = 'xp-container';
  const xpText = document.createElement('p');
  xpText.style.fontSize = '14px';
  xpText.style.fontWeight = '600';
  xpText.textContent = `Level ${level} • XP: ${xp}`;
  xpContainer.appendChild(xpText);
  const xpBar = document.createElement('div');
  xpBar.className = 'xp-bar';
  const xpFill = document.createElement('div');
  xpFill.className = 'xp-bar-fill';
  xpFill.style.width = `${Math.min(100, xpInLevel) }%`;
  xpBar.appendChild(xpFill);
  xpContainer.appendChild(xpBar);
  const streakEl = document.createElement('p');
  streakEl.className = 'streak';
  streakEl.textContent = `🔥 Streak: ${streak}`;
  xpContainer.appendChild(streakEl);
  container.appendChild(xpContainer);
  // Subtitle
  const subheading = document.createElement('p');
  subheading.textContent = 'Choose an activity:';
  container.appendChild(subheading);
  // Buttons for various modes
  const statsBtn = document.createElement('button');
  statsBtn.className = 'button secondary';
  statsBtn.textContent = 'View Stats';
  statsBtn.addEventListener('click', showStats);
  container.appendChild(statsBtn);
  const dailyBtn = document.createElement('button');
  dailyBtn.className = 'button';
  dailyBtn.textContent = 'Daily Challenge';
  dailyBtn.addEventListener('click', startDailyChallenge);
  container.appendChild(dailyBtn);
  // Bookmarks button
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'button secondary';
  bookmarkBtn.textContent = 'Bookmarks';
  bookmarkBtn.addEventListener('click', showBookmarks);
  container.appendChild(bookmarkBtn);
  // Case study button
  const caseBtn = document.createElement('button');
  caseBtn.className = 'button';
  caseBtn.textContent = 'Real Estate Case Study';
  caseBtn.addEventListener('click', startCaseStudy);
  container.appendChild(caseBtn);
  // Learning paths button
  const pathsBtn = document.createElement('button');
  pathsBtn.className = 'button';
  pathsBtn.textContent = 'Learning Paths';
  pathsBtn.addEventListener('click', showPaths);
  container.appendChild(pathsBtn);

  // Button to start a session with random questions fetched from Open Trivia DB
  const openTriviaBtn = document.createElement('button');
  openTriviaBtn.className = 'button';
  openTriviaBtn.textContent = 'Open Trivia';
  openTriviaBtn.addEventListener('click', startOpenTrivia);
  container.appendChild(openTriviaBtn);
  // Search input for filtering categories
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.type = 'text';
  searchInput.placeholder = 'Search categories...';
  container.appendChild(searchInput);
  // Container for category buttons
  const catContainer = document.createElement('div');
  categories.forEach((cat, index) => {
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = cat.name;
    button.dataset.name = cat.name.toLowerCase();
    button.addEventListener('click', () => startQuiz(index));
    catContainer.appendChild(button);
  });
  container.appendChild(catContainer);
  // Filter categories on search
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    Array.from(catContainer.children).forEach(btn => {
      const match = btn.dataset.name.includes(term);
      btn.style.display = match ? 'block' : 'none';
    });
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
  } else if (currentMode === 'daily' || currentMode === 'bookmarks-quiz') {
    const ref = dailyQuestions[dailyIndex];
    const category = categories[ref.categoryIndex];
    qInfo = category.questions[ref.questionIndex];
    displayCategory = (currentMode === 'daily') ? 'Daily Challenge' : 'Bookmarks Practice';
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
  // Update score, XP and progress
  if (correct) {
    score++;
    addXP(10);
  } else {
    addXP(2);
  }
  updateProgress(qInfo.id, correct);
  updateStreak();
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

  // Bookmark toggle button for saving this question
  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'button secondary';
  const initialLabel = isBookmarked(qInfo.id) ? 'Remove Bookmark' : 'Save for Review';
  bookmarkBtn.textContent = initialLabel;
  bookmarkBtn.addEventListener('click', () => {
    const added = toggleBookmark(qInfo.id);
    bookmarkBtn.textContent = added ? 'Remove Bookmark' : 'Save for Review';
  });
  card.appendChild(bookmarkBtn);
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

// Initialize the view when the DOM has loaded. Apply the saved theme and
// then render the home screen.
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(loadTheme());
  showCategories();
});