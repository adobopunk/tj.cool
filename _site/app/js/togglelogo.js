document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");
  const icon = document.getElementById("icon");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const backIcon = document.getElementById("back-icon");

  function updateImages() {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";

    // Update logo
    logo.src = isDarkMode
      ? "/assets/img/logo_darkmode/tifajade_logo.png"
      : "/assets/img/logo_lightmode/TifaJade-_Light_Mode-09.png";

    // Update main icon
    icon.src = isDarkMode
      ? "/assets/img/logo_darkmode/tifajade_icon.png"
      : "/assets/img/logo_lightmode/TifaJade-_Light_Mode-10.png";

    // Update hamburger icon
    hamburgerIcon.src = isDarkMode
      ? "/assets/img/logo_darkmode/tifajade_icon.png"
      : "/assets/img/logo_lightmode/TifaJade-_Light_Mode-10.png";

    // Update back icon
    backIcon.src = isDarkMode
      ? "/assets/img/logo_darkmode/tifajade_icon.png"
      : "/assets/img/logo_lightmode/TifaJade-_Light_Mode-10.png";
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
