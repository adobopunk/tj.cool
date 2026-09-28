// Ambient background: the blobs drift on their own (CSS). This adds a gentle
// pointer parallax on top, and pauses motion for visitors who prefer less.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    // Show stills instead of looping hero video
    document.querySelectorAll(".pm-hero-media video").forEach((v) => {
      v.removeAttribute("autoplay");
      v.pause();
    });
    return;
  }

  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!fine) return;

  const layers = [
    { el: document.querySelector(".pm-bg__blob--a i"), k: 0.1 },
    { el: document.querySelector(".pm-bg__blob--b i"), k: -0.07 },
    { el: document.querySelector(".pm-bg__blob--c i"), k: 0.05 },
  ].filter((l) => l.el);
  if (!layers.length) return;

  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let raf = 0;

  const tick = () => {
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    layers.forEach((l) => {
      l.el.style.transform = `translate3d(${cx * l.k}px, ${cy * l.k}px, 0)`;
    });
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX - window.innerWidth / 2;
      ty = e.clientY - window.innerHeight / 2;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true }
  );
})();
