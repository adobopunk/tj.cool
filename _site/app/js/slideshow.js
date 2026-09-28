const pages = [
  {
    copy: "I’m a Creative Director with a lot of ambition and a knack for visual storytelling. Typically behind the scenes and behind the camera, like any good director you'll catch me staring down the barrel of a lens while framing a shot. Here's how I got here.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop1.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop1_h264_preview.mp4",
    ],
  },
  {
    copy: "I grew up in Richland, Washington, making backyard movies with friends. I loved action films like The Matrix and Mission: Impossible. I taught myself After Effects in 5th grade, entered student art competitions, and earned a spot in independent study programs to sharpen my filmmaking skills even before high school.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop2.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop2_h264_preview.mp4",
    ],
  },
  {
    copy: "I studied film at Eastern Washington University, where four of my short films screened at the Spokane International Film Festival and they named me “Most Promising Filmmaker.” Most importantly, I learned how to tell meaningful stories, lead a great crew, and direct successful projects end-to-end. By the time I graduated, I had the skills to tell stories for a living.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop3.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop3_h264_preview.mp4",
    ],
  },
  {
    copy: "My journey led me to become Creative Services Director for my hometown NBC affiliate, where I pitched, directed, edited, and designed campaigns while rapidly developing my design skills. I built strong partnerships with local business owners and directed the station’s first Spanish newscast for Telemundo — a milestone in community outreach for the area.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop4.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop4_h264_preview.mp4",
    ],
  },
  {
    copy: "Eager to push beyond small-town markets, I pitched a docuseries about a rising high school football team to my boss, and convinced him to say yes. I filmed what became a championship season, edited down thousands of hours of footage, and delivered the entire project to air on TV as a solo director/producer, barely a year after graduating college.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop5.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop5_h264_preview.mp4",
    ],
  },
  {
    copy: "Next I joined an esports startup called Impact Gaming, relocating to Las Vegas. I shaped their brand identity and content strategy, and even produced another docuseries. I wasn't an expert in esports—nor had I been an expert in football. But I knew how to build trust, capture honest stories, and craft emotional narratives that connect with audiences.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop6.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop6_h264_preview.mp4",
    ],
  },
  {
    copy: "My portfolio caught the attention of UFC’s original content department, and I joined the team producing branded content for their massive social media following. I worked on long-form programming for Fight Pass and ESPN, and helped market record-breaking Pay-Per-View events. I thrived in one of the world’s fastest-paced, most intense production environments, sharpening my creative instincts and leadership abilities.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop7.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop7_h264_preview.mp4",
    ],
  },
  {
    copy: "After four years at UFC, I reconnected my love of storytelling with my interest in gaming when I was asked to lead BoomTV's video production team. Directing creative projects for a games marketing agency meant partnering with names like Fortnite, Halo, and Sea of Thieves, designing experiences that earned millions of impressions, and recognition from industry veterans.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop8.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop8_h264_preview.mp4",
    ],
  },
  {
    copy: "Across massive global brands, fast-growing startups, and scrappy creative teams, I’ve applied storytelling expertise and creative leadership to solve creative challenges. I animate, design websites, and direct videos. I'm here because I love the craft, bringing bold ideas to life, building workflows that dismantle creative roadblocks, and always pushing the boundaries of visual storytelling.",
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop9.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop9_h264_preview.mp4",
    ],
  },
  {
    copy: `Today, I’m a freelance Creative Director running my agency, <a data-tooltip="tinypond.studio" href="https://tinypond.studio" target="_blank" rel="noopener">Tiny Pond</a>, and still producing events for the games industry through our venture <a data-tooltip="playinqueue.com" href="https://playinqueue.com" target="_blank" rel="noopener">In Queue</a>. If you’re building bold, high-impact projects and need a creative leader who thrives under pressure and lives for ambitious, slightly crazy ideas — let’s connect. You might just be my Slide 11.`,
    src: [
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop10.webm",
      "https://tifajade.b-cdn.net/About%20Me/AboutLoop10_h264_preview.mp4",
    ],
  },
];

let maxPages = pages.length - 1;
let pageNumber = 0;

// Select tags
const nextTag = document.querySelector("svg.next");
const prevTag = document.querySelector("svg.previous");
const outputTag = document.querySelector("p.slideshow-copy");
const videoTag = document.querySelector("video.slideshow-video");
const bodyTag = document.querySelector("body");
const contactButton = document.querySelector(".slideshow-contact");
const counterTag = document.querySelector("p.slideshow-counter"); // ← grab the counter

// Increase and decrease page numbers
const next = function () {
  pageNumber = pageNumber + 1 > maxPages ? 0 : pageNumber + 1;
  updateSection("next");
};

const previous = function () {
  pageNumber = pageNumber - 1 < 0 ? maxPages : pageNumber - 1;
  updateSection("previous");
};

const random = function () {
  pageNumber = Math.floor(Math.random() * pages.length);
  updateSection("random"); // can decide default behavior here
};

// Update section content
const updateSection = function (direction) {
  let moveOutClass = "";
  let moveInClass = "";

  // Determine animation classes based on direction
  if (direction === "next") {
    moveOutClass = "move-out-left";
    moveInClass = "move-in-right";
  } else if (direction === "previous") {
    moveOutClass = "move-out-right";
    moveInClass = "move-in-left";
  } else {
    // fallback or random
    moveOutClass = "move-out-left";
    moveInClass = "move-in-right";
  }

  // Add animation classes
  videoTag.classList.add(moveOutClass);
  outputTag.classList.add("fade-out");

  setTimeout(() => {
    outputTag.innerHTML = pages[pageNumber].copy;
    videoTag.innerHTML = ""; // Clear existing <source> elements

    pages[pageNumber].src.forEach((sourcePath) => {
      const sourceTag = document.createElement("source");
      sourceTag.src = sourcePath;

      if (sourcePath.endsWith(".mp4")) {
        sourceTag.type = "video/mp4";
      } else if (sourcePath.endsWith(".webm")) {
        sourceTag.type = "video/webm";
      }

      videoTag.appendChild(sourceTag);
    });

    videoTag.load(); // Reload video with new sources

    // Remove old classes
    videoTag.classList.remove(moveOutClass);
    outputTag.classList.remove("fade-out");

    // Apply move-in and fade-in classes
    videoTag.classList.add(moveInClass);
    outputTag.classList.add("fade-in");

    counterTag.innerHTML = `${pageNumber + 1} / ${pages.length}`;

    // Show contact button if on final slide, hide otherwise
    if (pageNumber === maxPages) {
      contactButton.classList.add("visible");
    } else {
      contactButton.classList.remove("visible");
    }

    // Remove move-in and fade-in after animation
    setTimeout(() => {
      videoTag.classList.remove(moveInClass);
      outputTag.classList.remove("fade-in");
    }, 500); // matches CSS duration
  }, 500); // matches CSS duration
};

// Add event listeners
nextTag.addEventListener("click", next);
prevTag.addEventListener("click", previous);

// Add keypress functions
document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    previous();
  }
});
