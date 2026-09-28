// Interactive gradient: two soft jade blobs that drift toward (and away from)
// the pointer inside any [data-glow] section. Static when the visitor prefers
// reduced motion or has no fine pointer.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.querySelectorAll("[data-glow]").forEach((zone) => {
    const a = zone.querySelector(".pm-glow__blob--a");
    const b = zone.querySelector(".pm-glow__blob--b");
    if (!a || !b || reduce || !fine) return;

    // Positions are blob centres, in zone coordinates
    let w = zone.offsetWidth;
    let h = zone.offsetHeight;
    const rest = () => ({ a: [w * 0.78, h * 0.18], b: [w * 0.1, h * 0.95] });
    let target = rest();
    const pos = { a: [...target.a], b: [...target.b] };
    let raf = 0;

    const place = () => {
      const sa = a.offsetWidth / 2;
      const sb = b.offsetWidth / 2;
      a.style.transform = `translate3d(${pos.a[0] - sa}px, ${pos.a[1] - sa}px, 0)`;
      b.style.transform = `translate3d(${pos.b[0] - sb}px, ${pos.b[1] - sb}px, 0)`;
    };

    const tick = () => {
      let moving = false;
      for (const [key, ease] of [["a", 0.08], ["b", 0.04]]) {
        for (let i = 0; i < 2; i++) {
          const d = target[key][i] - pos[key][i];
          if (Math.abs(d) > 0.3) {
            pos[key][i] += d * ease;
            moving = true;
          }
        }
      }
      place();
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    zone.addEventListener("pointermove", (e) => {
      const r = zone.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      target = { a: [x, y], b: [w - x * 0.7, h - y * 0.7] };
      kick();
    });
    zone.addEventListener("pointerleave", () => {
      target = rest();
      kick();
    });
    window.addEventListener("resize", () => {
      w = zone.offsetWidth;
      h = zone.offsetHeight;
      target = rest();
      kick();
    });

    // Disable the CSS starting transforms and take over from the resting spots
    place();
  });
})();
