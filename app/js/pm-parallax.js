// Hero parallax: the background media drifts down slower than the page
// scrolls, so it feels pinned behind the content. Uses the media's built-in
// overhang (12% top and bottom) so no edge ever shows.
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const media = document.querySelector(".pm-hero-media");
  if (!media) return;
  const hero = media.parentElement;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0) return;
    const max = hero.offsetHeight * 0.12;
    const offset = Math.min(Math.max(-rect.top, 0) * 0.35, max);
    media.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
})();
