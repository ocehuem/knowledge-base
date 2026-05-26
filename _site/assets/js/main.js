document.addEventListener("DOMContentLoaded", () => {

  const sidebar        = document.querySelector(".sidebar");
  const sidebarToggle  = document.getElementById("sidebar-toggle");
  const themeToggle    = document.getElementById("theme-toggle");

  // =====================
  // HELPERS
  // =====================
  const isMobile = () => window.innerWidth <= 768;

  // Inject backdrop element once
  let backdrop = document.getElementById("sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "sidebar-backdrop";
    document.body.appendChild(backdrop);
  }

  // =====================
  // SIDEBAR OPEN / CLOSE
  // =====================
  function openSidebar() {
    if (isMobile()) {
      sidebar.classList.add("open");
      sidebar.classList.remove("closed");
      backdrop.classList.add("visible");
      sidebarToggle.textContent = "✕";
    } else {
      sidebar.classList.remove("closed");
      sidebarToggle.textContent = "☰";
    }
  }

  function closeSidebar() {
    if (isMobile()) {
      sidebar.classList.remove("open");
      backdrop.classList.remove("visible");
      sidebarToggle.textContent = "☰";
    } else {
      sidebar.classList.add("closed");
      sidebarToggle.textContent = "☰";
    }
  }

  function isSidebarOpen() {
    if (isMobile()) return sidebar.classList.contains("open");
    return !sidebar.classList.contains("closed");
  }

  // Backdrop tap → close
  backdrop.addEventListener("click", closeSidebar);

  // Toggle button
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      isSidebarOpen() ? closeSidebar() : openSidebar();
    });
  }

  // =====================
  // INITIAL SIDEBAR STATE
  // =====================
  if (isMobile()) {
    // Start hidden on mobile
    closeSidebar();
  } else {
    // Desktop: restore from localStorage (default open)
    const savedSidebar = localStorage.getItem("sidebarState");
    if (savedSidebar === "closed") {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  // Save desktop state on toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      if (!isMobile()) {
        localStorage.setItem(
          "sidebarState",
          sidebar.classList.contains("closed") ? "closed" : "open"
        );
      }
    });
  }

  // =====================
  // HANDLE RESIZE
  // Switching between mobile ↔ desktop mid-session
  // =====================
  window.addEventListener("resize", () => {
    if (isMobile()) {
      // Ensure overlay mode: remove desktop-closed class if open
      if (sidebar.classList.contains("open")) {
        backdrop.classList.add("visible");
      } else {
        sidebar.classList.remove("closed"); // desktop closed → mobile default
        backdrop.classList.remove("visible");
      }
    } else {
      // Desktop: remove mobile open class, hide backdrop
      sidebar.classList.remove("open");
      backdrop.classList.remove("visible");
      sidebarToggle.textContent = "☰";

      const savedSidebar = localStorage.getItem("sidebarState");
      if (savedSidebar === "closed") {
        sidebar.classList.add("closed");
      } else {
        sidebar.classList.remove("closed");
      }
    }
  });

  // =====================
  // CLOSE SIDEBAR ON MOBILE LINK CLICK
  // =====================
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      if (isMobile()) closeSidebar();
    });
  });

  // =====================
  // THEME TOGGLE
  // =====================
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // =====================
  // SIDEBAR ACCORDION
  // =====================
  const headers = document.querySelectorAll(".course-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-target");
      const content  = document.getElementById(targetId);
      if (!content) return;

      const isOpen = content.classList.contains("open");

      // Collapse all
      document.querySelectorAll(".course-content").forEach(el => {
        el.style.height = "0px";
        el.classList.remove("open");
      });
      document.querySelectorAll(".course-header").forEach(h => {
        h.classList.remove("active");
      });

      // Expand clicked (if it was closed)
      if (!isOpen) {
        content.classList.add("open");
        header.classList.add("active");
        content.style.height = content.scrollHeight + "px";
      }
    });
  });

  // =====================
  // AUTO EXPAND active course
  // =====================
  headers.forEach(header => {
    const targetId = header.getAttribute("data-target");
    const content  = document.getElementById(targetId);
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

  // =====================
  // ACTIVE LINK HIGHLIGHT
  // =====================
  document.querySelectorAll(".sidebar a").forEach(link => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.style.color      = "rgba(158, 228, 250, 0.85)";
      link.style.fontWeight = "600";
    }
  });

  // =====================
  // TAB SYSTEM
  // =====================
  window.openTab = function (tabId, el) {
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  
    const target = document.getElementById(tabId);
    if (!target) return;
  
    target.classList.add("active");
    el.classList.add("active");
  
    localStorage.setItem("activeTab", tabId);
  };
  
  // restore tab safely
  const savedTab = localStorage.getItem("activeTab");
  
  if (savedTab) {
    const btn = document.querySelector(`.tab-btn[data-tab="${savedTab}"]`);
    const target = document.getElementById(savedTab);
  
    if (btn && target) {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  
      btn.classList.add("active");
      target.classList.add("active");
    }
  }
});
