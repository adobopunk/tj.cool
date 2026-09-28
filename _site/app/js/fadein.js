// Utility functions
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// Debugging function
function debug(message) {
  // console.log(`[Debug] ${message}`);
}

// Mobile device check
function isMobileDevice() {
  return window.innerWidth <= 900; // Adjust threshold as needed
}

// Helper function to check if an element or its parents have .no-animation
function hasNoAnimation(element) {
  return element.closest(".no-animation") !== null;
}

function setupLazyFadeInAnimations() {
  if (isMobileDevice()) return () => {};

  const animatedTags = selectAll(
    ".hero h1, h1, .about h1, h2, .hero h3, p, .about__img, button, img, figure, figcaption, h3, form, div.simple-divider, .project img, .project video, .project h1, .project h2, .project p, .footer img, figcaption, li, header, video, a, iframe, h4, h5, h6, blockquote, div.details, cite, svg, link"
  );

  debug(`Found ${animatedTags.length} animated tags`);

  animatedTags.forEach((tag) => {
    if (!hasNoAnimation(tag)) tag.style.opacity = 0;
  });

  function fadeIn(tag) {
    tag.style.animation = `fadein-scale 1s ease-out 0s both`;
    tag.style.opacity = 1;
  }

  // Intersection Observer for lazy loading fade-in
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tag = entry.target;
          if (!hasNoAnimation(tag)) {
            fadeIn(tag);
          }
          observerInstance.unobserve(tag);
        }
      });
    },
    { threshold: 0.25 }
  ); // Trigger when 25% of the element is visible

  animatedTags.forEach((tag) => {
    observer.observe(tag);
  });
}

// Accent animations
function setupAccentAnimations() {
  if (isMobileDevice()) return;

  const breathers = selectAll(
    ".breathe:not(.no-animation) :not(.no-animation)"
  );
  const spinners = selectAll(".rotate:not(.no-animation) :not(.no-animation)");

  debug(
    `Found ${breathers.length} breather elements and ${spinners.length} spinner elements`
  );

  breathers.forEach((breather, index) => {
    breather.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" },
      ],
      {
        delay: 600 * index,
        duration: 6000,
        iterations: Infinity,
      }
    );
  });

  spinners.forEach((spinner, index) => {
    spinner.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        delay: 300 * index,
        duration: 50000,
        iterations: Infinity,
      }
    );
  });
}

// Parallax effects
function setupParallaxEffects() {
  if (isMobileDevice())
    return { applyHeroParallax: () => {}, applyFeaturesParallax: () => {} };

  const heroSection = select(".hero");
  const featuresContainer = select(".features");
  const sections = selectAll(".features .subfeature");

  debug(
    `Hero section found: ${!!heroSection}, Features container found: ${!!featuresContainer}, Number of sections: ${
      sections.length
    }`
  );

  function applyHeroParallax() {
    if (!heroSection) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    heroSection.querySelectorAll("[data-parallax]").forEach((tag) => {
      if (hasNoAnimation(tag)) return;
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  }

  function applyFeaturesParallax() {
    if (!featuresContainer) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const featuresTop = featuresContainer.offsetTop;

    sections.forEach((section, index) => {
      const topSection = section.offsetTop + featuresTop;
      const midSection = topSection + section.offsetHeight / 2;
      const distanceToSection = scrollY + viewportHeight / 2 - midSection;

      section.querySelectorAll("[data-parallax]").forEach((tag) => {
        if (hasNoAnimation(tag)) return;
        const speed = parseFloat(tag.getAttribute("data-parallax"));
        tag.style.transform = `translate3d(0, ${
          distanceToSection * speed
        }px, 0)`;
      });
    });
  }

  return { applyHeroParallax, applyFeaturesParallax };
}

// Main initialization
function initializeAnimationsAndParallax() {
  debug("Initializing animations and parallax effects");
  setupLazyFadeInAnimations(); // Lazy fade-in
  setupAccentAnimations();
  const { applyHeroParallax, applyFeaturesParallax } = setupParallaxEffects();

  function handleScroll() {
    applyHeroParallax();
    applyFeaturesParallax();
  }

  handleScroll();
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener("resize", handleScroll);
  debug("Initialization complete, event listeners attached");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeAnimationsAndParallax
  );
} else {
  initializeAnimationsAndParallax();
}

if (!document.querySelector("style#fade-in-animation")) {
  const style = document.createElement("style");
  style.id = "fade-in-animation";
  style.textContent = `
    @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  debug("Added fade-in animation CSS");
}
