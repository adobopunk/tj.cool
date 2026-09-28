// Contact modal: every link to #contact opens a dialog over the current page
// instead of jumping to the footer. Without JS, the link still scrolls to the
// footer form. The dialog reuses the footer form (cloned on first open).
(function () {
  const dialog = document.getElementById("contact-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const slot = dialog.querySelector("[data-modal-form]");
  const source = document.querySelector(".pm-footer form");
  let lastFocus = null;

  function open() {
    if (slot && source && !slot.firstElementChild) {
      slot.appendChild(source.cloneNode(true));
    }
    lastFocus = document.activeElement;
    dialog.showModal();
    const first = [...dialog.querySelectorAll("input:not([type=hidden])")].find((i) => !i.closest(".visually-hidden"));
    if (first) first.focus();
  }

  function close() {
    dialog.close();
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#contact"]');
    if (link) {
      e.preventDefault();
      open();
    }
  });

  dialog.querySelectorAll("[data-modal-close]").forEach((b) => b.addEventListener("click", close));

  // Click on the dimmed backdrop closes
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });

  dialog.addEventListener("close", () => {
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });

  if (location.hash === "#contact") open();
})();
