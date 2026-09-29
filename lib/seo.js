// Single source for <title>, meta descriptions and JSON-LD, so the head tags
// and the structured data always agree. Used through the `seo` filter
// (see eleventy.config.js): {{ "title" | seo }}, {{ "jsonld" | seo | safe }}

const PERSON_NAME = "TJ Lien";
const JOB_TITLE = "Creative Director & Project Manager";

const oneLine = (s) => String(s || "").replace(/\s+/g, " ").trim();
const isFeatured = require("./feature");
const isProject = (ctx) => Boolean(isFeatured(ctx) && ctx.client && ctx.title);

// Search results cut titles near 60 characters: keep the role keywords in the
// suffix only when they fit, otherwise fall back to just the name.
function pageTitle(ctx) {
  if (isProject(ctx)) {
    const base = `${ctx.client}: ${oneLine(ctx.title)}`;
    const long = `${base} | TJ Lien, Creative Director & Project Manager`;
    return long.length <= 66 ? long : `${base} | TJ Lien`;
  }
  return oneLine(ctx.title || ctx.client);
}

function shareTitle(ctx) {
  if (isProject(ctx)) return `${ctx.client}: ${oneLine(ctx.title)}`;
  return oneLine(ctx.title || ctx.client);
}

// Search snippets show ~155 characters. Case studies lead with the brief, then
// add the headline result if it still fits.
function description(ctx, site) {
  if (!isProject(ctx)) return oneLine(ctx.description || ctx.subtitle || site.description);
  let d = oneLine(ctx.subtitle);
  if (d && !/[.!?]$/.test(d)) d += ".";
  // A headline result is optional: not every case study has a metric
  const result = ctx.metric ? `${ctx.metric} ${oneLine(ctx.metricLabel)}.` : "";
  if (!result) return d;
  return d.length + result.length + 1 <= 158 ? `${d} ${result}`.trim() : d || result;
}

function toDate(d) {
  const t = d instanceof Date ? d : new Date(d);
  return isNaN(t) ? null : t.toISOString().slice(0, 10);
}

function jsonld(ctx, site) {
  const abs = (p) => (/^https?:/.test(p) ? p : site.url + encodeURI(p));
  const url = site.url + ((ctx.page && ctx.page.url) || "/");
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: PERSON_NAME,
    jobTitle: JOB_TITLE,
    description: site.description,
    url: `${site.url}/`,
    image: `${site.url}/assets/img/flowers2.webp`,
    knowsAbout: [
      "Creative direction",
      "Project management",
      "Creative production",
      "Esports tournaments",
      "Live broadcast production",
      "Influencer marketing",
      "Video production",
    ],
  };
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${site.url}/`,
    name: PERSON_NAME,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": personId },
  };

  const webpage = (type, extra) => ({
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: shareTitle(ctx),
    description: description(ctx, site),
    isPartOf: { "@id": websiteId },
    inLanguage: "en-US",
    ...extra,
  });
  const crumbs = (items) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${site.url}${path}`,
    })),
  });

  const graph = [website, person];
  const path = (ctx.page && ctx.page.url) || "/";

  if (path === "/") {
    graph.push(webpage("WebPage", { about: { "@id": personId } }));
  } else if (path === "/about/") {
    graph.push(webpage("ProfilePage", { mainEntity: { "@id": personId } }));
    graph.push(crumbs([["Home", "/"], ["About", "/about/"]]));
  } else if (path === "/contact/") {
    graph.push(webpage("ContactPage", { about: { "@id": personId } }));
    graph.push(crumbs([["Home", "/"], ["Contact", "/contact/"]]));
  } else if (path === "/case-studies/") {
    const items = (ctx.collections && ctx.collections.animation) || [];
    graph.push(
      webpage("CollectionPage", {
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}${p.url}`,
            name: `${p.data.client}: ${oneLine(p.data.title)}`,
          })),
        },
      })
    );
    graph.push(crumbs([["Home", "/"], ["Case studies", "/case-studies/"]]));
  } else if (isProject(ctx)) {
    const img = ctx.image && (typeof ctx.image === "string" ? ctx.image : ctx.image.jpg || ctx.image.webp);
    const work = {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      url,
      name: shareTitle(ctx),
      headline: oneLine(ctx.title),
      description: description(ctx, site),
      abstract: oneLine(ctx.subtitle),
      creator: { "@id": personId },
      author: { "@id": personId },
      producer: { "@type": "Organization", name: ctx.agency || ctx.client },
      about: { "@type": "Organization", name: ctx.client },
      genre: "Case study",
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      mainEntityOfPage: url,
    };
    if (img) work.image = abs(img);
    if (toDate(ctx.date)) work.datePublished = toDate(ctx.date);
    if (ctx.scope) work.keywords = oneLine(ctx.scope);
    graph.push(work);
    graph.push(crumbs([["Home", "/"], ["Case studies", "/case-studies/"], [oneLine(ctx.title), path]]));
  }

  // "</" would end the script block early
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

// Early connections to the third-party hosts a page's video comes from
function preconnect(ctx) {
  const tags = [];
  const path = (ctx.page && ctx.page.url) || "/";
  if (ctx.heroVimeo) {
    tags.push('<link rel="preconnect" href="https://player.vimeo.com" />');
    tags.push('<link rel="preconnect" href="https://i.vimeocdn.com" crossorigin />');
  }
  if (ctx.video && typeof ctx.video === "object" && String(ctx.video.mp4 || "").includes("b-cdn.net")) {
    tags.push('<link rel="preconnect" href="https://tifajade.b-cdn.net" crossorigin />');
  }
  if (path === "/") {
    tags.push('<link rel="preconnect" href="https://iframe.mediadelivery.net" />');
    tags.push('<link rel="preconnect" href="https://assets.mediadelivery.net" crossorigin />');
  }
  return tags.join("\n");
}

module.exports = function seo(kind, ctx, site) {
  switch (kind) {
    // Plain text: Nunjucks escapes it for the attribute or element
    case "title": return pageTitle(ctx);
    case "shareTitle": return shareTitle(ctx);
    case "description": return description(ctx, site);
    case "jsonld": return jsonld(ctx, site);
    case "preconnect": return preconnect(ctx);
    default: return "";
  }
};
