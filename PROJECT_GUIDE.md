# DM Keepsies Website — Complete Project Guide

A full reference for building, managing, and deploying a static business website using HTML/CSS/JS, GitHub, and Vercel. Use this as a repeatable template for future projects.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tools & Technologies Used](#2-tools--technologies-used)
3. [Phase 1 — Project Setup & Landing Page](#3-phase-1--project-setup--landing-page)
4. [Phase 2 — Local Development Environment](#4-phase-2--local-development-environment)
5. [Phase 3 — GitHub Setup & Version Control](#5-phase-3--github-setup--version-control)
6. [Phase 4 — Website Pages & Features](#6-phase-4--website-pages--features)
7. [Phase 5 — Contact Form (Formspree)](#7-phase-5--contact-form-formspree)
8. [Phase 6 — Deploying to Vercel (Next Step)](#8-phase-6--deploying-to-vercel-next-step)
9. [All Prompts Used (Optimized)](#9-all-prompts-used-optimized)
10. [Daily Workflow Reference](#10-daily-workflow-reference)
11. [File Structure](#11-file-structure)
12. [Best Practices & Notes](#12-best-practices--notes)

---

## 1. Project Overview

**Business:** DM Keepsies
**Type:** Static business landing website
**Purpose:** Showcase personalized keepsakes for weddings, baptisms, birthdays, and celebrations
**Owner:** May Ann Acorda, Davao, Philippines

**Pages built:**
| Page | File | Purpose |
|---|---|---|
| Homepage | `index.html` | Main landing page |
| About | `about.html` | Owner profile & story |
| Contact Us | `contact.html` | Contact form via Formspree |

**GitHub Repository:** https://github.com/jesusnuez22222/DM-Keepsies---Website

---

## 2. Tools & Technologies Used

| Tool | Purpose |
|---|---|
| **VS Code** | Code editor |
| **HTML / CSS / JavaScript** | Website language (no framework needed) |
| **Node.js + npm** | Run local server and scripts |
| **serve.mjs** | Custom local development server |
| **Puppeteer** | Automated screenshots of the website |
| **Git** | Version control (track all changes) |
| **GitHub** | Cloud storage for your code |
| **GitHub CLI (gh)** | Manage GitHub from the terminal |
| **Formspree** | Handles contact form email delivery |
| **Vercel** | (Next step) Deploy site to live domain |
| **Google Fonts** | Montserrat + Dancing Script typography |

---

## 3. Phase 1 — Project Setup & Landing Page

### Step 1.1 — Prepare Brand Assets

Place all brand files in a `brand_assets/` folder inside your project:
- Business logo (PNG or JPG)
- Brand guidelines image (colors, fonts, style)

### Step 1.2 — Build the Landing Page

**Prompt used:**
```
Build me a modern and professional landing page for [BUSINESS NAME], 
a business that sells [PRODUCT/SERVICE] for [TARGET OCCASIONS/AUDIENCE].

Here is my logo: @brand_assets/[logo-filename]
Here are my brand guidelines: @brand_assets/[guidelines-filename]

The page should include the following sections:
- Navigation bar with logo and links
- Hero section with headline, subtitle, CTA buttons, and trust stats
- Events/Services section showing what occasions you cater to
- About section introducing the business
- Products/Collections section
- How It Works (3-step process)
- Testimonials/Reviews section
- Call-to-Action banner
- Contact strip with social media and email
- Footer with links and copyright

Match the brand colors, fonts, and aesthetic from the brand guidelines provided.
Make it fully responsive for mobile and desktop.
```

**What gets created:** A complete single-file `index.html` with all CSS and JavaScript included.

**Key design decisions made:**
- Brand colors extracted from guidelines: Rose `#C4526B`, Soft Pink `#F2A8BB`, Blush `#FDE8F0`
- Fonts: Montserrat (body/headings) + Dancing Script (script accents) from Google Fonts
- Scroll-reveal animations on all sections
- Sticky navigation with blur effect
- Fully responsive mobile layout

---

## 4. Phase 2 — Local Development Environment

### Step 2.1 — Create the Project Files

**Prompt used:**
```
Set up a local development environment for this project. Create the following files:
- package.json with "start" and "screenshot" scripts
- serve.mjs — a Node.js local server on port 8080
- screenshot.mjs — a Puppeteer script that takes full-page and section screenshots
- A "temporary screenshots" folder

The screenshot script should capture:
1. full-desktop.png (full page at 1440px)
2. full-mobile.png (full page at 390px)
3. screenshot-01-viewport.png through screenshot-10-[section].png
   for each section: viewport, hero, events, about, products, 
   how-it-works, testimonials, cta, contact, footer
```

**Install dependencies:**
```bash
npm install
```

> **Note:** If Puppeteer fails to find Chrome, point it to your system Chrome installation:
> ```js
> executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
> ```

### Step 2.2 — Start the Local Server

```bash
npm start
```

Then open: **http://localhost:8080**

### Step 2.3 — Take Screenshots

```bash
npm run screenshot
```

Screenshots are saved to `temporary screenshots/` and can be tagged with `@` in VS Code to share with Claude for feedback.

> **Important:** Run `npm run screenshot` every time you want fresh screenshots after making changes.

> **Port conflict fix:** If port 8080 is in use, change the `PORT` value in `serve.mjs` to another number (e.g. 4000).

---

## 5. Phase 3 — GitHub Setup & Version Control

### Step 3.1 — Install GitHub CLI

Run in terminal (Windows):
```bash
winget install --id GitHub.cli --silent --accept-package-agreements --accept-source-agreements
```

### Step 3.2 — Log In to GitHub

Run this in your terminal and follow the prompts (opens browser):
```bash
gh auth login
```
Choose: **GitHub.com → HTTPS → Login with a web browser**

### Step 3.3 — Create .gitignore

Create a `.gitignore` file to exclude files that shouldn't be pushed:
```
node_modules/
nul
.env
```

> **Note:** Do NOT add `temporary screenshots/` to .gitignore if you want to tag screenshots using `@` in VS Code.

### Step 3.4 — Initialize Git & Make First Commit

```bash
git init
git config user.email "your@email.com"
git config user.name "Your Name"
git add index.html serve.mjs screenshot.mjs package.json package-lock.json .gitignore brand_assets/
git commit -m "Initial commit — [Project Name] landing page"
```

### Step 3.5 — Create GitHub Repository

1. Go to **github.com** and log in
2. Click **"+"** → **"New repository"**
3. Name it (e.g. `DM-Keepsies---Website`)
4. Set to **Public**
5. Do NOT initialize with README (you already have files)
6. Click **Create repository**

### Step 3.6 — Connect & Push

Copy the repository URL from GitHub, then run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 3.7 — Pushing Future Changes

Every time you want to save changes to GitHub:
```bash
git add [filename]
git commit -m "Short description of what you changed"
git push origin main
```

Or ask Claude: *"Push these changes to GitHub"* and it will handle it.

---

## 6. Phase 4 — Website Pages & Features

### Step 4.1 — Fix the Footer Logo

**Problem:** Logo appeared as a blank white box due to a bad CSS filter.
**Fix:** Remove `filter: brightness(0) invert(1)` and add a white background with padding instead.

**Prompt used:**
```
The footer logo is showing as a blank white box. 
Fix it so the actual DM Keepsies logo is visible in the footer 
against the dark background. Use a white rounded container with padding instead of a CSS filter.
```

### Step 4.2 — Adjust Navigation Logo Size

**Prompt used:**
```
The navigation logo looks too small. Make it bigger — increase the logo height 
and expand the nav bar height to match. Also update the hero section padding-top 
to account for the taller nav.
```

### Step 4.3 — Update the About Section with Owner Profile

**Prompt used:**
```
In the About section, include her photo and her full name ([FULL NAME]). 
She is the proud owner of this business. She is [AGE] years old and based in [LOCATION]. 

Add a short, warm, and professional introduction that highlights her role as a 
business owner and her passion for her work. 

The photo should fill a portrait card with:
- A gradient overlay at the bottom showing her name and role
- A floating badge showing "500+ Happy Clients"
- A location pill showing her city and country

Make the section clean, engaging, and visually appealing.
Use this photo: @brand_assets/[photo-filename]

Show me the result on localhost before pushing to GitHub.
```

### Step 4.4 — Create a Dedicated About Page

**Prompt used:**
```
Remove the About section from the homepage and create a separate about.html page instead.

When users click "About" in the navigation menu, they should go to about.html.

The About page should include:
- Same navigation as other pages (with "About" marked as active)
- A full-width page hero with the owner's photo and a headline
- The existing bio content and value pills
- A "My Values" section with 4 cards
- The CTA section
- Same footer

On about.html, all nav links should point back to the homepage correctly 
(e.g. index.html#products, index.html#how).

Keep all existing content, photos, and design quality. 
Show me the result on localhost before pushing.
```

### Step 4.5 — Create a Contact Us Page

**Prompt used:**
```
Create a dedicated contact.html page with a clean, modern design matching the rest of the website.

Include:
1. Same navigation bar (with "Contact Us" marked as active)
2. A page hero section with headline and subtitle:
   "Have questions about our products? Get in touch with us, 
   and we'll respond as soon as possible."
3. A two-column layout:
   LEFT: Contact info card with Facebook link, email, location, 
         and a "quick response time" badge
   RIGHT: Contact form with these fields:
     - Name (required)
     - Email (required)  
     - Subject (dropdown: Wedding, Baptism, Birthday, Anniversary, Other, General Inquiry)
     - Message textarea (required)
     - Submit button
4. Success message shown after form is submitted
5. Formspree integration (placeholder action URL for now)
6. Same footer as other pages

Use Formspree to handle form submissions — no backend needed.
```

---

## 7. Phase 5 — Contact Form (Formspree)

Formspree is a free service that receives your contact form submissions and forwards them to your email. No coding backend required.

### Step 7.1 — Sign Up for Formspree

1. Go to **https://formspree.io**
2. Click **Sign Up** (free account)
3. Verify your email

### Step 7.2 — Create a New Form

1. Click **"+ New Form"**
2. Name it (e.g. `DM Keepsies Contact`)
3. Set the destination email to your business email
4. Click **Create Form**
5. Copy the Form ID from the endpoint URL:
   ```
   https://formspree.io/f/XXXXXXXX  ← this part is your Form ID
   ```

### Step 7.3 — Connect to Your Website

Give Claude your Form ID:
```
My Formspree form ID is [YOUR-FORM-ID]. 
Please update contact.html with this ID and push to GitHub.
```

> **Free tier limit:** 50 submissions/month. Upgrade if needed.

---

## 8. Phase 6 — Deploying to Vercel (Next Step)

> This phase was not completed during this project but is the next step to make the site live on a custom domain.

### Step 8.1 — Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **Sign Up** → choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

### Step 8.2 — Import Your GitHub Repository

1. In Vercel dashboard, click **"Add New Project"**
2. Find your repository (e.g. `DM-Keepsies---Website`) and click **Import**
3. Leave all settings as default (it's a static HTML site — no framework needed)
4. Click **Deploy**

Vercel will give you a free URL like `dm-keepsies-website.vercel.app` within seconds.

### Step 8.3 — Connect Your Custom Domain

1. In your Vercel project, go to **Settings → Domains**
2. Type in your custom domain (e.g. `dmkeepsies.com`)
3. Vercel will show you DNS records to add
4. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add the DNS records Vercel provides
6. Wait 10–30 minutes for DNS to propagate

### Step 8.4 — Auto-Deploy on Push

Once connected, every time you push to GitHub:
```bash
git push origin main
```
Vercel automatically detects the change and re-deploys your live site within ~30 seconds. No manual action needed.

---

## 9. All Prompts Used (Optimized)

### Build Initial Landing Page
```
Build me a modern and professional landing page for [BUSINESS NAME], 
a business that sells [PRODUCT] for [OCCASIONS/AUDIENCE].

Logo: @brand_assets/[logo-file]
Brand guidelines: @brand_assets/[guidelines-file]

Sections needed:
- Sticky navigation with logo and links
- Hero with headline, subtitle, CTA buttons, and 3 trust stats
- Events/Services section (4 cards)
- About section
- Products/Collections section (6 cards, "Contact Us for pricing")
- How It Works (3 steps)
- Testimonials (3 reviews)
- CTA banner with Facebook and Email buttons
- Contact strip (Facebook, Instagram, Email)
- Footer (logo, description, Occasions links, Quick Links, copyright)

Brand: [PRIMARY COLOR], [SECONDARY COLOR], [FONT NAME]
Make it fully responsive for mobile, tablet, and desktop.
Use scroll-reveal animations and smooth hover effects.
```

### Set Up Local Dev Environment
```
Set up a local development environment for this project.
Create package.json with start and screenshot scripts,
serve.mjs as a Node.js local server on port 8080,
and screenshot.mjs using Puppeteer to capture full-page and 
per-section screenshots (01-viewport through 10-footer).
Point Puppeteer to system Chrome at:
C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
```

### Add Owner Profile to About Section
```
Update the About section to feature the business owner.

Owner details:
- Name: [FULL NAME]
- Age: [AGE]
- Location: [CITY, COUNTRY]
- Role: Founder & Owner of [BUSINESS NAME]

Use this photo: @brand_assets/[photo-file]

Design the photo card with:
- Portrait photo filling the card
- Gradient overlay at the bottom with name and role
- Floating stats badge (top-right corner)
- Location pill badge

Write a warm and professional 3-paragraph bio covering:
1. Who she is and her background
2. Her belief/philosophy about the work
3. What she offers clients

Show me the result on localhost first. Do not push to GitHub until I approve.
```

### Create a Dedicated About Page
```
Move the About section from the homepage to a new about.html page.

Requirements:
- Remove About section from index.html
- Update all "About" nav and footer links to point to about.html
- about.html must have the same nav and footer as other pages
- Mark "About" as active in the nav on about.html
- All nav links on about.html should link back to the homepage 
  (e.g. index.html#products, not just #products)
- Add a page hero section at the top
- Include all existing content (photo, bio, pills)
- Add a "My Values" section with 4 cards
- Include the CTA section and footer

Show me the result on localhost first. Do not push until I approve.
```

### Create Contact Us Page
```
Create a contact.html page matching the existing site design.

Include:
- Same nav (Contact Us marked as active)
- Page hero with intro text:
  "Have questions about our products? Get in touch with us, 
   and we'll respond as soon as possible."
- Two-column layout:
  Left column: Contact info (Facebook, Email, Location, response time badge)
  Right column: Contact form with Name, Email, Subject (dropdown), Message, Submit button
- Subject dropdown options: Wedding, Baptism, Birthday, Anniversary, Other, General Inquiry
- Success message displayed after successful form submission
- Formspree integration (use placeholder ID — I will provide the real one)
- Same footer as other pages
```

### Update a Link or Text
```
Update the [Facebook button / email address / nav link] in 
[index.html / about.html / contact.html / all pages] to:
[NEW VALUE]

Push to GitHub after making the change.
```

### Create a New Page
```
Create a new [PAGE NAME] page (filename: [page.html]) 
that matches the design of the existing pages.

Include:
- Same navigation bar ([PAGE NAME] marked as active)
- [PAGE CONTENT DESCRIPTION]
- Same footer

Ensure all links on this page point correctly back to other pages.
Show me on localhost before pushing to GitHub.
```

### Push to GitHub
```
Push all current changes to GitHub with a commit message describing:
[WHAT WAS CHANGED AND WHY]
```

---

## 10. Daily Workflow Reference

### Starting a Work Session
```bash
# 1. Open your project folder in VS Code

# 2. Start the local server
npm start

# 3. Open browser to preview
# http://localhost:8080
```

### Making Changes
1. Edit files in VS Code
2. Save — browser refreshes automatically
3. Run `npm run screenshot` to update screenshots
4. Review screenshots by tagging them with `@` in Claude

### Saving to GitHub
```bash
git add [filename(s)]
git commit -m "Short description of change"
git push origin main
```

Or just tell Claude: *"Push these changes to GitHub"*

### Ending a Session
Everything is saved automatically to your local files and GitHub. Just close VS Code — no extra steps needed.

---

## 11. File Structure

```
Website Building Project/
│
├── brand_assets/              # All logo and brand images
│   ├── [logo].jpg
│   └── [brand-guidelines].png
│
├── temporary screenshots/     # Auto-generated by screenshot.mjs
│   ├── full-desktop.png
│   ├── full-mobile.png
│   ├── screenshot-01-viewport.png
│   └── screenshot-02 through 10...
│
├── node_modules/              # Installed packages (never edit manually)
│
├── index.html                 # Homepage
├── about.html                 # About page
├── contact.html               # Contact Us page
│
├── serve.mjs                  # Local development server
├── screenshot.mjs             # Automated screenshot tool
│
├── package.json               # Project config and npm scripts
├── package-lock.json          # Dependency lock file (auto-generated)
├── .gitignore                 # Files excluded from GitHub
└── PROJECT_GUIDE.md           # This document
```

---

## 12. Best Practices & Notes

### General
- **Always preview on localhost before pushing to GitHub.** Tell Claude: *"Show me on localhost first, don't push until I approve."*
- **Commit often.** Each logical change (fix a link, add a section, update copy) should be its own commit.
- **Keep brand assets in `brand_assets/`.** Never reference images from outside this folder.

### Design
- **Screenshot tagging:** Run `npm run screenshot` after every batch of changes, then tag screenshots with `@` when asking Claude for updates — it helps Claude see exactly what needs fixing.
- **Fonts:** Always use Google Fonts. Load them in the `<head>` before your CSS.
- **Consistency:** All pages (index, about, contact) must share the same nav, footer, color variables, and font stack.

### Links
- On `index.html`, internal section links use `#section-id` (e.g. `#events`, `#products`)
- On `about.html` and `contact.html`, links back to the homepage use `index.html#section-id`
- External links (Facebook, email) always use `target="_blank" rel="noopener"`

### GitHub
- **Never commit `node_modules/`** — it's in `.gitignore` for a reason. It can be recreated anytime with `npm install`.
- **Commit messages** should be short and describe *what changed*, e.g. `"Add Contact Us page"` not `"changes"`.
- If you ever get a port conflict error when running `npm start`, change the `PORT` value in `serve.mjs`.

### Formspree
- Free tier: **50 submissions/month**
- To change the email that receives submissions, log into formspree.io and update the form settings — no code change needed.
- Test the form after connecting your Form ID to make sure emails are arriving.

### Vercel (when you deploy)
- Every `git push origin main` automatically redeploys the live site — no manual action needed.
- DNS changes can take up to 48 hours to propagate globally (usually much faster).
- Vercel's free tier is more than enough for a business landing site.

---

*Guide created for DM Keepsies Website Project · June 2026*
