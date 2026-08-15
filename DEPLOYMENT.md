# Deployment Guide for Sidhu's Views

This document contains instructions for deploying the **Sidhu's Views** website to permanent public hosting.

---

## 📋 Pre-Deployment Checklist

### 1. Verify Deployment Suitability
* **Static Assets:** The website is built entirely of standard static assets (HTML5, CSS3, Vanilla JS, JSON, and PNG).
* **No Server-Side Code:** No databases or backends are required.
* **Relative Links:** All internal links use relative paths (e.g. `index.html`, `about.html`) and will work out of the box when deployed under any path or subdomain.
* **Local Reference Check:** All references to local Windows paths (`C:/Users/HP/...` or `file://` URLs) have been verified to be completely absent from the codebase.
* **Medical Assets Cleaned:** All unused assets and surgeon/doctor images from previous iterations have been purged from the `images/` directory.

### 2. Files and Folders to Deploy (Upload)
To publish the website, upload only the following files/folders from the project root:

* 📁 `images/`
  * `happy-family.png` *(The only required image asset)*
* 📄 `about.html`
* 📄 `contact.html`
* 📄 `create.html`
* 📄 `explore.html`
* 📄 `index.html`
* 📄 `journal.html`
* 📄 `journey.html`
* 📄 `manifest.json`
* 📄 `robots.txt`
* 📄 `script.js`
* 📄 `sitemap.xml`
* 📄 `style.css`
* 📄 `sw.js`

### 3. Files and Folders to EXCLUDE
Do **NOT** upload the following folders and files to public hosting:
* 📁 `.git/` *(Version control repository)*
* 📁 `backup_iteration2/` *(Local backup folder)*
* 📁 `backup_original/` *(Local backup folder)*
* 📄 `.gitignore`
* 📄 `DEPLOYMENT.md` *(This file)*

---

## 🚀 Deployment Instructions

### Option A: GitHub Pages (Recommended)
Since the `sitemap.xml` and `robots.txt` files are already pre-configured for the custom URL `https://gurdeepsidhu.github.io/sidhus-views/`, deploying to GitHub Pages is extremely straightforward:
1. Initialize a Git repository in the project folder (if not already done).
2. Commit all the deployable files.
3. Push to a repository named `sidhus-views` on your GitHub account `gurdeepsidhu`.
4. Go to the repository **Settings** > **Pages**.
5. Select the deployment branch (e.g. `main` or `master`) and directory (root `/`), then click **Save**.
6. The website will be live in a few minutes at `https://gurdeepsidhu.github.io/sidhus-views/`.

### Option B: Netlify or Vercel
1. Go to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Drag and drop the workspace folder containing the files listed in Section 2 above directly into the deploy area.
3. Or import the GitHub repository, set build command to empty/none, and publish directory to `.` (root).

### Option C: Traditional Web Hosting (cPanel / FTP)
1. Log in to your hosting server via FTP or cPanel File Manager.
2. Navigate to your target public directory (usually `public_html` or a custom subdomain folder).
3. Upload all the deployable files listed in Section 2.
