# GlobServ International Traders LLP — B2B Export Website (PRD)

## Original Problem Statement
Build a professional B2B export website for an Indian agricultural exporter specializing in Spirulina, Aloe Vera, and Vetiver roots. Design should resemble industrial manufacturers and ingredient suppliers (not startups/consumer brands): clean white background, minimal animations, professional typography, real product photography, technical spec tables, certifications, packaging info, export capabilities, inquiry forms. Avoid emojis, particles, glassmorphism, floating cards, playful animations.

## Architecture
- **Backend**: FastAPI (`/app/backend/server.py`), MongoDB via motor. Bcrypt + JWT (HS256, 12 h) auth with httpOnly `access_token` cookie. Admin seeded on startup from `.env`.
- **Frontend**: React 19 + React Router + Tailwind + shadcn-style tokens (radius 0). Chivo (headings) + IBM Plex Sans (body) + IBM Plex Mono (data). Sonner toasts.
- **Routes**: `/` (public site), `/admin` (login + dashboard).

## User Personas
- **Overseas Importer** — browses products, reads specs, submits inquiry.
- **Domestic Wholesaler** — same flow with Domestic Wholesale order type.
- **Admin (founders)** — signs in at `/admin`, reviews inquiries, updates business settings.

## Core Requirements (static)
- Sections: Hero, About + Founders, Products catalog with technical spec tables, Process (6 steps), Packaging & Export Capabilities, Certifications & Compliance, Inquiry form, Contact + Footer.
- Public API: `/api/products`, `/api/settings`, `POST /api/inquiries`.
- Auth: `/api/auth/login|logout|me`.
- Admin API: `/api/admin/inquiries` (GET/DELETE), `/api/admin/products` (POST/PUT/DELETE), `/api/admin/settings` (PUT).

## Implemented — 2026-12
- Backend FastAPI with bcrypt/JWT auth, httpOnly cookies, MongoDB seed (admin + 6 default products with full spec sheets + container-load data).
- Full public site: navbar, hero (with metadata grid), about/founders, product catalog with filterable tabs (All/Core/Optional) and click-through technical datasheet panel (specs table + packaging list), 6-step process grid, packaging & export capabilities (container load reference table + ports/incoterms grid), 8-cell certifications grid (LLPIN/GSTIN/PAN/IEC/FSSAI/APEDA/LUT/ICEGATE), inquiry form (with product pre-fill from cards + WhatsApp link), professional dark footer with reg details.
- Admin dashboard: login → tabs (Inquiries with delete/clear-all, Products list, Settings edit form).
- Real product photography (Pexels/Unsplash) — no emojis, no glassmorphism.
- Testing agent iteration 1: backend 100%, frontend 100%.

## Backlog (P0/P1/P2)
- **P1** — Product edit UI in admin (currently list-only; POST/PUT/DELETE APIs already exist).
- **P1** — Resend email notifications (skipped by user; playbook ready).
- **P2** — Individual product detail pages with SEO-friendly slugs (`/products/spirulina`).
- **P2** — Multi-language support (buyer regions).
- **P2** — File uploads (spec sheet PDFs, COAs) in admin.
- **P2** — CSV export of inquiries.

## Next Tasks
1. Confirm live-site functionality with the client.
2. Add real IEC / FSSAI / APEDA numbers when issued and update seeded products if further variety-level SKUs needed.
3. Optional: wire up Resend for admin email notifications.
