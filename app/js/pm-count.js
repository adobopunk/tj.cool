// "Counting up" effect for the big highlighted stats. Each number animates
// from zero to its value the first time it scrolls into view.
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const els = document.querySelectorAll(".pm-stat strong, .pm-metric strong, .pm-hero-metric strong");
  if (!els.length) return;

  const parse = (text) => {
    const m = text.trim().match(/^([^0-9]*)([0-9][0-9,]*\.?[0-9]*)(.*)$/);
    if (!m) return null;
    const raw = m[2];
    return {
      prefix: m[1],
      suffix: m[3],
      value: parseFloat(raw.replace(/,/g, "")),
      decimals: (raw.split(".")[1] || "").length,
      commas: raw.includes(","),
    };
  };

  const format = (n, d) =>
    d.commas
      ? n.toLocaleString("en-US", { minimumFractionDigits: d.decimals, maximumFractionDigits: d.decimals })
      : n.toFixed(d.decimals);

  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function run(el, d, finalText) {
    const start = performance.now();
    const dur = 1400;
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = d.prefix + format(d.value * ease(t), d) + d.suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = finalText;
    };
    requestAnimationFrame(step);
  }

  const start = () => {
    const items = [];
    els.forEach((el) => {
      const finalText = el.textContent.trim();
      const d = parse(finalText);
      if (!d) return;
      // Reserve the final width so neighbouring text doesn't jump
      el.style.minWidth = el.getBoundingClientRect().width + "px";
      el.style.fontVariantNumeric = "tabular-nums";
      el.setAttribute("aria-label", finalText);
      el.setAttribute("role", "text");
      el.textContent = d.prefix + format(0, d) + d.suffix;
      items.push([el, d, finalText]);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = items.find((i) => i[0] === entry.target);
          io.unobserve(entry.target);
          if (item) run(item[0], item[1], item[2]);
        });
      },
      { threshold: 0.5 }
    );
    items.forEach((i) => io.observe(i[0]));
  };

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
})();
