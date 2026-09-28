document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const hamburgerMenuOverlay = document.getElementById(
    "hamburger-menu-overlay"
  );
  const closeHamburgerMenu = document.getElementById("close-hamburger-menu");

  // Open hamburger menu overlay
  menuToggle.addEventListener("click", function () {
    hamburgerMenuOverlay.style.display = "flex"; // Ensure it's displayed before fade-in
    setTimeout(() => {
      hamburgerMenuOverlay.classList.add("active");
    }, 10); // Small delay for transition to take effect
  });

  // Close hamburger menu overlay
  closeHamburgerMenu.addEventListener("click", function () {
    hamburgerMenuOverlay.classList.remove("active");
    setTimeout(() => {
      hamburgerMenuOverlay.style.display = "none"; // Hide after fade-out
    }, 500); // Match this delay to your CSS transition duration
  });

  // Optional: Close the menu when clicking outside of it
  hamburgerMenuOverlay.addEventListener("click", function (e) {
    if (e.target === hamburgerMenuOverlay) {
      hamburgerMenuOverlay.classList.remove("active");
      setTimeout(() => {
        hamburgerMenuOverlay.style.display = "none";
      }, 500);
    }
  });

  // Dropdown toggle for "Projects" menu (Animation + Video)
  document
    .querySelectorAll(".topnav__item.dropdown")
    .forEach(function (dropdown) {
      dropdown.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    });
});

window.addEventListener("load", () => {
  const stickyNavbar = document.querySelector(".sticky-navbar");
  const footer = document.querySelector(".footer");

  const footerHeight = footer.offsetHeight;
  stickyNavbar.style.marginBottom = `${footerHeight}px`;
});
