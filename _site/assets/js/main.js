function toggle(el) {
  const content = el.nextElementSibling;

  content.style.display =
    content.style.display === "block" ? "none" : "block";
}

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
