// A case study is published (built, listed, in the sitemap) only when its front
// matter says `feature: "yes"`. This is independent of `metric`, which only
// controls the headline stat shown on the page and cards.
module.exports = function isFeatured(data) {
  const v = data && data.feature;
  return v === true || String(v).trim().toLowerCase() === "yes";
};
