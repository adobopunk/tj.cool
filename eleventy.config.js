const site = require("./src/_data/site.json");
const fs = require("fs");
const path = require("path");
const csso = require("csso");
const seo = require("./lib/seo");
const isFeatured = require("./lib/feature");

module.exports = function (eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("app");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // Minify the copied stylesheets in the build output (source CSS stays
  // readable). Only on `eleventy` builds, so `--serve` keeps readable CSS.
  eleventyConfig.on("eleventy.after", ({ dir, runMode }) => {
    if (runMode !== "build") return;
    const cssDir = path.join(dir.output, "assets", "css");
    if (!fs.existsSync(cssDir)) return;
    let before = 0;
    let after = 0;
    for (const name of fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"))) {
      const file = path.join(cssDir, name);
      const source = fs.readFileSync(file, "utf8");
      const min = csso.minify(source, { comments: false }).css;
      fs.writeFileSync(file, min);
      before += source.length;
      after += min.length;
    }
    console.log(`[minify-css] ${(before / 1000).toFixed(0)}KB -> ${(after / 1000).toFixed(0)}KB`);
  });

  // Set template formats
  eleventyConfig.setTemplateFormats(["njk", "html"]); // Include njk for Nunjucks

  // Published case studies (front matter `feature: "yes"`), newest first
  eleventyConfig.addCollection("animation", function (collection) {
    return collection
      .getFilteredByGlob("src/projects/*.njk")
      .filter((p) => isFeatured(p.data))
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

  // Case studies not marked `feature: "yes"` are not published (see
  // src/projects/projects.11tydata.js)
  eleventyConfig.addPreprocessor("hide-unfeatured", "njk", (data) => {
    if (data.page.inputPath.includes("/projects/") && !isFeatured(data)) {
      return false;
    }
  });

  // Case-study body videos load only when scrolled near (see
  // app/js/pm-lazyvideo.js). Hero videos sit before the prose block, so they
  // keep autoplay.
  eleventyConfig.addTransform("lazy-video", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    const at = content.indexOf('class="pm-wrap pm-prose"');
    if (at < 0) return content;
    const tail = content.slice(at).replace(/<video\b([^>]*)>/g, (tag, attrs) => {
      if (!/\bautoplay\b/.test(attrs)) return tag;
      const rest = attrs
        .replace(/\s+autoplay(?:=(?:"[^"]*"|'[^']*'))?(?=\s|$)/, "")
        .replace(/\s+preload=(?:"[^"]*"|'[^']*')/, "");
      return `<video data-lazy preload="none"${rest}>`;
    });
    return content.slice(0, at) + tail;
  });

  // Collapse newlines/extra spaces (a title can contain "\n" to force a line
  // break in the page heading only)
  eleventyConfig.addFilter("flat", (s) => String(s || "").replace(/\s+/g, " ").trim());

  // Titles, descriptions and JSON-LD for <head> (see lib/seo.js)
  eleventyConfig.addFilter("seo", function (kind) {
    return seo(kind, this.ctx, site);
  });

  // Small card thumbnail (assets/img/thumbs/<slug>.webp, made by
  // scripts/make-thumbs.js); falls back to the full image when none exists
  eleventyConfig.addFilter("cardThumb", function (project) {
    const rel = `assets/img/thumbs/${project.fileSlug}.webp`;
    return fs.existsSync(rel) ? "/" + rel : null;
  });

  // Best available still for a project's `image` (string or {webp, jpg})
  eleventyConfig.addFilter("projectImage", function (image) {
    const src =
      typeof image === "string" ? image : image && (image.webp || image.jpg);
    return src || "/assets/img/og-image.jpg";
  });

  // Curated homepage results, ordered by `homeOrder` front matter (published
  // projects only, so a card can never link to a page that was not built)
  eleventyConfig.addCollection("featuredHome", function (collection) {
    return collection
      .getFilteredByGlob("src/projects/*.njk")
      .filter((p) => p.data.homeOrder && isFeatured(p.data))
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
    // Layouts and includes (.html) render with Nunjucks like the pages do,
    // so escaping and filters behave the same everywhere
    htmlTemplateEngine: "njk",
  };
};
