const site = require("./src/_data/site.json");

module.exports = function (eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("app");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Set template formats
  eleventyConfig.setTemplateFormats(["njk", "html"]); // Include njk for Nunjucks

  // Published case studies (those with a headline `metric`), newest first
  eleventyConfig.addCollection("animation", function (collection) {
    return collection
      .getFilteredByGlob("src/projects-animation/*.njk")
      .filter((p) => p.data.metric)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Absolute, URL-encoded address for og:image / twitter:image
  eleventyConfig.addFilter("absoluteImage", function (image) {
    const src =
      typeof image === "string"
        ? image
        : image && (image.jpg || image.webp);
    return site.url + encodeURI(src || "/assets/img/og-image.jpg");
  });

  // Case studies without a headline `metric` are not published (see
  // src/projects-animation/projects-animation.11tydata.js)
  eleventyConfig.addPreprocessor("hide-unfeatured", "njk", (data) => {
    if (data.page.inputPath.includes("/projects-animation/") && !data.metric) {
      return false;
    }
  });

  // Best available still for a project's `image` (string or {webp, jpg})
  eleventyConfig.addFilter("projectImage", function (image) {
    const src =
      typeof image === "string" ? image : image && (image.webp || image.jpg);
    return src || "/assets/img/og-image.jpg";
  });

  // Curated homepage results, ordered by `homeOrder` front matter
  eleventyConfig.addCollection("featuredHome", function (collection) {
    return collection
      .getFilteredByGlob("src/projects-animation/*.njk")
      .filter((p) => p.data.homeOrder)
      .sort((a, b) => a.data.homeOrder - b.data.homeOrder);
  });

  // Add index filter
  eleventyConfig.addFilter("index", function (array, value) {
    return array.indexOf(value);
  });

  // Add filter for adjacent projects
  eleventyConfig.addFilter(
    "getAdjacentProjects",
    (projects, currentProject) => {
      const currentIndex = projects.findIndex(
        (project) => project.fileSlug === currentProject.fileSlug
      );
      const previous = projects[currentIndex - 1] || null;
      const next = projects[currentIndex + 1] || null;
      return { previous, next };
    }
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_templates",
    },
    templateFormats: ["njk", "html"],
  };
};
