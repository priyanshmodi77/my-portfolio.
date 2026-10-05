# Priyansh Modi — Portfolio Hero

A full-screen personal portfolio hero built with Next.js (App Router), React,
TypeScript, and Tailwind CSS. It starts as a pale-blue editorial portrait and
reveals an aligned "liquid-glass anatomical" version through a soft circular
cursor/touch mask.

## What's inside

```
app/
  globals.css     — global resets, color tokens, reduced-motion rule
  layout.tsx       — root layout, loads Albert Sans + Fragment Mono
  page.tsx          — minimal page that renders the hero
components/
  glass-hero.tsx          — the hero component (all interaction logic)
  glass-hero.module.css    — all hero styling (mask, grid, nav, copy, animation)
public/images/
  Base_image_desktop.png
  Base_image_mobile.png
  Reveal_image_desktop.png
  Reveal_image_mobile.png
```

## Run it on your Windows machine

You need **Node.js** installed first (this gives you `npm`).

1. Install Node.js (if you don't have it): go to https://nodejs.org, download
   the **LTS** installer, run it, and accept the defaults.
2. Unzip this project folder somewhere on your computer.
3. Open a terminal in that folder:
   - In File Explorer, open the unzipped `portfolio` folder.
   - Click the address bar, type `cmd`, press Enter. This opens a command
     prompt already inside the folder.
4. Install dependencies:
   ```
   npm install
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
6. Open your browser to **http://localhost:3000**. Move your mouse over the
   portrait (or drag your finger on mobile) to reveal the glass layer.

## Other useful commands

- `npm run typecheck` — checks TypeScript types with no build output.
- `npm run build` — creates an optimized production build (also verifies
  everything compiles correctly).
- `npm run start` — serves the production build (run `npm run build` first).

## Customizing

All of your personal copy (name, headline, tagline, intro line, CTA link,
nav labels) lives at the top of `components/glass-hero.tsx` as plain
constants — edit those directly, no need to touch the styling.

## Notes on the build

- `npm run build` was verified to complete successfully during development.
- If your build ever shows a warning about "Failed to minify the stylesheet"
  for Google Fonts, it's a harmless font-optimization step and does not
  affect the final site — the fonts still load correctly in the browser.
