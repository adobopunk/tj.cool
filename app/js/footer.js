document.addEventListener("DOMContentLoaded", function () {
  const currentYearElements = document.querySelectorAll(".currentYear");
  const currentYear = new Date().getFullYear();

  currentYearElements.forEach((element) => {
    element.textContent = currentYear;
  });
});
