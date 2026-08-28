// ========= EDIT ONLY THIS SECTION =========

const profile = {
username: "Harshitha",
subtitle: "Start counting from May 2026...",
totalGoal: 15,
};

const books = [
{
    title: "BlairWarren",
    pagesRead: 13,
    totalPages: 13,
    category: ["Psychology"],
    startedOn: "01-05-2026",
    completedOn:"02-05-2026"
},
{
    title: "XinFeng Zhou",
    pagesRead: 2,
    totalPages: 250,
    category: ["Math", "QuantFinance", "InterviewPrep"],
    startedOn: "02-05-2026",
    completedOn:""
},
{
    title: "Alex Xu",
    pagesRead: 23,
    totalPages: 269,
    category: ["SystemDesign", "InterviewPrep"],
    startedOn: "12-05-2026",
    completedOn:""
},
{
    title: "Ancient India RS-Sharma",
    pagesRead: 4,
    totalPages: 194,
    category: ["Social"],
    startedOn: "25-05-2026",
    completedOn:""
},
{
    title: "MySQL W3Schools",
    pagesRead: 24,
    totalPages: 200,
    category: ["DataBases"],
    startedOn: "26-05-2026",
    completedOn:""
},
{
    title: "Online Mentors Idioms (sscstudy.com)",
    pagesRead: 4,
    totalPages: 25,
    category: ["English"],
    startedOn: "27-05-2026",
    completedOn:""
},
{
    title: "Blackbook",
    pagesRead: 1,
    totalPages: 720,
    category: ["English"],
    startedOn: "28-05-2026",
    completedOn:""
},
{
    title: "Fatman parmer",
    pagesRead: 3,
    totalPages: 430,
    category: ["Social"],
    startedOn: "28-05-2026",
    completedOn:""
}
];

const futureBooks=[
{
    title: "Deep work by Cal Newport",
    category: ["Self-Help"]
},
{
    title: "Range: generalists triumph ina specialized world by David Epstein",
    category: ["Self-Help","Career Development"]
},
{
    title: "I will teach you to be rich by Ramit Sethi",
    category: ["Finance"]
}
]
const dailyReading = {
    "2026-05-01": 7,
    "2026-05-02": 6,
    "2026-05-12": 2,
    "2026-05-25": 2,
    "2026-05-26": 5,
    "2026-05-27": 20,
    "2026-05-28": 24
    
    
    };

// =========================================

// ===== Automatic Streak Calculation =====

const readingDates = Object.keys(dailyReading)
.filter(date => dailyReading[date] > 0)
.sort();

let maxStreak = 0;
let currentRun = 0;

for (let i = 0; i < readingDates.length; i++) {

    if (i === 0) {
        currentRun = 1;
    } else {

        const prev = new Date(readingDates[i-1]);
        const curr = new Date(readingDates[i]);

        const diffDays =
            (curr - prev) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
            currentRun++;
        } else {
            currentRun = 1;
        }
    }

    maxStreak = Math.max(maxStreak, currentRun);
}

// Current streak (counting backwards from today)
let currentStreak = 0;

const streakToday = new Date();
streakToday.setHours(0,0,0,0);

let checkDate = new Date(streakToday);

while (true) {
    const key = checkDate.toLocaleDateString("en-CA");

    if (dailyReading[key] > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
    } else {
        break;
    }
}
profile.currentStreak = currentStreak;
profile.maxStreak = maxStreak;

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
    <td>${book.startedOn}</td>
    <td>${book.completedOn || ""}</td>
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
startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
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

const key = date.toLocaleDateString("en-CA");
const pages = dailyReading[key] || 0;

let level = "";

if (pages >= 10) level = "l4";
else if (pages >= 6) level = "l3";
else if (pages >= 3) level = "l2";
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



// ===== Topic Pie / Donut Chart =====

const topicPages = {};

books.forEach(book => {

    const pagesPerTopic =
        book.pagesRead ;

    book.category.forEach(cat => {

        topicPages[cat] =
            (topicPages[cat] || 0) + pagesPerTopic;
    });
});

const topicCtx =
document.getElementById("topicChart");

const colors = Object.keys(topicPages).map((_, i) => {

    const hue = (i * 35) % 360;;

    return `hsl(${hue},50%,55%)`;
});

new Chart(topicCtx, {
    type: "doughnut",

    data: {
        labels: Object.keys(topicPages),

        datasets: [{
            data:Object.values(topicPages),
            backgroundColor: colors,
            borderWidth: 2,
            borderColor:"#2f2f2f"
        }]
    },

    options: {
        cutout: "68%", // donut style

        plugins: {

            legend: {
                position: "right",

                labels: {
                    color: "#c9d1d9"
                }
            },

            tooltip: {
                callbacks: {
                    label(context) {

                        const total =
                        context.dataset.data
                        .reduce((a,b)=>a+b,0);

                        const value =
                        context.raw.toFixed(1);

                        const percent =
                        ((context.raw/total)*100)
                        .toFixed(1);

                        return `${context.label}: ${value} pages (${percent}%)`;
                    }
                }
            }
        }
    }
});

//futureBooks
const futureReads = document.getElementById("futureReads");
futureBooks.forEach(book => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="book-title">${book.title}</td>
        <td>${book.category.join(", ")}</td>
    `;

    futureReads.appendChild(row);
});