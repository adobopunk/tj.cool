// Captions show only while the pointer is over their photo or video (CSS
// :hover handles images and local videos). A cross-origin video embed (Vimeo)
// swallows mouse events, so the page never sees the pointer inside it and CSS
// :hover never fires. For those figures we track the pointer as it approaches
// and enters the embed: the caption shows once the pointer reaches the figure
// (or comes within a few pixels of it) and hides on the first move outside.
(function () {
  const figs = Array.from(document.querySelectorAll(".pm-prose figure")).filter(
    (f) => f.querySelector("figcaption") && f.querySelector("iframe")
  );
  if (!figs.length) return;

  const PAD = 24; // px of slack so a fast entry can't skip past the edge
  let x = -1e4;
  let y = -1e4;
  let active = null;
  let queued = false;

  function update() {
    queued = false;
    let hit = null;
    for (const f of figs) {
      const r = f.getBoundingClientRect();
      if (x >= r.left - PAD && x <= r.right + PAD && y >= r.top - PAD && y <= r.bottom + PAD) {
        hit = f;
        break;
      }
    }
    if (hit === active) return;
    if (active) active.classList.remove("is-hover");
    if (hit) hit.classList.add("is-hover");
    active = hit;
  }

  function schedule() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  }

  document.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      schedule();
    },
    { passive: true }
  );
  // Pointer left the page entirely
  document.documentElement.addEventListener("mouseleave", () => {
    x = y = -1e4;
    schedule();
  });
  // Scrolling moves figures under a still pointer
  window.addEventListener("scroll", schedule, { passive: true });
})();
