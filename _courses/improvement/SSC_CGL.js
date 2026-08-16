const subjects = {
  English: [
    ["Parts of Speech", "green"],
    ["Nouns", "green"],
    ["Articles", "green"],
    ["Adjectives", "green"],
    ["Pronouns", "yellow"],
    ["Verbs", "yellow"],
    ["Tenses", "yellow"],
    ["Direct–Indirect", "yellow"],
    ["Vocabulary", "yellow"],
    ["Basics of English", "red"],
    ["Adverbs", "red"],
    ["Prepositions", "red"],
    ["Conjunctions", "red"],
    ["Subject-Verb Agreement", "red"],
    ["Active-Passive Voice", "red"],
    ["Conditionals", "red"],
    ["Cloze Test", "green"],
    ["Reading Comprehension", "red"],
    ["Sentence Rearrangement", "red"],
    ["Grammar Practice", "white"],
    ["PYQs / Mocks", "white"],
    ["Revision", "white"]
  ],

  Maths: [
    ["Percentage", "green"],
    ["Profit & Loss", "green"],
    ["Time & Work", "green"],
    ["Pipes & Cisterns", "green"],
    ["Discount", "yellow"],
    ["Compound Interest", "yellow"],
    ["Trigonometry", "yellow"],
    ["Mensuration 2D", "yellow"],
    ["Mensuration 3D", "yellow"],
    ["Coordinate Geometry", "yellow"],
    ["Ratio & Proportion", "red"],
    ["Average", "red"],
    ["Simple Interest", "red"],
    ["SI Installment", "red"],
    ["CI Installment", "red"],
    ["Mixture & Alligation", "red"],
    ["Partnership", "red"],
    ["Time-Speed-Distance", "red"],
    ["Boats & Streams", "red"],
    ["Race", "red"],
    ["Algebra", "red"],
    ["LCM & HCF", "red"],
    ["Number System", "red"],
    ["Height & Distance", "red"],
    ["Polygon", "red"],
    ["Geometry", "red"],
    ["Probability", "red"],
    ["Statistics", "red"],
    ["Data Interpretation", "red"]
  ],

  GA: [
    ["Ancient History", "green"],
    ["Medieval History", "green"],
    ["Geography", "yellow"],
    ["Modern History", "yellow"],
    ["Biology", "yellow"],
    ["Polity", "red"],
    ["Economics", "red"],
    ["Environment", "red"],
    ["Physics", "red"],
    ["Chemistry", "red"],
    ["Current Affairs", "red"],
    ["Static GK", "red"]
  ],

  Reasoning: [
    ["Coding-Decoding", "green"],
    ["Order & Ranking", "green"],
    ["Figure Series", "green"],
    ["Seating Arrangement", "green"],
    ["Counting Figures", "yellow"],
    ["Blood Relations", "yellow"],
    ["Overall Reasoning One-Shot", "yellow"],
    ["Calendar", "red"],
    ["Cubes / Cube Unfolding", "red"],
    ["Venn Diagrams", "red"],
    ["Dice", "red"],
    ["Clock", "red"],
    ["Permutation & Combination", "red"],
    ["Series Practice", "white"],
    ["Counting Practice", "white"],
    ["Blood Relations Practice", "white"],
    ["Seating Arrangement Practice", "white"],
    ["Pinnacle Practice", "white"]
  ]
};

const statusLabels = {
  green: "🟢",
  yellow: "🟡",
  red: "🔴",
  white: "⚪"
};

const allTopics = Object.values(subjects).flat();

function topicHTML(topic, status) {
  return `<span class="topic ${status}">${topic} ${statusLabels[status]}</span>`;
}


// =========================
// CREATE SYLLABUS TABLE
// =========================

const maxRows = Math.max(
  ...Object.values(subjects).map(list => list.length)
);

const body = document.getElementById("syllabusBody");

for (let i = 0; i < maxRows; i++) {

  const row = document.createElement("tr");

  for (const subject of Object.keys(subjects)) {

    const cell = document.createElement("td");

    if (subjects[subject][i]) {

      const [topic, status] = subjects[subject][i];

      cell.innerHTML = topicHTML(topic, status);
    }

    row.appendChild(cell);
  }

  body.appendChild(row);
}


// =========================
// OVERALL COUNTS
// =========================

const counts = {

  green: allTopics.filter(
    topic => topic[1] === "green"
  ).length,

  yellow: allTopics.filter(
    topic => topic[1] === "yellow"
  ).length,

  red: allTopics.filter(
    topic => topic[1] === "red"
  ).length,

  white: allTopics.filter(
    topic => topic[1] === "white"
  ).length
};


document.getElementById("completedCount").textContent =
  counts.green;

document.getElementById("partialCount").textContent =
  counts.yellow;

document.getElementById("notStartedCount").textContent =
  counts.red;

document.getElementById("practiceCount").textContent =
  counts.white;


// =========================
// OVERALL PROGRESS
// =========================

// Green = 100%
// Yellow = 50%
// Red = 0%
//
// White practice/revision topics are excluded
// from syllabus completion percentage.

const weightedCompleted =
  counts.green +
  counts.yellow * 0.5;

const progress = Math.round(
  (
    weightedCompleted /
    (
      counts.green +
      counts.yellow +
      counts.red
    )
  ) * 100
);


document.getElementById("progressPercent").textContent =
  `${progress}%`;

document.getElementById("progressFill").style.width =
  `${progress}%`;


// =========================
// SUBJECT SUMMARY
// =========================

const summary =
  document.getElementById("subjectSummary");


for (const [subject, topics] of Object.entries(subjects)) {

  const green = topics.filter(
    topic => topic[1] === "green"
  ).length;

  const yellow = topics.filter(
    topic => topic[1] === "yellow"
  ).length;

  const red = topics.filter(
    topic => topic[1] === "red"
  ).length;

  const white = topics.filter(
    topic => topic[1] === "white"
  ).length;


  const syllabusTopics =
    green + yellow + red;


  const subjectProgress = Math.round(
    (
      (green + yellow * 0.5) /
      syllabusTopics
    ) * 100
  );


  const box =
    document.createElement("div");

  box.className =
    "subject-box";


  box.innerHTML = `

    <h3>${subject}</h3>

    <div class="subject-progress">

      <div
        class="subject-progress-fill"
        style="width:${subjectProgress}%">
      </div>

    </div>

    <strong>${subjectProgress}%</strong>

    <div class="subject-details">

      🟢 ${green} completed ·

      🟡 ${yellow} partial ·

      🔴 ${red} remaining

      ${
        white
          ? ` · ⚪ ${white} practice`
          : ""
      }

    </div>

  `;


  summary.appendChild(box);
}