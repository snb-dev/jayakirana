# Jayakirana Pvt. Ltd. — Online Store Prototype

A front-end shopping site prototype for Jayakirana, a hardware and home essentials store in Delgoda, Sri Lanka. Built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

Live demo: https://subhash-li.github.io/jayakirana/

## What this is

A polished, fully click-through prototype: browse products, filter/sort in the shop, view product details, add to cart, and check out. Orders currently end at a success screen and don't hit a real backend — there's no live payment processing, inventory database, or order storage yet. This stage exists to get sign-off on the look, feel, and flow before building that out.

## Development

```bash
npm install
npm run dev       # start local dev server
npm run build     # typecheck + production build to dist/
npm run preview   # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages automatically.
