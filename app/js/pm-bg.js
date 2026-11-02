// Ambient background: the blobs drift on their own (CSS). On top of that, a soft
// spotlight follows the pointer and the blobs lean toward it, and card-like boxes
// get a glow that pools where the cursor is. Everything eases (never snaps) and is
// skipped for visitors who prefer less motion or have no fine pointer.
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

  const bg = document.querySelector(".pm-bg");
  const layers = [
    { el: document.querySelector(".pm-bg__blob--a i"), k: 0.34 },
    { el: document.querySelector(".pm-bg__blob--b i"), k: -0.26 },
    { el: document.querySelector(".pm-bg__blob--c i"), k: 0.2 },
  ].filter((l) => l.el);

  let spot = null;
  if (bg) {
    spot = document.createElement("span");
    spot.className = "pm-bg__spot";
    bg.appendChild(spot);
  }

  // Pointer target, eased pointer, and speed (for a subtle swell while moving)
  const p = { tx: window.innerWidth / 2, ty: window.innerHeight / 3, x: window.innerWidth / 2, y: window.innerHeight / 3, v: 0 };

  // Card glow: one eased state per hovered box
  const CARD =
    ".pm-case, .pm-contact-card, .pm-stat, .pm-step, .pm-value, .pm-quote, .pm-fact, .pm-xp__row, .pm-quote-block, .pm-ph, .pm-btn";
  const cards = new Map(); // el -> {tx,ty,x,y,live}

  let raf = 0;
  const loop = () => {
    const dx = p.tx - p.x;
    const dy = p.ty - p.y;
    p.x += dx * 0.085;
    p.y += dy * 0.085;
    p.v += (Math.min(Math.hypot(dx, dy), 160) - p.v) * 0.1;

    const cx = p.x - window.innerWidth / 2;
    const cy = p.y - window.innerHeight / 2;
    layers.forEach((l) => {
      l.el.style.transform = `translate3d(${cx * l.k}px, ${cy * l.k}px, 0)`;
    });
    if (spot) {
      const s = 1 + p.v / 520;
      spot.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${s})`;
    }

    let busy = Math.abs(dx) + Math.abs(dy) > 0.4 || p.v > 0.5;
    cards.forEach((c, el) => {
      c.x += (c.tx - c.x) * 0.2;
      c.y += (c.ty - c.y) * 0.2;
      const r = c.w || 1;
      el.style.setProperty("--gx", c.x.toFixed(1) + "px");
      el.style.setProperty("--gy", c.y.toFixed(1) + "px");
      el.style.setProperty("--dx", ((c.x / r - 0.5) * 2).toFixed(3));
      el.style.setProperty("--dy", ((c.y / (c.h || 1) - 0.5) * 2).toFixed(3));
      if (Math.abs(c.tx - c.x) + Math.abs(c.ty - c.y) > 0.3) busy = true;
      else if (!c.live) cards.delete(el);
    });
    raf = busy ? requestAnimationFrame(loop) : 0;
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      p.tx = e.clientX;
      p.ty = e.clientY;
      if (spot) spot.classList.add("is-on");

      const el = e.target.closest ? e.target.closest(CARD) : null;
      cards.forEach((c, node) => {
        if (node !== el) c.live = false;
      });
      if (el) {
        const r = el.getBoundingClientRect();
        let c = cards.get(el);
        if (!c) {
          // Start the glow where the pointer entered so it doesn't sweep in from the corner
          c = { x: e.clientX - r.left, y: e.clientY - r.top, tx: 0, ty: 0, live: true };
          cards.set(el, c);
        }
        c.w = r.width;
        c.h = r.height;
        c.tx = e.clientX - r.left;
        c.ty = e.clientY - r.top;
        c.live = true;
      }
      wake();
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => spot && spot.classList.remove("is-on"));
  document.documentElement.addEventListener("mouseleave", () => spot && spot.classList.remove("is-on"));
  wake();
})();
