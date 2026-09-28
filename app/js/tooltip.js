document.addEventListener("DOMContentLoaded", function () {
  const emailLinks = document.querySelectorAll("[data-tooltip]");

  emailLinks.forEach((el) => {
    const originalTooltipText = el.getAttribute("data-tooltip");

    // Only attach the click event for elements with the `copy-email` class
    if (el.classList.contains("copy-email")) {
      el.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default behavior (link)

        // Specify the email to be copied
        const emailToCopy = "hi@tifajade.com"; // Change this to the desired email

        // Copy the email to the clipboard
        navigator.clipboard
          .writeText(emailToCopy)
          .then(() => {
            // Change the tooltip text to indicate success
            el.setAttribute("data-tooltip", "Email copied to clipboard!");

            // Reset the tooltip text after 2 seconds
            setTimeout(() => {
              el.setAttribute("data-tooltip", originalTooltipText);
            }, 2000);
          })
          .catch(() => {
            // If copying to clipboard fails, show a failure message
            el.setAttribute("data-tooltip", "Failed to copy email");
          });
      });
    }
  });
});
