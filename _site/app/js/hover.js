document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(
    ".gallery video, .image-preview-container video, .featured-gallery video"
  );

  // Check if we're on a mobile device
  function isMobile() {
    return (
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }

  // Set up or tear down video behavior based on screen size
  function setupVideos() {
    const mobile = isMobile();

    videos.forEach((video) => {
      let poster = video.nextElementSibling;

      if (!poster || !poster.classList.contains("video-poster")) {
        poster = document.createElement("img");
        poster.classList.add("video-poster");
        poster.src = video.getAttribute("poster") || "";
        poster.alt = "Video thumbnail";
        video.parentNode.insertBefore(poster, video.nextSibling);
      }

      const container = video.closest("a") || video.parentElement;

      // Clean existing event listeners
      container.onmouseenter = null;
      container.onmouseleave = null;

      if (mobile) {
        video.style.display = "none";
        poster.style.display = "block";
      } else {
        video.style.display = "block";
        poster.style.display = "none";

        video.setAttribute("preload", "none");

        container.onmouseenter = () => {
          const source = video.querySelector("source");
          if (source && !source.src && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
          }
          video.play().catch((e) => console.log("Playback error:", e));
        };

        container.onmouseleave = () => {
          video.pause();
        };
      }
    });
  }

  // Debounced resize handler
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupVideos, 200);
  }

  // Initial setup
  setupVideos();

  // Update on window resize
  window.addEventListener("resize", handleResize);
});
