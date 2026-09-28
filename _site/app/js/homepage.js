document.addEventListener("DOMContentLoaded", function () {
  // Handle showreel button
  const showreelButton = document.getElementById("showreelButton");

  // Check if the showreelButton exists to avoid errors
  if (showreelButton) {
    // Add a delay before showing the button
    setTimeout(() => {
      showreelButton.classList.add("show"); // Add the 'show' class after 800ms
    }, 500);
  } else {
    console.error("Showreel button not found!"); // Debugging message if button is not found
  }
});
