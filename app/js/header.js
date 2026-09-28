function isMobileDevice() {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobileUA =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return isTouchDevice && isMobileUA;
}

if (!isMobileDevice()) {
  const headerTag = document.querySelector(".sidebar");
  const hamburgerTag = document.querySelector(".hamburger");
  const linksTag = document.querySelector(".topnav__links");

  let lastScrollY = window.scrollY;
  let fadeAmount = 1; // start fully visible

  const fadeBox = function () {
    const currentScrollY = window.scrollY;
    const isHovering = headerTag.matches(":hover");

    if (isHovering) {
      fadeAmount = 1; // reset fully visible
    } else {
      const scrollDelta = currentScrollY - lastScrollY;

      // scrolling down → fade out
      if (scrollDelta > 0) {
        fadeAmount = Math.max(fadeAmount - 0.05, 0);
      }
      // scrolling up → fade in
      else if (scrollDelta < 0) {
        fadeAmount = Math.min(fadeAmount + 0.05, 1);
      }
    }

    lastScrollY = currentScrollY;

    const alpha = 0.2 * fadeAmount;
    const opacity = fadeAmount;

    headerTag.style.boxShadow = `0 2px 10px rgba(0, 0, 0, ${alpha})`;
    headerTag.style.opacity = `${opacity}`;
    // hamburgerTag.style.opacity = `${opacity}`;
    linksTag.style.opacity = `${opacity}`;
  };

  headerTag.addEventListener("mouseenter", () => {
    fadeAmount = 1;
    headerTag.style.boxShadow = `0 2px 10px rgba(0, 0, 0, 0.2)`;
    headerTag.style.opacity = `1`;
    // hamburgerTag.style.opacity = `1`;
    linksTag.style.opacity = `1`;
  });

  headerTag.addEventListener("mouseleave", fadeBox);

  // Initial state
  fadeBox();

  document.addEventListener("scroll", () => {
    fadeBox();
  });
} else {
  const headerTag = document.querySelector(".sidebar");

  headerTag.classList.add("nav-visible");
}
