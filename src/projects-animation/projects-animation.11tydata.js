// Case study visibility.
//
// A project is published (page built, listed on the homepage/browse page,
// included in the sitemap) only when its front matter has a headline stat:
//
//   metric: "93K+"
//   metricLabel: "peak concurrent viewers"
//
// Projects without a `metric` stay in this folder but are skipped at build
// time (see the "hide-unfeatured" preprocessor in eleventy.config.js). To
// showcase one, add a metric and label to its front matter.
module.exports = {
  permalink: "/case-studies/{{ page.fileSlug }}/",
};
