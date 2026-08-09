// Update year in footer
document.getElementById("yr").textContent = new Date().getFullYear();

// Dark mode toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  // Keep the browser chrome color in step with the theme
  themeColor.content = theme === "dark" ? "#1a1712" : "#faf8f5";
  // Button icon/label indicate the *target* state, not the current one
  const targetLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  themeToggle.setAttribute("aria-label", targetLabel);
  themeToggle.setAttribute("title", targetLabel);
}

function toggleTheme() {
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  localStorage.setItem("theme", next);
}

themeToggle.addEventListener("click", toggleTheme);

// The FOUC guard in <head> already set data-theme pre-paint.
// Reflect system preference changes when the user hasn't chosen one.
const saved = localStorage.getItem("theme");
if (saved) {
  setTheme(saved);
} else {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  setTheme(media.matches ? "dark" : "light");
  media.addEventListener("change", function (e) {
    setTheme(e.matches ? "dark" : "light");
  });
}