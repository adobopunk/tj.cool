module.exports = function (eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("app");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("pdf");

  // Set template formats
  eleventyConfig.setTemplateFormats(["njk", "html"]); // Include njk for Nunjucks

  eleventyConfig.addCollection("animation", function (collection) {
    return collection
      .getFilteredByGlob("src/projects-animation/*.njk")
      .sort((a, b) => {
        const aFeature = a.data.feature === "yes" ? 1 : 0;
        const bFeature = b.data.feature === "yes" ? 1 : 0;

        // Prioritize featured projects
        if (aFeature !== bFeature) {
          return bFeature - aFeature;
        }

        // If both are featured projects
        if (aFeature && bFeature) {
          const aOrder = a.data.order !== undefined ? a.data.order : Infinity;
          const bOrder = b.data.order !== undefined ? b.data.order : Infinity;

          if (aOrder !== bOrder) {
            return aOrder - bOrder; // lower order first
          }
        }

        // Fallback to date sorting (newest first)
        const aDate = new Date(a.data.date);
        const bDate = new Date(b.data.date);

        return bDate - aDate;
      });
  });

  eleventyConfig.addCollection("video", function (collection) {
    return collection
      .getFilteredByGlob("src/projects-video/*.njk")
      .sort((a, b) => {
        // First, prioritize 'featured' items
        if (a.data.feature === "yes" && b.data.feature !== "yes") {
          return -1; // a should come first
        } else if (a.data.feature !== "yes" && b.data.feature === "yes") {
          return 1; // b should come first
        }
        // Then, sort by date (if both have the same 'feature' value)
        return new Date(b.data.date) - new Date(a.data.date);
      });
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
    data: {
      siteUrl: "https://tifajade.com",
    },
  };
};
