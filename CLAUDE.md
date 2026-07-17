# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cinematic Commerce — Maison Fragrance** is a single-page e-commerce landing page for a Brazilian fragrance/haircare reseller (Grupo Boticário & Eudora products). The primary CTA is WhatsApp-based ordering with VIP 1-hour delivery via Uber Flash in Belo Horizonte, Brazil.

## Commands

```bash
pnpm dev            # Dev server on port 5000 (Vite, --host)
pnpm build          # Build client (vite build → dist/public/) + server (esbuild → dist/index.js)
pnpm start          # Production: NODE_ENV=production node dist/index.js (Express on port 3000)
pnpm preview        # Preview built client (vite preview --host)
pnpm check          # TypeScript type-checking (tsc --noEmit)
pnpm format         # Prettier format entire project
npx vitest --run    # Run tests (Vitest installed but no test files exist yet)
```

## Architecture

### Stack

- **Framework:** React 19 + Vite 7 + TypeScript 5.6
- **Styling:** Tailwind CSS v4 + `tw-animate-css` + shadcn/ui (New York style)
- **Animation:** CSS keyframes/transitions (`@utility` classes in `index.css`); no animation library
- **Routing:** Wouter 3.3 (lightweight ~2KB router)
- **Server:** Express 4 (static file serving + SPA fallback)
- **UI primitives:** Radix UI (accordion, dialog, tooltip), Embla Carousel, Recharts 2
- **No test suite configured yet** (Vitest installed, no test files)

### Directory Layout

```
client/src/
├── main.tsx              # Entry: <App> + <SpeedInsights>
├── App.tsx               # Root: ErrorBoundary > ThemeProvider > TooltipProvider > Router
├── index.css             # Tailwind v4 imports + custom "luxe palette" CSS vars + utility classes
├── pages/
│   ├── Home.tsx          # ~1448 LOC: all sections (Hero, TrustBar, HairCare, Perfumes, Kits, FAQ, Footer)
│   └── NotFound.tsx      # 404
├── components/
│   ├── ui/               # 55+ shadcn/ui components (button, card, dialog, carousel, chart, etc.)
│   └── AntigravityParticles.tsx  # CSS-driven particle background for Hero (vanilla mouse parallax)
├── lib/
│   ├── utils.ts          # cn() helper (clsx + tailwind-merge)
│   └── whatsapp.ts       # waLink() builder → https://wa.me/<number>?text=<encoded>
├── hooks/                # useMobile, useComposition, usePersistFn
└── contexts/
    └── ThemeContext.tsx   # Light/dark (default light, switchable disabled)
server/index.ts           # Express: serves dist/public/ static + SPA fallback on port 3000
```

### Key Patterns

- **No backend API.** All commerce flows through WhatsApp links (`lib/whatsapp.ts`). The phone number is hardcoded (`5531900000000` — placeholder). Every CTA opens a pre-filled WhatsApp message.
- **Single-page landing pattern:** `Home.tsx` is a large file with internal function components per section (`Hero`, `TrustBar`, `HairCareSuite`, `MalbecShowcase`, etc.). Animations use CSS `@utility` classes (`animate-fade-up`, `animate-float-badge`, `animate-particle-float`, etc.) defined in `index.css`.
- **No global state library.** No Redux/Zustand/Context for business state. Only `ThemeContext` exists (light/dark toggled by `.dark` on `<html>`).
- **Styling:** Custom "luxe palette" CSS custom properties (`--luxe-gold`, `--luxe-bordo`, `--luxe-ink`) mapped to Tailwind v4 `@theme inline` tokens. Google Fonts: Cormorant Garamond, Merriweather, Playfair Display, Plus Jakarta Sans.
- **Build output:** Two-step build — Vite bundles client to `dist/public/`, then esbuild bundles the Express server to `dist/index.js`.
- **Deployment:** Vercel (`vercel.json`) or Express. `vite.config.ts` sets root to `client/` with `@` alias → `client/src/`.
