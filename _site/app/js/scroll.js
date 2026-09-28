document.addEventListener("DOMContentLoaded", function () {
  const scrollDownButton = document.querySelector(".scroll-down");
  const chevronContainer = document.querySelector(".chevron-container");

  // Add a timeout to add the visible class after 0.5 seconds
  setTimeout(() => {
    chevronContainer.classList.add("visible");
  }, 1200); // Delay of 500ms

  scrollDownButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const nextSection = document.getElementById("gallery");

    nextSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to next section
  });
});
