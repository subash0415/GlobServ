# GlobServ International Traders LLP — Static Site Specification

## 1. Overview

A single-page static website for GlobServ International Traders LLP, an agricultural export company based in Ranipet, Tamil Nadu, India. Built with **Astro** and **Tailwind CSS**, outputting zero-JavaScript static HTML + CSS.

- **Purpose:** B2B marketing site showcasing products and enabling buyer inquiries
- **Tech Stack:** Astro 4.x + Tailwind CSS 3.x
- **Output:** Static HTML (no client JS except minimal form/scroll handling)
- **Branch:** `static-site-modern`

---

## 2. Directory Structure

```
GlobServ/
├── .gitignore
├── package.json                  # Dependencies and scripts
├── astro.config.mjs              # Astro build config (Tailwind integration, static output)
├── tailwind.config.mjs           # Tailwind theme (fonts, colors, brand tokens)
│
├── src/
│   ├── pages/
│   │   └── index.astro           # Entry point — assembles all components
│   │
│   ├── components/
│   │   ├── Navbar.astro          # Sticky nav with mobile hamburger
│   │   ├── Hero.astro            # Hero section with tagline + stats grid
│   │   ├── About.astro           # Company story section
│   │   ├── Products.astro        # Product catalog grid (6 products)
│   │   ├── Packaging.astro       # Container load table + port logistics
│   │   ├── Process.astro         # 6-step workflow grid
│   │   ├── Certifications.astro  # Compliance registrations list
│   │   ├── Contact.astro         # Inquiry form + contact details
│   │   └── Footer.astro          # Site footer with meta info
│   │
│   ├── styles/
│   │   └── global.css            # Base styles, typography, custom classes
│   │
│   └── env.d.ts                  # Astro type declarations
│
├── public/                       # Static assets (if any)
│
├── build/                        # Committed build output (GitHub Pages source)
│   ├── index.html                # Final static HTML (~33KB)
│   └── assets/
│       └── index.D0x702Rb.css   # Compiled Tailwind CSS
│
└── dist/                         # Astro default build output (gitignored)
```

---

## 3. Design System

### 3.1 Archetype

**Swiss & High-Contrast, Industrial Variation** — clean grid lines, zero border-radius, monospace data labels, generous whitespace. Inspired by Kerry/Naturex/DSM agricultural exporter aesthetics.

### 3.2 Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings (h1–h6) | Chivo | 400–900 | All section titles, product names |
| Body | IBM Plex Sans | 300–700 | Paragraphs, descriptions, UI text |
| Data / Labels | IBM Plex Mono | 400–600 | Eyebrows, spec tables, metadata, origin labels |
| Hero Display | Playfair Display | 400–900 | Hero headline only (serif accent) |

### 3.3 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.accent` | `#166534` | Green accent — CTAs, highlights, icons, links |
| `brand.accent-hover` | `#14532D` | Darker green on hover |
| `brand.accent-muted` | `#DCFCE7` | Light green tint (reserved) |
| `brand.ink` | `#111827` | Primary text — headings, body |
| `brand.ink-2` | `#4B5563` | Secondary text — eyebrows, labels |
| `brand.ink-3` | `#6B7280` | Tertiary text — spec table headers |
| `brand.border` | `#E5E7EB` | Default border — grid lines, dividers |
| `brand.border-dark` | `#D1D5DB` | Active/focus borders |
| `brand.bg` | `#FFFFFF` | Page background |
| `brand.bg-2` | `#F9FAFB` | Spec table header background |
| `brand.bg-3` | `#F3F4F6` | Muted section backgrounds (Process, Contact) |

### 3.4 Custom CSS Classes

| Class | Description |
|-------|-------------|
| `.eyebrow` | 11px IBM Plex Mono, uppercase, 0.2em tracking, gray-500 |
| `.link-underline` | Animated underline on hover (scaleX transition) |
| `.spec-table` | Data table with monospace headers, left-aligned cells |
| `.grid-cell` | Bordered grid cell (right + bottom border) |

### 3.5 Design Principles

