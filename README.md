# Zest Studios website

Static site for [zeststudios.net](https://zeststudios.net), hosted on GitHub Pages.

- **Preview locally:** `py serve.py` (a local-only script, gitignored), then open http://localhost:8000 (serves clean URLs like `/better-logger`, the same as GitHub Pages).
- **Styles:** everything lives in `assets/css/zest.css`. The shared nav and footer are `assets/components/header.js` and `footer.js`.
- **Adding a page:** add it to `PAGES` in `tools/update-heads.py`, run `py tools/update-heads.py` to generate its SEO head, and add its URL to `sitemap.xml`.
- **Social preview images** are 1200×630 JPEGs in `assets/images/og/`.
