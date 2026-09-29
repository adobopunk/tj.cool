// Light/dark switch. Dark is the default; the visitor's saved choice wins.
(function () {
  const root = document.documentElement;
  const switches = document.querySelectorAll(".theme-toggle");

  function saved() {
    try {
      const t = localStorage.getItem("theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  const themeColor = document.getElementById("theme-color");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0d1512" : "#f8faf8");
    switches.forEach((el) => el.setAttribute("aria-checked", String(theme === "dark")));
  }

  apply(saved() || "dark");

  switches.forEach((el) => {
    el.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      apply(next);
    });
  });

})();
