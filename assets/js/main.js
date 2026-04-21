document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // THEME TOGGLE
  // =====================
  const toggleBtn = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      }
    });
  }

  // =====================
  // SIDEBAR ACCORDION
  // =====================
  const headers = document.querySelectorAll(".course-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-target");
      const content = document.getElementById(targetId);

      if (!content) return;

      const isOpen = content.classList.contains("open");

      // Close all
      document.querySelectorAll(".course-content").forEach(el => {
        el.style.height = "0px";
        el.classList.remove("open");
      });

      document.querySelectorAll(".course-header").forEach(h => {
        h.classList.remove("active");
      });

      // Open clicked
      if (!isOpen) {
        content.classList.add("open");
        header.classList.add("active");
        content.style.height = content.scrollHeight + "px";
      }
    });
  });

  // =====================
  // SIDEBAR TOGGLE (☰)
  // =====================
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("closed");
    });
  }

  // =====================
  // ACTIVE LINK HIGHLIGHT
  // =====================
  const links = document.querySelectorAll(".sidebar a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.style.color = rgba(158, 228, 250, 0.25);
      link.style.fontWeight = "600";
    }
  });

  // =====================
  // AUTO EXPAND ACTIVE SECTION
  // =====================
  headers.forEach(header => {
    const targetId = header.getAttribute("data-target");
    const content = document.getElementById(targetId);

    if (!content) return;

    const hasActive = content.querySelector(
      `a[href="${window.location.pathname}"]`
    );

    if (hasActive) {
      content.style.height = content.scrollHeight + "px";
      content.classList.add("open");
      header.classList.add("active");
    }
  });

});