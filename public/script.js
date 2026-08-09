// Update year in footer
document.getElementById("yr").textContent = new Date().getFullYear();

// Dark mode toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

// Load saved theme or respect system preference
function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
  } else {
    // Use system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
}

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  // Button icon/label indicate the *target* state, not the current one
  const targetLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  themeToggle.setAttribute("aria-label", targetLabel);
  themeToggle.setAttribute("title", targetLabel);
}

function toggleTheme() {
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
}

themeToggle.addEventListener("click", toggleTheme);
loadTheme();