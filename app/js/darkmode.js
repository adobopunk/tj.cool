// Light/dark switch. Follows the system preference until the visitor chooses.
(function () {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const switches = document.querySelectorAll(".theme-toggle");

  function saved() {
    try {
      const t = localStorage.getItem("theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    switches.forEach((el) => el.setAttribute("aria-checked", String(theme === "dark")));
  }

  apply(saved() || (media.matches ? "dark" : "light"));

  switches.forEach((el) => {
    el.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      apply(next);
    });
  });

  // Keep following the system when no explicit choice has been made
  media.addEventListener("change", (e) => {
    if (!saved()) apply(e.matches ? "dark" : "light");
  });
})();
