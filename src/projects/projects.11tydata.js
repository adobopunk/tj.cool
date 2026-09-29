// Case study visibility.
//
// A project is published (page built, listed on the homepage/browse page,
// included in the sitemap) only when its front matter says:
//
//   feature: "yes"
//
// Projects marked "no" stay in this folder but are skipped at build time (see
// the "hide-unfeatured" preprocessor in eleventy.config.js). `metric` and
// `metricLabel` are optional and only control the headline stat shown on the
// page and its cards; they no longer decide whether a project is published.
module.exports = {
  permalink: "/case-studies/{{ page.fileSlug }}/",
};
