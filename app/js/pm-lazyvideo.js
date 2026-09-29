// Case-study body videos: the build (see "lazy-video" in eleventy.config.js)
// strips autoplay and sets preload="none", so nothing downloads on page load.
// Each clip starts when it nears the viewport and pauses when it leaves.
// Reduced-motion visitors get a normal player with controls instead.
(function () {
  const vids = Array.from(document.querySelectorAll("video[data-lazy]"));
  if (!vids.length) return;

  vids.forEach((v) => {
    // Once the size is known, use the real ratio so the box never jumps
    v.addEventListener("loadedmetadata", () => {
      if (v.videoWidth) v.style.aspectRatio = v.videoWidth + " / " + v.videoHeight;
    });
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduce || saveData || !("IntersectionObserver" in window)) {
    vids.forEach((v) => {
      v.controls = true;
      v.removeAttribute("loop");
      v.preload = "metadata";
    });
    return;
  }

  const play = (v) => {
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  };

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => (e.isIntersecting ? play(e.target) : e.target.pause())),
    { rootMargin: "600px 0px" }
  );
  vids.forEach((v) => io.observe(v));
})();
