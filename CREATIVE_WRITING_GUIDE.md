# Sidhu's Views — Creative Writing Publishing System & Template

This guide provides the official architecture, reusable HTML template, and publishing workflow for adding new poetry, stories, and reflections to the **Creative Writing** sanctuary on **Sidhu's Views**.

---

## 1. System Structure

```
                  Creative Writing Sanctuary (creative-writing.html)
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
      Hindi Poetry             English Poetry          Stories & Fiction
(creative-writing-hindi-poetry)
           │
           ▼
Individual Poem Posts (e.g. poem-shilpkar-aur-pashan.html)
```

---

## 2. Reusable Individual Poetry Post Template

Whenever a new poem or creative work is published, duplicate this template, save it with a clean URL slug (e.g. `poem-[slug].html`), and fill in the 10 fields:

```html
<!DOCTYPE html>
<html lang="[Language: 'hi' or 'en']">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  
  <!-- Field 1 & 8: SEO Title -->
  <title>[Poem Title] — गुरदीप सिधू की कविता | Sidhu's Views</title>
  
  <!-- Field 9: Meta Description -->
  <meta name="description" content="[Enter 1-2 sentence compelling summary of the poem or central theme]. लेखिका: गुरदीप सिधू (Gurdeep Sidhu)।">
  <meta name="keywords" content="[Poem Title], hindi poetry, गुरदीप सिधू, Gurdeep Sidhu poetry, साहित्य, Sidhu's Views">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Gurdeep Sidhu">
  
  <!-- Field 10: URL Slug & Canonical -->
  <link rel="canonical" href="https://gurdeepsidhu.github.io/sidhu-s-views/poem-[slug].html">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#2c5e43">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://gurdeepsidhu.github.io/sidhu-s-views/poem-[slug].html">
  <meta property="og:title" content="[Poem Title] — कविता">
  <meta property="og:description" content="[Enter 1-2 sentence compelling summary of the poem]. लेखिका: गुरदीप सिधू (Gurdeep Sidhu)">
  <meta property="og:image" content="https://gurdeepsidhu.github.io/sidhu-s-views/images/journal_samosa_hero.jpg">
  <meta property="og:site_name" content="Sidhu's Views">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://gurdeepsidhu.github.io/sidhu-s-views/poem-[slug].html">
  <meta name="twitter:title" content="[Poem Title] — कविता">
  <meta name="twitter:description" content="[Enter summary]. लेखिका: गुरदीप सिधू (Gurdeep Sidhu)">
  <meta name="twitter:image" content="https://gurdeepsidhu.github.io/sidhu-s-views/images/journal_samosa_hero.jpg">
  
  <!-- Fonts & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=2.2.0">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "headline": "[Poem Title]",
    "name": "[Poem Title]",
    "description": "[Short Description]",
    "inLanguage": "[Language: 'hi' or 'en']",
    "genre": "Poetry",
    "author": {
      "@type": "Person",
      "name": "Gurdeep Sidhu",
      "url": "https://gurdeepsidhu.github.io/sidhu-s-views/about.html"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sidhu's Views",
      "url": "https://gurdeepsidhu.github.io/sidhu-s-views/"
    },
    "datePublished": "[YYYY-MM-DD]",
    "dateModified": "[YYYY-MM-DD]",
    "mainEntityOfPage": "https://gurdeepsidhu.github.io/sidhu-s-views/poem-[slug].html"
  }
  </script>
</head>
<body>

  <!-- PRELOADER -->
  <div id="preloader">
    <div class="preloader-content">
      <div class="preloader-heart"><i class="fas fa-feather-alt"></i></div>
      <div class="preloader-text">SIDHU'S VIEWS</div>
      <div class="preloader-bar"><div class="preloader-bar-fill"></div></div>
    </div>
  </div>

  <!-- TAGLINE BANNER -->
  <div class="emergency-banner">
    <div class="container d-flex justify-content-between align-items-center flex-wrap">
      <span class="emergency-text">
        <i class="fas fa-feather-alt"></i> <strong>SIDHU'S VIEWS:</strong> Life &bull; Style &bull; Creativity &bull; Creative Writing &bull; Stories
      </span>
      <a href="creative-writing.html" class="emergency-phone">
        <i class="fas fa-pen-nib"></i> Creative Writing Sanctuary
      </a>
    </div>
  </div>

  <!-- NAVBAR -->
  <nav id="navbar" class="navbar navbar-expand-md">
    <div class="container">
      <a class="logo navbar-brand" href="index.html">
        <i class="fas fa-feather-alt"></i> SIDHU'S VIEWS
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" 
              aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">HOME</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="explore.html" id="catDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              CATEGORIES
            </a>
            <ul class="dropdown-menu" aria-labelledby="catDropdown">
              <li><a class="dropdown-item" href="explore.html?cat=decor"><i class="fas fa-couch text-danger me-2"></i> Home &amp; Decor</a></li>
              <li><a class="dropdown-item" href="explore.html?cat=crafts"><i class="fas fa-paint-brush text-warning me-2"></i> Handmade &amp; Crafts</a></li>
              <li><a class="dropdown-item" href="explore.html?cat=journal"><i class="fas fa-feather-alt text-primary me-2"></i> Journal &amp; Nostalgia</a></li>
              <li><a class="dropdown-item" href="explore.html?cat=lifestyle"><i class="fas fa-leaf text-success me-2"></i> Slow Living &amp; Habits</a></li>
              <li><a class="dropdown-item" href="explore.html?cat=travel"><i class="fas fa-compass text-info me-2"></i> Travel &amp; Escapes</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="explore.html">EXPLORE ALL</a></li>
          <li class="nav-item"><a class="nav-link active" href="creative-writing.html">CREATIVE WRITING</a></li>
          <li class="nav-item"><a class="nav-link" href="journal.html">JOURNAL</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">ABOUT</a></li>
          <li class="nav-item ms-lg-2">
            <a class="nav-link btn btn-outline-success btn-sm px-3 py-1 my-1 my-lg-0 text-success fw-bold" href="creative-writing-hindi-poetry.html" style="border: 1px solid var(--accent); border-radius: 20px; font-size: 12px;">
              <i class="fas fa-feather me-1"></i> हिंदी कविता
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- MAIN POEM WRAPPER -->
  <main class="section-padding py-5">
    <div class="container">
      <div class="poem-reading-wrap">
        
        <!-- BREADCRUMBS -->
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb" style="font-size: 13px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <li class="breadcrumb-item"><a href="index.html" class="text-muted text-decoration-none">Home</a></li>
            <li class="breadcrumb-item"><a href="creative-writing.html" class="text-muted text-decoration-none">Creative Writing</a></li>
            <li class="breadcrumb-item"><a href="creative-writing-hindi-poetry.html" class="text-muted text-decoration-none">Hindi Poetry</a></li>
            <li class="breadcrumb-item active text-primary" aria-current="page">[Poem Title]</li>
          </ol>
        </nav>

        <!-- POEM HEADER -->
        <header class="text-center mb-4">
          <div class="d-inline-flex align-items-center gap-2 mb-3">
            <span class="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill" style="font-size: 11px;">
              <i class="fas fa-feather me-1"></i> [Category: e.g. हिंदी कविता (Hindi Poetry)]
            </span>
          </div>

          <!-- Field 1: Poem Title -->
          <h1 class="poem-title-devanagari">[Poem Title]</h1>
          
          <!-- Field 6 & 7: Author & Publication Date -->
          <div class="poem-meta-bar d-flex justify-content-center align-items-center flex-wrap gap-3 text-muted my-3" style="font-size: 13px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <span><i class="fas fa-user-pen me-1 text-primary"></i> <strong>लेखिका: गुरदीप सिधू (Gurdeep Sidhu)</strong></span>
            <span>&bull;</span>
            <span><i class="far fa-calendar-alt me-1 text-primary"></i> [DD Month YYYY]</span>
            <span>&bull;</span>
            <span><i class="fas fa-clock me-1 text-primary"></i> 4 मिनट पठन</span>
          </div>
        </header>

        <!-- Field 5: Optional English Introduction -->
        <aside class="poem-english-intro">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="fas fa-quote-left text-warning fs-5"></i>
            <strong style="color: var(--primary); font-size: 14px; text-transform: uppercase;">About this Poem (Central Theme)</strong>
          </div>
          <p class="mb-0" style="font-style: italic;">
            [Enter optional English synopsis so international and bilingual readers understand the core emotion.]
          </p>
        </aside>

        <!-- Field 4: Poem Content (Preserves Stanzas, Line Breaks & Devanagari) -->
        <article class="poem-box">
          <div class="poem-body-hindi">

            <div class="poem-stanza">
              <span class="poem-stanza-num">छंद १</span>
              <p>
                [पंक्ति १]<br>
                [पंक्ति २]<br>
                [पंक्ति ३]<br>
                [पंक्ति ४]
              </p>
            </div>

            <div class="poem-stanza">
              <span class="poem-stanza-num">छंद २</span>
              <p>
                [पंक्ति १]<br>
                [पंक्ति २]<br>
                [पंक्ति ३]<br>
                [पंक्ति ४]
              </p>
            </div>

            <!-- Closing Couplet / दोहा -->
            <div class="poem-couplet-closing">
              <p class="mb-0 fs-5">
                [अंतिम दोहा / शेर पंक्ति १]<br>
                [अंतिम दोहा / शेर पंक्ति २]
              </p>
            </div>

          </div>
        </article>

        <!-- Author Bio & Copyright -->
        <footer class="poem-author-card">
          <div class="row align-items-center g-3">
            <div class="col-md-8">
              <h5 class="mb-1" style="font-family: 'Cormorant Garamond', serif; font-size: 22px; color: var(--primary);">
                <i class="fas fa-feather-alt me-2 text-warning"></i> लेखिका: गुरदीप सिधू (Gurdeep Sidhu)
              </h5>
              <p class="text-muted mb-2" style="font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;">
                'सिधू'ज़ व्यूज़' (Sidhu's Views) की संस्थापिका और लेखिका।
              </p>
              <div class="text-muted" style="font-size: 12.5px; font-family: 'Plus Jakarta Sans', sans-serif;">
                <strong>© 2026 गुरदीप सिधू (Gurdeep Sidhu). सर्वाधिकार सुरक्षित (All Rights Reserved).</strong>
              </div>
            </div>
            <div class="col-md-4 text-md-end">
              <a href="creative-writing-hindi-poetry.html" class="btn btn-outline-success btn-sm me-2 mb-2">
                <i class="fas fa-arrow-left me-1"></i> और कविताएँ
              </a>
              <a href="creative-writing.html" class="btn btn-green btn-sm mb-2">
                <i class="fas fa-compass me-1"></i> Creative Writing Hub
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">
            <i class="fas fa-feather-alt"></i> SIDHU'S VIEWS
          </div>
          <p class="footer-desc">A premium personal online magazine and creative space by Gurdeep Sidhu.</p>
        </div>
        <div class="footer-col">
          <h3>Quick Links</h3>
          <a href="index.html"><i class="fas fa-chevron-right"></i> Home</a>
          <a href="creative-writing.html"><i class="fas fa-chevron-right"></i> Creative Writing Hub</a>
          <a href="creative-writing-hindi-poetry.html"><i class="fas fa-chevron-right"></i> Hindi Poetry</a>
          <a href="explore.html"><i class="fas fa-chevron-right"></i> Explore All</a>
          <a href="journal.html"><i class="fas fa-chevron-right"></i> Journal</a>
          <a href="about.html"><i class="fas fa-chevron-right"></i> About</a>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <p><i class="fas fa-envelope"></i> hellosidhusviews.com@gmail.com</p>
          <p><i class="fas fa-map-marker-alt"></i> India</p>
        </div>
      </div>
    </div>
    <hr>
    <p class="copyright">© 2026 <strong>SIDHU'S VIEWS</strong>. All Rights Reserved.</p>
  </footer>

  <!-- SCRIPTS -->
  <button id="darkModeToggle" class="dark-mode-btn" aria-label="Toggle Theme"><i class="fas fa-moon"></i></button>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="script.js?v=2.2.0"></script>
</body>
</html>
```

---

## 3. How to Register & Build Future Poems

1. Create `poem-[slug].html` using the template above.
2. In `creative-writing-hindi-poetry.html`, add a new poem card linking to it.
3. In `articles.json`, register the new page under `staticPages`:
   ```json
   {
     "url": "https://gurdeepsidhu.github.io/sidhu-s-views/poem-[slug].html",
     "file": "poem-[slug].html",
     "title": "[Poem Title] | Sidhu's Views",
     "changefreq": "monthly",
     "priority": "0.8",
     "lastmod": "YYYY-MM-DD",
     "indexable": true
   }
   ```
4. Run:
   ```bash
   python publish.py --build
   ```
   This automatically validates all URLs and canonical tags, generates the new `sitemap.xml`, and updates PWA caching in `sw.js`.
