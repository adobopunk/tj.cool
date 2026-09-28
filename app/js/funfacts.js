const funFacts = [
  "I'm a big fan of RPG games, with the Mass Effect trilogy being one of my favorites.",
  "I used to be a photographer, and recently got back into it with my first film camera, developing my own fiilm.",
  "I have a cat named Rogue who I named after the RPG class, because she's very sneaky and rebellious.",
  "I have a homelab with a 100TB+ server, built by myself to back up my data and send files to clients.",
  "I loved action movies as a kid, and learned After Effects in 5th grade to make CGI explosions.",
];

let currentFactIndex = 0;
const factText = document.querySelector(".fun-fact-text");
const prevButton = document.querySelector(".fun-fact-prev");
const nextButton = document.querySelector(".fun-fact-next");

function updateFunFact() {
  // Fade out first
  factText.classList.remove("fade-in");
  factText.classList.add("fade-out");

  setTimeout(() => {
    // Update the text when faded out
    factText.textContent = "Fun Fact: " + funFacts[currentFactIndex];

    // Fade back in
    factText.classList.remove("fade-out");
    factText.classList.add("fade-in");
  }, 500); // Match your 0.5s transition
}

function showNextFact() {
  currentFactIndex = (currentFactIndex + 1) % funFacts.length;
  updateFunFact();
}

function showPrevFact() {
  currentFactIndex = (currentFactIndex - 1 + funFacts.length) % funFacts.length;
  updateFunFact();
}

// Event listeners for buttons
nextButton.addEventListener("click", showNextFact);
prevButton.addEventListener("click", showPrevFact);

// Auto-cycle every 8 seconds
let funFactInterval = setInterval(showNextFact, 8000);

// Pause on button hover
[nextButton, prevButton].forEach((button) => {
  button.addEventListener("mouseenter", () => clearInterval(funFactInterval));
  button.addEventListener("mouseleave", () => {
    funFactInterval = setInterval(showNextFact, 8000);
  });
});

// Initialize with the first fact
updateFunFact();