- **Zero border-radius** — all elements are sharp-edged rectangles
- **No shadows** — flat cards with 1px borders only
- **Grid-exposed borders** — product/process grids show visible grid lines
- **Monospace for data** — all technical specs, labels, metadata in IBM Plex Mono
- **Green accent sparingly** — used only for highlights, icons, CTAs
- **Text selection** — green background (`#166534`), white text

---

## 4. Page Sections & Content

### 4.1 Navbar

- **Position:** Sticky top, z-50
- **Height:** 160px (mobile), 192px (lg)
- **Left:** GlobServ logo (external image) + company name + "Traders LLP" subtitle
- **Right (desktop):** About, Products, Process, Certifications, Contact links + "Request Quote" button (green-800)
- **Mobile:** Hamburger menu toggles dropdown with same links
- **Behavior:** Border darkens on scroll (gray-200 → gray-300)

### 4.2 Hero

- **Layout:** 7/5 column grid on desktop
- **Left column:**
  - Eyebrow: "Ranipet, Tamil Nadu · India"
  - Headline: "Quality from South India, *delivered globally*" (Playfair Display, italic green accent)
  - Body paragraph: Company description (~80 words)
  - Two CTAs: "Explore Products" (solid dark) + "Request A Quote" (outlined)
- **Right column:**
  - Stats grid (2×2): Est. April 2026, Entity LLP, Model B2B/Bulk, Origin Tamil Nadu
  - Address card: Registered address + LLPIN (ACX-1145) + GSTIN (33ABEFG5227A1Z0)

### 4.3 About

- **Layout:** 4/8 column grid
- **Left:** Eyebrow "Who We Are" + headline "Two Friends / One Idea / *A Shared Dream*"
- **Right:** Three paragraphs (~180 words total) — company origin story, Tamil Nadu roots, product commitment

### 4.4 Products

- **Layout:** 3-column grid with exposed borders (border-l + border-t on container)
- **Section header:** Eyebrow "Our Catalog" + headline with green accent
- **6 product cards** (each a grid-cell):

| # | Name | Category | Origin | Image Source |
|---|------|----------|--------|--------------|
| 1 | Spirulina | Core Export | Tamil Nadu, India | Pexels |
| 2 | Aloe Vera | Core Export | Tamil Nadu, India | Pexels |
| 3 | Khus (Vetiver) Roots | Core Export | South India | Emergent assets |
| 4 | Basmati 1121 Rice | Optional | North India | Emergent assets |
| 5 | Chilli | Optional | South India | Unsplash |
| 6 | Turmeric | Optional | Erode, Tamil Nadu | Pexels |

- **Card structure:**
  - 4:3 aspect ratio image
  - Category badge (eyebrow) + origin (mono, right-aligned)
  - Product name (h3, bold)
  - Description paragraph

### 4.5 Packaging & Export Capabilities

- **Layout:** 5/7 column grid
- **Left:** Eyebrow "Export Capabilities" + headline + description + container ship image
- **Right:**
  - **Container Load Reference table** (spec-table):

| Product | 20' FCL | 40' HC | Package |
|---------|---------|--------|---------|
| Spirulina Powder | ~15 MT | ~22 MT | 25 kg drums |
| Aloe Vera Powder | ~10 MT | ~18 MT | 25 kg fibre drums |
| Vetiver Roots | ~5 MT | ~8–10 MT | 25/50 kg bales |
| Basmati 1121 | ~25–26 MT | ~28 MT | PP/Jute 5–50 kg |
| Chilli (dry) | ~14 MT | ~24 MT | 25 kg PP + liner |
| Turmeric | ~18 MT | ~26 MT | 25/50 kg PP |

  - **Port logistics grid** (3×2): Primary Port, Alternate, Airport, Incoterms, Payment, Lead Time

### 4.6 Process

- **Background:** Gray-50
- **Layout:** Header (left headline + right description) → 3×2 grid of step cards
- **6 steps:**

