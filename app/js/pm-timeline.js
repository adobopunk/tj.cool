// "How I got here": the jade line grows and each dot lights up as you scroll,
// following the journey. Everything is shown at once for reduced-motion.
(function () {
  const timeline = document.querySelector(".pm-timeline");
  if (!timeline) return;
  const items = [...timeline.querySelectorAll(".pm-tl")];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  timeline.classList.add("is-js");
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = timeline.getBoundingClientRect();
    const focus = window.innerHeight * 0.6; // where the "reader" is looking
    const h = Math.min(Math.max(focus - rect.top, 0), rect.height);
    timeline.style.setProperty("--tl-h", h + "px");
    items.forEach((el) => {
      const dot = el.offsetTop + 8;
      el.classList.toggle("is-active", dot <= h);
    });
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
