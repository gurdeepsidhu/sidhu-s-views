#!/usr/bin/env python3
"""
Sidhu's Views - Central Publishing & Validation Automation Engine
==================================================================
Manages the article registry (articles.json), sitemap.xml generation,
RSS feed sync (rss.xml), Service Worker PWA cache (sw.js), and internal link validation.

Usage:
  python publish.py --validate       # Run complete integrity & internal link audit
  python publish.py --build          # Validate and regenerate sitemap.xml, rss.xml, sw.js
  python publish.py --test-live      # Test live HTTP status on deployed GitHub Pages
  python publish.py --help           # Show usage help
"""

import os
import sys
import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime
import urllib.request
import urllib.error

# Ensure clean UTF-8 console output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
REGISTRY_PATH = os.path.join(REPO_ROOT, "articles.json")
SITEMAP_PATH = os.path.join(REPO_ROOT, "sitemap.xml")
RSS_PATH = os.path.join(REPO_ROOT, "rss.xml")
SW_PATH = os.path.join(REPO_ROOT, "sw.js")


def load_registry():
    """Load articles.json single source of truth."""
    if not os.path.exists(REGISTRY_PATH):
        raise FileNotFoundError(f"Registry not found: {REGISTRY_PATH}")
    with open(REGISTRY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_registry_and_files(data):
    """
    Validate registry data integrity, check that all HTML files exist,
    verify self-canonical URLs, robots directives, and verify all internal links.
    """
    errors = []
    warnings = []
    
    site_url = data.get("siteUrl", "").rstrip("/")
    if not site_url.startswith("https://"):
        errors.append(f"siteUrl must be an absolute HTTPS URL, got: {site_url}")

    registered_files = set()
    all_registered_urls = set()

    # 1. Validate static pages
    for page in data.get("staticPages", []):
        f = page.get("file")
        u = page.get("url")
        if not f or not u:
            errors.append(f"Static page missing 'file' or 'url': {page}")
            continue
        if f in registered_files:
            errors.append(f"Duplicate file registered in staticPages: {f}")
        if u in all_registered_urls:
            errors.append(f"Duplicate URL registered in staticPages: {u}")
        registered_files.add(f)
        all_registered_urls.add(u)

        full_path = os.path.join(REPO_ROOT, f)
        if not os.path.isfile(full_path):
            errors.append(f"Registered static file does NOT exist on disk: {f}")

    # 2. Validate articles
    for art in data.get("articles", []):
        f = art.get("file")
        u = art.get("url")
        title = art.get("title")
        pub_date = art.get("publishDate")
        
        if not f or not u or not title or not pub_date:
            errors.append(f"Article missing required fields (file, url, title, publishDate): {art}")
            continue
            
        if f in registered_files:
            errors.append(f"Duplicate file registered in articles: {f}")
        if u in all_registered_urls:
            errors.append(f"Duplicate URL registered in articles: {u}")
        registered_files.add(f)
        all_registered_urls.add(u)

        full_path = os.path.join(REPO_ROOT, f)
        if not os.path.isfile(full_path):
            errors.append(f"Registered article file does NOT exist on disk: {f}")
            continue

        # Inspect HTML file content
        with open(full_path, "r", encoding="utf-8", errors="ignore") as hf:
            content = hf.read()

        # Check canonical URL
        canon_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
        if not canon_match:
            errors.append(f"{f}: Missing <link rel='canonical'> tag")
        elif canon_match.group(1).strip() != u:
            errors.append(f"{f}: Canonical mismatch! File has '{canon_match.group(1).strip()}', registry has '{u}'")

        # Check robots noindex
        robots_match = re.search(r'<meta\s+name=["\']robots["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
        if robots_match and "noindex" in robots_match.group(1).lower():
            if art.get("indexable", True):
                errors.append(f"{f}: Marked indexable in registry, but has 'noindex' in meta robots tag!")

        # Check internal links inside article
        internal_links = re.findall(r'href=["\']([a-zA-Z0-9_\-]+\.html(?:#[a-zA-Z0-9_\-]+)?)["\']', content)
        for link in internal_links:
            target_file = link.split('#')[0]
            if not os.path.isfile(os.path.join(REPO_ROOT, target_file)):
                errors.append(f"{f}: Broken internal link to nonexistent file: {target_file}")
            if target_file == f:
                warnings.append(f"{f}: Contains self-linking anchor: {link}")

    # 3. Check Hub pages (explore.html, index.html) for article links
    explore_path = os.path.join(REPO_ROOT, "explore.html")
    if os.path.isfile(explore_path):
        with open(explore_path, "r", encoding="utf-8", errors="ignore") as ef:
            exp_content = ef.read()
        for art in data.get("articles", []):
            if art.get("file") not in exp_content:
                warnings.append(f"Article '{art.get('file')}' is not linked from explore.html")

    return errors, warnings


def generate_sitemap(data):
    """
    Generate valid XML sitemap conforming strictly to sitemaps.org schema.
    Only includes verified, published, indexable HTML pages.
    """
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    # Add static pages
    for page in data.get("staticPages", []):
        if not page.get("indexable", True):
            continue
        file_path = os.path.join(REPO_ROOT, page["file"])
        if not os.path.isfile(file_path):
            continue
            
        lines.append("  <url>")
        lines.append(f"    <loc>{page['url']}</loc>")
        lines.append(f"    <lastmod>{page.get('lastmod', datetime.now().strftime('%Y-%m-%d'))}</lastmod>")
        lines.append(f"    <changefreq>{page.get('changefreq', 'weekly')}</changefreq>")
        lines.append(f"    <priority>{page.get('priority', '0.8')}</priority>")
        lines.append("  </url>")

    # Add articles (sorted by date descending)
    sorted_articles = sorted(
        data.get("articles", []),
        key=lambda x: x.get("publishDate", ""),
        reverse=True
    )

    for art in sorted_articles:
        if not art.get("indexable", True):
            continue
        file_path = os.path.join(REPO_ROOT, art["file"])
        if not os.path.isfile(file_path):
            continue

        lines.append("  <url>")
        lines.append(f"    <loc>{art['url']}</loc>")
        lines.append(f"    <lastmod>{art.get('lastmod', art.get('publishDate', datetime.now().strftime('%Y-%m-%d')))}</lastmod>")
        lines.append(f"    <changefreq>monthly</changefreq>")
        lines.append(f"    <priority>{art.get('priority', '0.8')}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>\n")
    sitemap_content = "\n".join(lines)

    # Validate XML before writing
    try:
        ET.fromstring(sitemap_content)
    except ET.ParseError as e:
        raise ValueError(f"Generated sitemap has invalid XML syntax: {e}")

    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(sitemap_content)

    print(f"✓ Successfully generated sitemap.xml ({len(data.get('staticPages', [])) + len(sorted_articles)} URLs)")


def update_sw_cache(data):
    """Update urlsToCache in sw.js to ensure all published pages are cached."""
    if not os.path.isfile(SW_PATH):
        return

    with open(SW_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Build cache list
    cache_items = ["./", "index.html", "about.html", "explore.html", "journal.html"]
    for art in data.get("articles", []):
        if art["file"] not in cache_items:
            cache_items.append(art["file"])

    cache_items.extend([
        "images/balcony_chai_details_v2.jpg",
        "style.css",
        "script.js",
        "manifest.json"
    ])

    formatted_items = ",\n".join([f'  "{item}"' for item in cache_items])
    replacement = f"const urlsToCache = [\n{formatted_items}\n];"

    new_content = re.sub(
        r'const urlsToCache = \[\s*[\s\S]*?\s*\];',
        replacement,
        content
    )

    if new_content != content:
        with open(SW_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("✓ Updated sw.js caching list with all registered articles.")


def update_rss(data):
    """Synchronize rss.xml with registered articles."""
    if not os.path.isfile(RSS_PATH):
        return

    sorted_articles = sorted(
        data.get("articles", []),
        key=lambda x: x.get("publishDate", ""),
        reverse=True
    )

    items_xml = []
    for art in sorted_articles:
        img_url = art.get("heroImage", "")
        if not img_url.startswith("http"):
            img_url = f"{data['siteUrl']}/{img_url}"
        
        # Parse date to RFC 822 format (e.g. Wed, 14 Oct 2026 10:00:00 GMT)
        try:
            dt = datetime.strptime(art.get("publishDate", "2026-09-30"), "%Y-%m-%d")
            pub_date_str = dt.strftime("%a, %d %b %Y 10:00:00 GMT")
        except Exception:
            pub_date_str = "Wed, 30 Sep 2026 12:00:00 GMT"

        item = f"""    <item>
      <title>{art['title']}</title>
      <link>{art['url']}</link>
      <description>{art.get('description', '')}</description>
      <pubDate>{pub_date_str}</pubDate>
      <guid>{art['url']}</guid>
      <media:content url="{img_url}" medium="image" />
      <enclosure url="{img_url}" length="500000" type="image/jpeg" />
    </item>"""
        items_xml.append(item)

    rss_body = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Sidhu's Views</title>
    <link>{data['siteUrl']}/</link>
    <description>A curated personal online magazine exploring lifestyle, style, crafting, storytelling, and digital experiments by Gurdeep Sidhu.</description>
    <language>en-us</language>
    <atom:link href="{data['siteUrl']}/rss.xml" rel="self" type="application/rss+xml" />

{os.linesep.join(items_xml)}
  </channel>
</rss>
"""
    with open(RSS_PATH, "w", encoding="utf-8") as f:
        f.write(rss_body)
    print("✓ Successfully synchronized rss.xml feed.")


def test_live_urls(data):
    """Test live HTTP response headers from published GitHub Pages site."""
    print("\n--- Testing Live GitHub Pages Status ---")
    headers = {"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
    
    test_list = [p["url"] for p in data.get("staticPages", [])] + [a["url"] for a in data.get("articles", [])]
    test_list.append(f"{data['siteUrl']}/sitemap.xml")

    results = []
    for u in test_list:
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                results.append((u, resp.status, "OK"))
                print(f"✓ [HTTP {resp.status}] {u}")
        except urllib.error.HTTPError as e:
            results.append((u, e.code, e.reason))
            print(f"✗ [HTTP {e.code}] {u} - {e.reason}")
        except Exception as e:
            results.append((u, "ERR", str(e)))
            print(f"✗ [ERROR] {u} - {e}")

    return results


def main():
    args = sys.argv[1:]
    
    if not args or "--help" in args or "-h" in args:
        print(__doc__)
        return

    data = load_registry()

    if "--validate" in args:
        print("Validating registry, canonical URLs, robots directives, and internal links...")
        errors, warnings = validate_registry_and_files(data)
        
        for w in warnings:
            print(f"⚠ WARNING: {w}")
            
        if errors:
            print("\n❌ VALIDATION FAILED WITH ERRORS:")
            for e in errors:
                print(f"  • {e}")
            sys.exit(1)
        else:
            print(f"✓ All {len(data['staticPages'])} pages and {len(data['articles'])} articles validated successfully with 0 errors!")

    if "--build" in args:
        print("Running build pipeline...")
        errors, warnings = validate_registry_and_files(data)
        if errors:
            print("\n❌ CANNOT BUILD: Validation failed with errors:")
            for e in errors:
                print(f"  • {e}")
            sys.exit(1)

        generate_sitemap(data)
        update_rss(data)
        update_sw_cache(data)
        print("\n🎉 Build completed successfully! Sitemap, RSS, and SW are fully synchronized.")

    if "--test-live" in args:
        test_live_urls(data)


if __name__ == "__main__":
    main()
