// Array of strings to be sorted
const strings = [
  "Xbox",
  "Mountain Dew",
  "Fortnite",
  "Microsoft",
  "Minecraft",
  "Sea of Thieves",
  "Porsche",
  "Rocket League",
  "Riot Games",
  "Valorant",
  "Apex Legends",
  "Respawn Entertainment",
  "Intel",
  "Amika",
  "Bloodhunt",
  "Halo",
  "Midnight Society",
  "Activision",
  "TimTheTatman",
  "Tfue",
];

// Sort the array alphabetically
strings.sort();

// Convert the sorted array to a single string with comma-separated values
const sortedText = strings.join(", ") + ", and more.";

// Populate the paragraph with the sorted text
document.getElementById("sorted-text").textContent = sortedText;
