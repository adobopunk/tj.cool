document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p, li, button, img, video, iframe, section, article"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          observer.unobserve(entry.target); // Stop observing once faded in
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the element is visible
  );

  fadeElements.forEach((el) => observer.observe(el));
});
