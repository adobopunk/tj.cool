// Generates card thumbnails: assets/img/thumbs/<project-slug>.webp (800px wide).
// Grid cards show a ~400px-wide image, so loading the full 1920px still wastes
// bandwidth. Run after adding a case study or changing its `image`:
//   node scripts/make-thumbs.js
// Needs `cwebp` (brew install webp). Commit the generated files.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const matter = require("gray-matter");
const isFeatured = require("../lib/feature");

const dir = "src/projects";
const out = "assets/img/thumbs";
fs.mkdirSync(out, { recursive: true });

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".njk"))) {
  const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  if (!isFeatured(data)) continue; // unpublished
  const img = data.cardImageSource || (typeof data.image === "string" ? data.image : data.image && (data.image.webp || data.image.jpg));
  if (!img) continue;
  const src = img.replace(/^\//, "");
  if (!fs.existsSync(src)) {
    console.warn(`skip ${file}: missing ${src}`);
    continue;
  }
  const dest = path.join(out, path.basename(file, ".njk") + ".webp");
  execFileSync("cwebp", ["-quiet", "-q", "76", "-resize", "800", "0", src, "-o", dest]);
  console.log(`${dest}  ${(fs.statSync(dest).size / 1000).toFixed(0)}KB  <- ${src}`);
}
