// Homepage hero video (Bunny Stream embed) used as a muted background.
// - loops before the last 3 seconds of the video
// - pauses when the hero scrolls out of view
// - skipped entirely for reduced-motion and Save-Data visitors
(function () {
  const iframe = document.getElementById("hero-video");
  if (!iframe) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduce || saveData) {
    iframe.remove();
    return;
  }

  const TAIL = 3; // seconds to cut off the end

  const script = document.createElement("script");
  script.src = "https://assets.mediadelivery.net/playerjs/player-0.1.0.min.js";
  script.onload = () => {
    if (!window.playerjs) return;
    const player = new window.playerjs.Player(iframe);
    let visible = true;

    player.on("ready", () => {
      player.mute();
      player.play();

      player.on("timeupdate", (t) => {
        if (t && t.duration > TAIL * 2 && t.seconds >= t.duration - TAIL) {
          player.setCurrentTime(0);
        }
      });
      player.on("ended", () => {
        player.setCurrentTime(0);
        player.play();
      });
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible) player.play();
          else player.pause();
        });
      }).observe(iframe.closest(".pm-hero"));
    }
  };
  document.head.appendChild(script);
})();
