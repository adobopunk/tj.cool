# TJ Lien's Portfolio

Welcome to the repository for my personal portfolio website! This is a fully custom-built site showcasing my work as a creative director and project manager. The site is fully open-source, made with Pico CSS and deploys via 11ty on Netlify.

## Features

- **Custom Design**: Every aspect of the site was designed and coded from scratch.
- **Responsive Layout**: Optimized for all screen sizes and devices.
- **Hero Video Background**: A dynamic hero section with a custom embedded background video.
- **Dark Mode Toggle**: Allows switching between light and dark mode for accessibility, opens in dark mode by default and remembers the visitor's choice.
- **Modular Showcase**: Sections for 2D & 3D animation, motion design, and video production.
- **Lightweight**: Images and videos compressed with ffmpeg to maintain quick load times.

## Tech Stack

- **Nunjucks**: Markup for structuring content.
- **SCSS**: Custom styles, including responsive design and animations.
- **JavaScript**: Interactive features and smooth scrolling.
- **11ty (Eleventy)**: Static site generator for fast builds and deploys.
- **Netlify**: Hosting and continuous deployment.

## Adding a case study

Create `src/projects/<slug>.njk` (copy a recent one). Front matter that matters:

- `feature: "yes"`: **publishes the project** (page, case-studies list, sitemap). `"no"` keeps it in the folder but unpublished.
- `metric` + `metricLabel`: optional headline stat shown on the page and cards. Independent of `feature`.
- `image` (`webp` + `jpg`): 16:9 still. Used for cards, the hero fallback and the social-share preview.
- `heroVimeo: "<id>"`: optional looping Vimeo hero. Or `video:` for a self-hosted or CDN loop.
- `homeOrder`: 1-3 puts it on the homepage (three cards); the lowest number is the large featured card.
- `cardImage` / `cardImagePosition`: optional alternate image for the featured card only.
- `date`, `client`, `agency`, `scope`, `subtitle`.

After adding or changing a project's `image`, run `node scripts/make-thumbs.js` (needs `cwebp`) and commit
the generated `assets/img/thumbs/<slug>.webp`. Grid cards use that 800px thumbnail.

## Performance and SEO notes

- **Video:** hero loops autoplay; every other `<video autoplay>` in a case-study body is rewritten at build
  time (`lazy-video` transform in `eleventy.config.js`) to load and play only when scrolled near
  (`app/js/pm-lazyvideo.js`). Keep hero loops small (about 1280px wide, no audio, under 3MB).
- **Titles, descriptions, JSON-LD:** generated in `lib/seo.js` from each page's front matter. Set
  `description` on top-level pages; case studies build theirs from `subtitle` (+ `metric` when present).
  Add `noindex: true` to keep a page out of search and the sitemap.
- **CSS:** the source stylesheets in `assets/css/` stay readable. `npx eleventy` (the build) minifies the
  copies in `_site/` with `csso`; `npm run dev` serves them unminified.
- **Fonts:** only the three WOFF2 files the site uses live in `assets/fonts/` (Rethink Sans, Hahmlet,
  Newsreader). To add a font, declare it in `@font-face` and ship WOFF2 only.
- **PDFs:** `src/_headers` marks the résumé PDFs `noindex` so they stay downloadable but out of search.
- **Headers:** `src/_headers` sets security headers and cache lifetimes (Netlify).
- **`robots.txt`:** search and link-preview crawlers are allowed; AI training/assistant bots are blocked.

## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/adobopunk/portfolio.git
   ```
2. Navigate to the project folder:
   ```bash
   cd portfolio
   ```
3. Install dependencies (requires Node.js):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npx eleventy --serve
   ```
5. Open your browser at `http://localhost:8080` to view the site.

## Deployment

The site is automatically deployed to Netlify on every push to the `main` branch. To deploy manually, ensure you’ve set up your Netlify project and push changes to the repository.

## Connect with Me

Check out my portfolio live at [tj.cool](https://tj.cool) or connect with me on:

- [Email](mailto:hire@tj.cool)
- [LinkedIn](https://www.linkedin.com/in/tifajade/)

Thanks for stopping by!