| # | Title | Description |
|---|-------|-------------|
| 01 | Enquiry | Share your product, quantity, grade and destination port |
| 02 | Sample & Quote | We send samples for approval and a formal FOB/CIF quote |
| 03 | Confirmation | Order confirmed with agreed Incoterms, payment and advance |
| 04 | Sourcing & Packing | Procurement, grading, cleaning and packing to specification |
| 05 | QC & Documentation | Third-party QC where applicable plus full export paperwork |
| 06 | Shipping | Dispatch by sea or air freight to your nominated port |

- **Card style:** Green mono number + horizontal rule + bold title + description

### 4.7 Certifications

- **Section header:** Eyebrow "Compliance" + headline "Registrations & Compliance"
- **Layout:** 4-column grid of icon + label pairs
- **8 items:**
  - LLP Registration
  - GST Registration
  - Import Export Code (IEC)
  - FSSAI License
  - APEDA Registration
  - RCMC Registration
  - Letter of Undertaking (LUT)
  - ICEGATE Registration
- **Icons:** Inline SVG, green-800, 24×24, stroke-width 1.25
- **Footer note:** "Supporting business and regulatory documentation can be provided to qualified buyers upon request during the due diligence process."

### 4.8 Contact

- **Background:** Gray-50
- **Layout:** 5/7 column grid
- **Left column:**
  - Eyebrow "Request A Quote" + headline "Let's do *business* together."
  - Description paragraph
  - Contact details (4 rows): Registered Address, WhatsApp/Phone, Email, Entity
  - WhatsApp CTA button (links to wa.me with pre-filled message)
- **Right column:**
  - **Inquiry form** (white card, border):
    - Fields: Name*, Company, Email*, Phone, Product (select), Order Type (select), Requirements* (textarea)
    - Submit button: "Send Enquiry" (green-800)
    - Form submits via `mailto:` to globservinternational@gmail.com
  - **Product options:** Spirulina, Aloe Vera, Khus (Vetiver) Roots, Basmati 1121 Rice, Chilli, Turmeric, Other/Multiple
  - **Order types:** Export/International, Domestic Wholesale, Retail/Small Qty, Sample Request

### 4.9 Footer

- **Background:** Gray-900 (dark)
- **Layout:** 4-column grid
- **Column 1–2 (span 2):** Company name + "Traders LLP" subtitle + description paragraph
- **Column 3:** Product links (Spirulina, Aloe Vera, Vetiver Roots, Basmati 1121, Chilli · Turmeric)
- **Column 4:** Contact info (address, phone, email)
- **Bottom meta grid:** LLPIN, GSTIN, PAN, Founded — all in mono
- **Copyright:** "© 2026 GlobServ International Traders LLP. All rights reserved."

---

## 5. Build & Deploy

### Commands

```bash
npm install        # Install dependencies
npm run dev        # Local dev server (http://localhost:4321)
npm run build      # Static build → dist/
npm run preview    # Preview production build
```

### GitHub Pages Deployment

1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `static-site-modern`, folder: `/build`
4. Site will be available at `https://subash0415.github.io/GlobServ/`

### Output

| File | Size |
|------|------|
| `build/index.html` | ~33KB |
| `build/assets/index.*.css` | ~8KB (Tailwind, purged) |
| **Total** | **~41KB** |

Zero JavaScript in the final output (only inline scroll/form handlers in HTML).

---

## 6. Key Data

### Company Info

| Field | Value |
|-------|-------|
| Name | GlobServ International Traders LLP |
| Entity | LLP |
| Est. | April 2026 |
| Model | B2B / Bulk |
| Origin | Tamil Nadu, India |
| Address | No.171/2C1A, Abdullapuram, Ranipet, Tamil Nadu — 631102 |
| LLPIN | ACX-1145 |
| GSTIN | 33ABEFG5227A1Z0 |
| PAN | ABEFG5227A |
| Phone | +91 95852 18525 |
| Email | globservinternational@gmail.com |
| Primary Port | Chennai (INMAA) |
| Alternate Port | Tuticorin (INTUT) |
| Airport | Chennai (MAA) |
| Incoterms | FOB · CIF · CFR |
| Payment | 30% Advance / TT |
| Lead Time | 15 – 30 Days |
