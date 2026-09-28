document.addEventListener("DOMContentLoaded", function () {
  const showreelButtons = document.querySelectorAll(".showreel");
  const overlay = document.getElementById("showreel-overlay");
  const closeButton = document.querySelector(".close-overlay");
  const iframe = document.querySelector("#showreel-overlay iframe");
  const overlayContent = document.querySelector(".overlay-content");

  iframe.setAttribute("data-original-src", iframe.getAttribute("src"));

  function openOverlay() {
    overlay.classList.add("reelon");
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.opacity = "1";
      // Restore the video src when opening
      const originalSrc = iframe.getAttribute("data-original-src");
      if (originalSrc) {
        iframe.src = originalSrc;
      }
    }, 10);
  }

  function closeOverlay() {
    // Immediately stop playback by blanking the iframe
    iframe.src = "about:blank";

    overlay.style.opacity = "0";
    overlay.addEventListener(
      "transitionend",
      function () {
        overlay.classList.remove("reelon");
        overlay.style.display = "none";
      },
      { once: true }
    );
  }

  showreelButtons.forEach((button) => {
    button.addEventListener("click", openOverlay);
  });

  closeButton.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  // Prevent clicks inside content from closing overlay
  overlayContent.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const showreelButtons = document.querySelectorAll(".showreel");
//   const overlay = document.getElementById("showreel-overlay");
//   const closeButton = document.querySelector(".close-overlay");
//   const iframe = document.querySelector(
//     "#showreel-overlay .vimeo-container iframe"
//   );
//   const player = new Vimeo.Player(iframe);
//   const overlayContent = document.querySelector(".overlay-content");

//   function openOverlay() {
//     overlay.classList.add("reelon");
//     overlay.style.display = "flex";
//     setTimeout(() => {
//       overlay.style.opacity = "1";
//       player.play();
//     }, 10);
//   }

//   function closeOverlay() {
//     overlay.style.opacity = "0";
//     overlay.addEventListener(
//       "transitionend",
//       function () {
//         overlay.classList.remove("reelon");
//         overlay.style.display = "none";
//         player
//           .setCurrentTime(0)
//           .then(() => player.pause())
//           .catch(console.error);
//       },
//       { once: true }
//     );
//   }

//   showreelButtons.forEach((button) => {
//     button.addEventListener("click", openOverlay);
//   });

//   closeButton.addEventListener("click", closeOverlay);

//   overlay.addEventListener("click", function (e) {
//     if (e.target === overlay) {
//       closeOverlay();
//     }
//   });

//   // Prevent clicks inside content from closing overlay
//   overlayContent.addEventListener("click", function (e) {
//     e.stopPropagation();
//   });
// });
