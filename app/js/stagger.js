document.addEventListener("DOMContentLoaded", function () {
  const staggeredElements = document.querySelectorAll(".stagger > div"); // Select all line elements

  staggeredElements.forEach((element, index) => {
    // Add staggered animation delay
    element.style.animationDelay = `${index * 0.2}s`; // Adjust delay as needed
    element.classList.add("line"); // Add class for line animation
  });
});
