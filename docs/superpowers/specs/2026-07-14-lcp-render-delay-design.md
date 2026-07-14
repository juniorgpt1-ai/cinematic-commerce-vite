# LCP Optimization: Eliminate Element Render Delay

**Date:** 2026-07-14
**Status:** Design approved
**Target:** Sub-2.5s LCP (currently 3,240ms render delay)

## Context

Lighthouse/PageSpeed audit shows the LCP element (hero background image `malbec-signatureA.webp`) has a 3,240ms "element render delay." TTFB is excellent at 20ms, meaning the delay is entirely in the browser — the image exists in the DOM only after JavaScript loads, parses, and executes. For a static landing page, the LCP element should be independent of JavaScript.

### Root Cause Chain

```
index.html → main.tsx → App.tsx → lazy(Home) → fetch Home chunk
→ fetch vendor-framer chunk → render Hero → insert <img> into DOM
```

Multiple JS round-trips before the hero image even enters the DOM.

### Contributing Factors

1. `Home` page is `React.lazy()` in App.tsx — adds chunk round-trip
2. `framer-motion` (~30KB gzipped) loaded eagerly for Hero animations (FloatingBadge + useFadeUp)
3. `decoding="async"` on hero `<img>` defers decode/paint
4. `MutationObserver` with `subtree: true` runs on every DOM mutation

## Design

### Section 1: Static HTML Hero in index.html

Expand the existing `#hero-fallback` from text-only to full hero content (image + heading + description + CTA). The browser paints the LCP image as soon as it loads from the preload hint, before any JS executes.

**Changes:**
- Expand critical inline `<style>` with hero image positioning, overlay gradients, and CTA styling
- Add `<picture>` with `<img>` (desktop + mobile sources), `decoding="sync"`, `fetchpriority="high"`, explicit width/height
- Add gradient overlay divs (matching React Hero)
- Add CTA button as static `<a>` link
- `pointer-events: none` on fallback wrapper, `pointer-events: auto` on CTA

**Transition:** Existing MutationObserver hides `#hero-fallback` when React mounts into `#root`. Image is cached from preload, so React reuses it without re-download.

**Files:** `client/index.html`

### Section 2: Replace framer-motion with CSS in Hero

Remove `framer-motion` from the Hero critical path by replacing Framer Motion animations with CSS `@keyframes`.

**Changes:**
- `client/src/index.css`: Add `@keyframes fade-up` (opacity 0→1, translateY 32px→0, 0.9s, cubic-bezier(0.22, 1, 0.36, 1)) and `@keyframes float-badge` (translateY 0→-4px→0, 5s, ease-in-out infinite). Respect `prefers-reduced-motion: reduce`.
- `client/src/pages/Home.tsx`: Remove `import { motion } from "framer-motion"` and `import { useFadeUp }`. Replace `<motion.div {...fade}>` with `<div className="animate-fade-up">`.
- `client/src/components/sections/FloatingBadge.tsx`: Replace `motion.span` with `<span className="animate-float-badge">`, remove framer-motion import.

**Impact:** `vendor-framer` chunk (~30KB gzipped) removed from critical path. Only loaded when below-fold sections (still using `useFadeUp`) intersect via `LazySection`.

### Section 3: Static Home Import + Targeted Fixes

**3a. Static Home import:**
- `client/src/App.tsx`: `const Home = lazy(() => import("./pages/Home"))` → `import Home from "./pages/Home"`. Remove `<Suspense>` wrapper around `<Home />`.

**3b. Sync image decode:**
- `client/src/pages/Home.tsx` line 208: `decoding="async"` → `decoding="sync"` on the hero `<img>`.

**3c. Fix MutationObserver:**
- `client/index.html` line 133: Remove `subtree: true` from the MutationObserver — only observe direct children of `#root`, not every nested DOM mutation. Change `subtree:!0` to `subtree:!1` (or remove the property entirely since `childList` on direct children is sufficient).

## Files Modified

| File | Change |
|---|---|
| `client/index.html` | Expand `#hero-fallback` with image, overlays, CTA; expand critical CSS; simplify observer |
| `client/src/index.css` | Add `@keyframes fade-up` and `@keyframes float-badge` with reduced-motion variants |
| `client/src/pages/Home.tsx` | Remove framer-motion import, remove useFadeUp import, motion.div→div, decoding async→sync |
| `client/src/components/sections/FloatingBadge.tsx` | motion.span→span with CSS class, remove framer-motion import |
| `client/src/App.tsx` | lazy(Home)→static import, remove Suspense wrapper |

## Verification

1. `pnpm build` — confirm no build errors, bundle sizes
2. Run Lighthouse on the built site — LCP should be under 2.5s with near-zero render delay
3. Visual check: hero fallback visible instantly on cold load
4. Visual check: React hero fades in seamlessly when JS mounts
5. Confirm `vendor-framer` is not in initial network waterfall (only loaded on scroll)
6. Test with `prefers-reduced-motion: reduce` — no animations, no flash
7. Test mobile breakpoint — correct image source (malbecSMOB.webp)
