# Sidhu's Views — Reusable Article Publishing System

This document outlines the architecture, automation engine, and reusable prompt for publishing new articles on **Sidhu's Views** (`https://gurdeepsidhu.github.io/sidhu-s-views/`).

---

## 1. System Architecture

```
                       [ Prompt to Antigravity ]
                                   │
                                   ▼
                   1. Create Article HTML (design-consistent)
                                   │
                                   ▼
                   2. Register in articles.json (Single Source of Truth)
                                   │
                                   ▼
                   3. Link in explore.html & Related Articles
                                   │
                                   ▼
                   4. Run: python publish.py --build
                        ├── Validates all canonicals & internal links
                        ├── Regenerates sitemap.xml
                        ├── Updates rss.xml feed
                        └── Updates sw.js PWA cache
                                   │
                                   ▼
                   5. Commit & Push to GitHub (main)
                                   │
                                   ▼
               Automatic GitHub Pages Deploy (HTTP 200)
```

---

## 2. Core Files

| File | Purpose |
| :--- | :--- |
| `articles.json` | **Single Source of Truth**: Central registry of all published articles and core pages. |
| `publish.py` | **Publishing Engine**: Validates internal links, checks canonicals, regenerates `sitemap.xml`, syncs `rss.xml`, and updates `sw.js`. |
| `sitemap.xml` | Generated sitemap located at `/sidhu-s-views/sitemap.xml`. |
| `rss.xml` | RSS 2.0 feed with Pinterest-ready media enclosures. |
| `sw.js` | Service Worker with network-first caching for instant article delivery. |
| `.github/workflows/validate-site.yml` | Safe GitHub Actions CI runner that validates integrity on every push without disrupting Pages branch deployment. |

---

## 3. How Sitemap Regeneration Works

Whenever `python publish.py --build` is executed:
1. `articles.json` is read.
2. Every file on disk is checked to confirm it exists and has no `noindex` tag.
3. Every internal `<a href="...">` link in the article is checked against disk files to prevent 404 broken links.
4. The canonical `<link rel="canonical">` tag is checked against the registry URL.
5. `sitemap.xml` is regenerated with:
   - Proper XML declaration and UTF-8 encoding.
   - Core static pages (`/`, `explore.html`, `journal.html`, `about.html`).
   - All published articles ordered by `publishDate` descending.
   - Accurate `<lastmod>` timestamps.

---

## 4. Reusable Prompt to Publish Future Articles

Copy and paste this single prompt whenever you want Antigravity to write and publish a new article:

```text
Publish a new article for Sidhu's Views:

Topic / Working Title: [Enter Topic or Title]
Category: [lifestyle | crafts | decor | travel]
Summary / Key Ideas: [Enter main points, tone, or key stories]

Please execute the standard publishing workflow:
1. Create the new article HTML file using existing website styling, font stack, and Schema.org Article metadata.
2. Add a two-column "Related Articles" section linking to 2 existing relevant articles.
3. Register the new article in articles.json.
4. Add the article card under the correct category pillar in explore.html (and featured section in index.html if appropriate).
5. Run `python publish.py --build` to regenerate sitemap.xml, sync rss.xml, and update sw.js.
6. Verify that no broken links exist and all canonical tags match.
```

---

## 5. Verification Checklist

Before and after publishing:
- [ ] **File Exists**: HTML file created with lowercase slug (e.g. `article-my-new-story.html`).
- [ ] **Canonical Tag**: Matches exact public URL `https://gurdeepsidhu.github.io/sidhu-s-views/article-my-new-story.html`.
- [ ] **No Self-Links**: Related articles point to distinct existing files.
- [ ] **Registered**: Entry added to `articles.json`.
- [ ] **Category Hub**: Card added to `explore.html`.
- [ ] **Engine Build**: `python publish.py --build` exits with code 0.
- [ ] **Git Push**: Changes pushed to `origin/main`.
- [ ] **Live Verification**: Page returns HTTP 200 on `https://gurdeepsidhu.github.io/sidhu-s-views/...` after 1-2 minutes.
