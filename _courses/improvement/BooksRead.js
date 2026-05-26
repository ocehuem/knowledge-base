// ========= EDIT ONLY THIS SECTION =========

const profile = {
username: "Harshitha",
subtitle: "Start counting from May 2026...",
totalGoal: 15,
currentStreak: 1,
maxStreak: 3
};

const books = [
{
    title: "BlairWarren",
    pagesRead: 13,
    totalPages: 13,
    category: ["Psychology"]
},
{
    title: "XinFeng Zhou",
    pagesRead: 2,
    totalPages: 250,
    category: ["Math", "QuantFinance", "InterviewPrep"]
},
{
    title: "Alex Xu",
    pagesRead: 4,
    totalPages: 269,
    category: ["SystemDesign", "InterviewPrep"]
},
{
    title: "Ancient India RS-Sharma",
    pagesRead: 2,
    totalPages: 194,
    category: ["Social"]
}
];

const dailyReading = {
    "2026-05-01": 7,
    "2026-05-02": 6,
    "2026-05-12": 2,
    "2026-05-25": 2,
    "2026-05-26": 4
    
    };

// =========================================


document.getElementById("username").textContent = profile.username;
document.getElementById("subtitle").textContent = profile.subtitle;
document.getElementById("currentStreak").textContent = profile.currentStreak;
document.getElementById("maxStreak").textContent = profile.maxStreak;

// Stats calculations
const totalBooks = books.length;
const totalPages = books.reduce((sum, book) => sum + book.pagesRead,0);

document.getElementById("booksRead").textContent = totalBooks;
document.getElementById("pagesRead").textContent = totalPages;

// Progress calculations
const completedBooks = books.filter(
book => book.pagesRead >= book.totalPages
).length;

const partiallyReadBooks = books.filter(
book => book.pagesRead < book.totalPages
).length;

const progressText = document.getElementById("progressText");
progressText.textContent =
`${completedBooks} / ${profile.totalGoal} books completed`;

document.getElementById("progressCard").title =
`Completed: ${completedBooks} | In Progress: ${partiallyReadBooks}`;

const progressPercent =
(completedBooks / profile.totalGoal) * 100;

document.getElementById("progressFill").style.width =
progressPercent + "%";

// Categories with counts
const categoryCount = {};

books.forEach(book => {
book.category.forEach(cat => {
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
});
});

const categoriesDiv = document.getElementById("categories");

Object.entries(categoryCount).forEach(([cat, count]) => {
const span = document.createElement("span");
span.className = "tag";
span.textContent = `${cat} (${count})`;
categoriesDiv.appendChild(span);
});

const bookList = document.getElementById("bookList");

books.forEach(book => {
const percent = Math.floor(
    (book.pagesRead / book.totalPages) * 100
);

const status =
    percent === 100
    ? `<span class="status-pill completed">Completed</span>`
    : `<span class="status-pill reading">Reading</span>`;

const row = document.createElement("tr");

row.innerHTML = `
    <td class="book-title">${book.title}</td>
    <td>${status}</td>
    <td>${book.pagesRead}/${book.totalPages} (${percent}%)</td>
    <td>${book.category.join(", ")}</td>
`;

bookList.appendChild(row);
});
// Heatmap

// Daily reading data (EDIT THIS)



const heatmap = document.getElementById("heatmap");
const monthLabels = document.getElementById("monthLabels");

const today = new Date();
const startDate = new Date(today);
startDate.setDate(today.getDate() - 364);

// Month labels
let currentMonth = "";

for (let week = 0; week < 53; week++) {
const date = new Date(startDate);
date.setDate(startDate.getDate() + week * 7);

const month = date.toLocaleString("default", { month: "short" });

const label = document.createElement("div");
label.textContent = month !== currentMonth ? month : "";
currentMonth = month;

monthLabels.appendChild(label);
}

// Squares
for (let day = 0; day < 371; day++) {
const date = new Date(startDate);
date.setDate(startDate.getDate() + day);

const key = date.toISOString().split("T")[0];
const pages = dailyReading[key] || 0;

let level = "";

if (pages >= 20) level = "l4";
else if (pages >= 10) level = "l3";
else if (pages >= 5) level = "l2";
else if (pages > 0) level = "l1";
else level="l0";

const square = document.createElement("div");
square.className = `square ${level}`;
square.title = `${key}: ${pages} pages`;

heatmap.appendChild(square);
}

// Graph
const ctx = document.getElementById("ratingChart");

const labels = Object.keys(dailyReading);
const dailyPages = Object.values(dailyReading);

// cumulative growth like rating
let cumulative = [];
let sum = 0;

dailyPages.forEach(v => {
sum += v;
cumulative.push(sum);
});

new Chart(ctx, {
type: "line",
data: {
    labels,
    datasets: [{
    label: "Pages Growth",
    data: cumulative,
    borderColor: "#ffa116",
    backgroundColor: "rgba(255, 161, 22, 0.18)",
    fill: true,
    tension: 0.35,
    pointRadius: 4,
    pointHoverRadius: 6
    }]
},
options: {
    plugins: {
    legend: { display: false }
    },
    scales: {
    x: {
        ticks: { color: "#8b949e" },
        grid: { color: "#2d333b" }
    },
    y: {
        ticks: { color: "#8b949e" },
        grid: { color: "#2d333b" }
    }
    }
}
});

