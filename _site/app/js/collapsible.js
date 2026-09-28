var coll = document.getElementsByClassName("collapsible");
var i;

// Initialize collapsible states from localStorage
for (i = 0; i < coll.length; i++) {
  const collapsibleId = `collapsible-${i}`; // Unique ID for each collapsible
  const isOpen = localStorage.getItem(collapsibleId) === "true"; // Check if the section was open

  if (isOpen) {
    // If the section was previously open, add the active class
    coll[i].classList.add("active");

    // Temporarily disable transitions
    const reveal = coll[i].nextElementSibling;
    reveal.style.transition = "none"; // Disable transitions
    reveal.style.maxHeight = reveal.scrollHeight + "px"; // Set maxHeight for the expanded content
    reveal.style.opacity = "1"; // Fully visible

    // Re-enable transitions after the initial setup
    setTimeout(() => {
      reveal.style.transition = ""; // Re-enable transitions
    }, 0);
  } else {
    // If the section was closed, set maxHeight to 0
    coll[i].nextElementSibling.style.maxHeight = "0";
    coll[i].nextElementSibling.style.opacity = "0"; // Invisible
  }

  // Add click event listener to each collapsible element
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var reveal = this.nextElementSibling;

    if (this.classList.contains("active")) {
      // Expand the section
      reveal.style.maxHeight = reveal.scrollHeight + "px"; // Expand to full height
      reveal.style.opacity = "1"; // Fully visible
      localStorage.setItem(collapsibleId, "true"); // Save state as open
    } else {
      // Collapse the section
      reveal.style.maxHeight = "0"; // Collapse
      reveal.style.opacity = "0"; // Invisible
      localStorage.setItem(collapsibleId, "false"); // Save state as closed
    }
  });
}
