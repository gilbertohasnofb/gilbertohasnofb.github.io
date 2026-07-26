(function () {
  var STORAGE_KEY = "theme";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle");

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore (e.g. privacy mode) */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "☀" : "☾";
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  // Initial theme: explicit user choice > system preference
  var stored = getStoredTheme();
  var initial = stored || (systemPrefersDark() ? "dark" : "light");
  applyTheme(initial);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
    });
  }

  // If the user hasn't made an explicit choice, keep following the
  // system preference live (e.g. macOS auto dark mode at sunset).
  if (!stored && window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (!getStoredTheme()) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }
})();
