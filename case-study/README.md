# Lüpük — Case Study & Behance Package

This folder contains the standalone Behance-ready case study outputs for **Lüpük** (concept/demo project), generated directly from the working storefront codebase without modifying the main project.

## Folder Structure
- `Lupuk-Case-Study-EN.pdf` — 22-page English PDF (`1400×875 px` / tall screen spreads, embedded local `@fontsource` fonts).
- `Lupuk-Case-Study-TR.pdf` — 22-page Turkish PDF (matching structure and page count).
- `behance/cover-1616x1264.jpg` — 2× retina Behance project cover (`1616×1264 px`).
- `behance/en/01.jpg` … `22.jpg` — 2800 px wide JPEGs (`deviceScaleFactor: 2`) for Behance modules.
- `behance/tr/01.jpg` … `22.jpg` — 2800 px wide Turkish JPEGs.
- `behance/project-info.md` — Titles, short/full descriptions (EN+TR), tags, Creative Fields, AI disclosure note, and copy-paste credits.
- `source/` — Self-contained HTML/CSS builder (`build.mjs`, `render-pages.mjs`, `styles.css`, `copy.en.json`, `copy.tr.json`, `shots/`, `package.json`).

## How to Reproduce
```bash
cd case-study/source
npm install
node build.mjs
```
`build.mjs` starts the Vite dev server (`localhost:4179`), captures fresh desktop (`1440×900`), mobile (`390×844` @2x), and isolated component screenshots with Playwright, renders the EN and TR HTML decks with locally embedded `@fontsource` WOFF2 fonts, exports both PDFs (`printBackground`, `tagged`, `outline`), exports all 22×2 JPEGs at `2800 px` width, and generates the `1616×1264` cover.

## Behance Upload Order
1. Upload `behance/cover-1616x1264.jpg` as the **Project Cover**.
2. Upload `behance/en/01.jpg` through `22.jpg` in numeric order (or `behance/tr/01.jpg` … `22.jpg` for Turkish).
3. Copy title, short description, full description, tags, and Creative Fields (`Branding`, `UI/UX`, `Graphic Design`) from `behance/project-info.md`.
4. Check **"Contains AI-generated content"** in Behance project settings (8 product images and the workflow were AI-assisted).

## Owner Placeholders to Fill Before Publishing
- **Page 01 (Cover):** `[Role — To be filled by owner]` and `[Year]` in `source/copy.en.json` / `copy.tr.json`.
- **Page 19 (Process):** `[Optional page — Owner decides whether to keep]` (remove from `render-pages.mjs` if you prefer to omit the process spread).
- **Page 22 (Closing):** `[Email / Portfolio URL — To be filled by owner]`.

## Skills Used & Skipped
- **Used:** Local Playwright (`playwright-core` + local Chromium) + `@fontsource` (`baloo-2`, `plus-jakarta-sans`, `fraunces`, `jetbrains-mono`) + Section 5 anti-AI & typography/layout rules.
- **Skipped:** `.agent/skills/` does not exist in this workspace, and no login-free presentation/PDF skill (`brand-system`, `useslidekit`, `pdf`, `humanizer`) is installed locally. External skills or tools requiring accounts, logins, API keys, or fees were skipped per project rules.
