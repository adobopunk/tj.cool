document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  const icon = document.getElementById("icon");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const backIcon = document.getElementById("back-icon");

  function updateImages() {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";

    // Update logo
    if (logo) logo.src = isDarkMode
      ? "/assets/img/logo_darkmode/logo-wordmark-dark.png"
      : "/assets/img/logo_lightmode/logo-wordmark-light.png";

    // Update main icon
    if (icon) icon.src = isDarkMode
      ? "/assets/img/logo_darkmode/logo-icon-dark.png"
      : "/assets/img/logo_lightmode/logo-icon-light.png";

    // Update hamburger icon
    if (hamburgerIcon) hamburgerIcon.src = isDarkMode
      ? "/assets/img/logo_darkmode/logo-icon-dark.png"
      : "/assets/img/logo_lightmode/logo-icon-light.png";

    // Update back icon
    if (backIcon) backIcon.src = isDarkMode
      ? "/assets/img/logo_darkmode/logo-icon-dark.png"
      : "/assets/img/logo_lightmode/logo-icon-light.png";
  }

  // Run once on page load
  updateImages();

  // Listen for theme changes
  const observer = new MutationObserver(updateImages);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});
