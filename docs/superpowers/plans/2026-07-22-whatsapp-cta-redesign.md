# WhatsApp Float & CTA Breathing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace JS-driven WhatsApp floating button cycle with pure CSS keyframes, rewrite CTA breathing animation with proper slow-rest timing and background-color transition for dark buttons, and center the mobile "Entrega VIP" badge.

**Architecture:** Two pure CSS `@keyframes` animations — `whatsapp-float-expand` for the floating WhatsApp button (10s cycle with expand/collapse), and a rewritten `cta-breathe` for touch-device CTAs (5s cycle: 60% rest, 15% inhale, 10% peak, 15% exhale). WhatsApp button drops `useSendMorph` / `SendMorphIcon` entirely — clicks go straight to WhatsApp. Vignette switches from `box-shadow: inset` to `radial-gradient` with opacity animation.

**Tech Stack:** React 19, Tailwind CSS v4, CSS `@keyframes` / `@utility`, `will-change` for compositor hints

## Global Constraints

- Touch-only breathing gate: `@media (hover: none) and (pointer: coarse)` — desktop keeps `:hover` effects unchanged
- `prefers-reduced-motion: reduce` disables breathing animations entirely
- Dark buttons transition `background-color` from `#0a0a0a` to `#25d366` (WhatsApp green) at peak
- Green buttons transition from `#25d366` to `#2ecc71` (lighter green) at peak
- Gold/gradient buttons use `btn-breathe-no-bg` (no background-color shift)
- WhatsApp float: single click always opens WhatsApp directly — no intermediate icon states, no menu

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `client/src/index.css:166-282` | Rewrite | Keyframes `cta-breathe`, `cta-breathe-no-bg`, `cta-breathe-vignette`, utility classes `.btn-breathe`, `.btn-breathe-no-bg`; add `whatsapp-float-expand` keyframe and `.whatsapp-float-btn` utility |
| `client/src/components/sections/WhatsappFloating.tsx` | Rewrite | Strip all JS logic, render pure `<a>` with CSS class |
| `client/src/pages/Home.tsx:238` | Modify | Add `flex justify-center` to FloatingBadge wrapper div |
| `client/src/components/sections/HairCareSuite.tsx:34,126,220` | Modify | Add staggered `[--breathe-delay:Xs]` to each CTA button |

---

### Task 1: Add WhatsApp float keyframe and utility to index.css

**Files:**
- Modify: `client/src/index.css:166` (insert before existing keyframes at line 166)

**Interfaces:**
- Produces: `@keyframes whatsapp-float-expand` and `@utility whatsapp-float-btn` — consumed by Task 2 (WhatsappFloating.tsx)

- [ ] **Step 1: Insert the WhatsApp float keyframe and utility class**

Insert this block **before** line 166 (`@keyframes luxe-pulse`), right after the `.gold-rule::after` block ends (after line 164):

```css
/* ── WhatsApp floating button auto expand/collapse (CSS-only) ── */

@keyframes whatsapp-float-expand {
  /* Closed pill: 0%–18% (first 1.8s of 10s cycle) */
  0%, 15% {
    max-width: 0;
    opacity: 0;
    margin-left: 0;
    margin-right: 0;
  }
  /* Expand from 15%→28% (1.5s → 2.8s): smooth expand */
  /* Hold expanded: 28%–58% (2.8s → 5.8s) */
  28%, 55% {
    max-width: 160px;
    opacity: 1;
    margin-left: 10px;
    margin-right: 4px;
  }
  /* Collapse from 55%→68% (5.5s → 6.8s): smooth collapse */
  /* Closed pill: 68%–100% (6.8s → 10s) */
  68%, 100% {
    max-width: 0;
    opacity: 0;
    margin-left: 0;
    margin-right: 0;
  }
}

@utility whatsapp-float-btn {
  animation: whatsapp-float-expand 10s ease-in-out infinite;
  & span {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-float-btn {
    animation: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/index.css
git commit -m "feat: add whatsapp-float-expand keyframe and utility class"
```

---

### Task 2: Simplify WhatsappFloating.tsx to pure anchor

**Files:**
- Modify: `client/src/components/sections/WhatsappFloating.tsx` (full rewrite, 67 lines → ~16 lines)

**Interfaces:**
- Consumes: `@utility whatsapp-float-btn` from Task 1
- Produces: Pure `<a>` component — no JS state, no hooks, no morph icon

- [ ] **Step 1: Replace the entire file**

```tsx
import { memo } from "react";
import { waLink } from "@/lib/whatsapp";

const WhatsappFloating = memo(function WhatsappFloating() {
  return (
    <a
      href={waLink("Olá! Gostaria de ajuda para escolher um produto.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer meu pedido pelo WhatsApp"
      className="group fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 btn-hover-scale inline-flex items-center bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full py-3.5 pl-3.5 pr-3.5 cursor-pointer backdrop-blur-sm overflow-hidden whatsapp-float-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
      <span>
        Fazer meu pedido <img src="/msg.svg" alt="" className="size-5 shrink-0 inline align-middle" />
      </span>
    </a>
  );
});

export default WhatsappFloating;
```

- [ ] **Step 2: Verify the file is valid**

```bash
npx tsc --noEmit --pretty client/src/components/sections/WhatsappFloating.tsx 2>&1 | head -5
```

- [ ] **Step 3: Commit**

```bash
git add client/src/components/sections/WhatsappFloating.tsx
git commit -m "refactor: simplify WhatsApp float to CSS-only, remove useSendMorph"
```

---

### Task 3: Center FloatingBadge on mobile

**Files:**
- Modify: `client/src/pages/Home.tsx:238`

**Interfaces:**
- Consumes: Existing `FloatingBadge` component (unchanged)
- Produces: Centered badge on mobile viewport

- [ ] **Step 1: Add `flex justify-center` to the wrapper div**

Change line 238 from:
```html
<div className="md:hidden mt-4">
```
To:
```html
<div className="md:hidden mt-4 flex justify-center">
```

- [ ] **Step 2: Commit**

```bash
git add client/src/pages/Home.tsx
git commit -m "fix: center FloatingBadge horizontally on mobile"
```

---

### Task 4: Rewrite CTA breathing keyframes in index.css

**Files:**
- Modify: `client/src/index.css:206-282` (replace the entire CTA breathing section)

**Interfaces:**
- Consumes: CSS custom properties `--btn-breathe-rest`, `--btn-breathe-peak` (already set inline on buttons)
- Produces: `@keyframes cta-breathe`, `@keyframes cta-breathe-no-bg`, `@keyframes cta-breathe-vignette` — consumed by Task 5 utility classes

- [ ] **Step 1: Replace lines 206-282 (CTA breathing section)**

Replace everything from the `/* ── CTA breathing` comment (line 206) through the closing `}` of the touch media query (line 282) with:

```css
/* ── CTA breathing (touch-only hover substitute) ── */

@keyframes cta-breathe {
  /* Rest: 0%–58% (3s of 5s cycle) — no change */
  0%, 55% {
    background-color: var(--btn-breathe-rest);
    transform: scale(1);
    filter: brightness(1) drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }
  /* Inhale: 55%→75% (0.75s) — slow transition to peak */
  /* Peak: 75%–83% (0.5s) — hold at highlighted state */
  75%, 82% {
    background-color: var(--btn-breathe-peak);
    transform: scale(1.015);
    filter: brightness(1.06) drop-shadow(0 4px 14px rgba(0,0,0,0.18));
  }
  /* Exhale: 82%→100% (0.75s) — slow return to rest */
  100% {
    background-color: var(--btn-breathe-rest);
    transform: scale(1);
    filter: brightness(1) drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }
}

@keyframes cta-breathe-no-bg {
  0%, 55% {
    transform: scale(1);
    filter: brightness(1) drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }
  75%, 82% {
    transform: scale(1.015);
    filter: brightness(1.06) drop-shadow(0 4px 14px rgba(0,0,0,0.18));
  }
  100% {
    transform: scale(1);
    filter: brightness(1) drop-shadow(0 2px 6px rgba(0,0,0,0.10));
  }
}

@keyframes cta-breathe-vignette {
  0%, 55% { opacity: 0; }
  75%, 82% { opacity: 1; }
  100% { opacity: 0; }
}

.btn-breathe {
  position: relative;
  isolation: isolate;
  transition:
    background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  animation-delay: var(--breathe-delay, 0s);
}
.btn-breathe::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%);
  opacity: 0;
}

@media (hover: none) and (pointer: coarse) {
  .btn-breathe {
    animation: cta-breathe 5s ease-in-out infinite;
    will-change: transform, filter, background-color;
  }
  .btn-breathe::after {
    animation: cta-breathe-vignette 5s ease-in-out infinite;
  }
  .btn-breathe:active {
    animation-play-state: paused;
    filter: brightness(0.95);
  }
  .btn-breathe-no-bg {
    animation: cta-breathe-no-bg 5s ease-in-out infinite;
    will-change: transform, filter;
  }
  .btn-breathe-no-bg::after {
    animation: cta-breathe-vignette 5s ease-in-out infinite;
  }
  .btn-breathe-no-bg:active {
    animation-play-state: paused;
    filter: brightness(0.92);
  }
  /* Kill desktop glow on gradient buttons when breathing takes over */
  .btn-breathe-no-bg[style*="luxe-glow-gold"] {
    animation-name: cta-breathe-no-bg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-breathe,
  .btn-breathe-no-bg {
    animation: none !important;
  }
  .btn-breathe::after,
  .btn-breathe-no-bg::after {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/index.css
git commit -m "feat: rewrite CTA breathing with slow-rest timing and filter-based depth"
```

---

### Task 5: Add staggered breathe delays to HairCareSuite CTAs

**Files:**
- Modify: `client/src/components/sections/HairCareSuite.tsx:34,126,220`

**Interfaces:**
- Consumes: `.btn-breathe` with `--breathe-delay` custom property from Task 4
- Produces: Three CTAs breathing at staggered intervals (0s, 1.6s, 3.2s)

- [ ] **Step 1: Add `[--breathe-delay:0s]` to the header CTA (line 34)**

Change the className on line 34 from:
```
className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
```
To:
```
className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] [--breathe-delay:0s] px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
```

- [ ] **Step 2: Add `[--breathe-delay:1.6s]` to the volume CTA (line 126)**

Change the className on line 126 from:
```
className="group inline-flex flex-wrap items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold tracking-wide shadow-md"
```
To:
```
className="group inline-flex flex-wrap items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] [--breathe-delay:1.6s] px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold tracking-wide shadow-md"
```

- [ ] **Step 3: Add `[--breathe-delay:3.2s]` to the liso CTA (line 220)**

Change the className on line 220 from:
```
className="group inline-flex items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold tracking-wide shadow-md whitespace-nowrap"
```
To:
```
className="group inline-flex items-center justify-center gap-3 border border-luxe-gold/25 bg-luxe-ink hover:bg-whatsapp hover:border-whatsapp text-white hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] [--breathe-delay:3.2s] px-5 py-3.5 sm:px-6 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base font-semibold tracking-wide shadow-md whitespace-nowrap"
```

- [ ] **Step 4: Commit**

```bash
git add client/src/components/sections/HairCareSuite.tsx
git commit -m "feat: add staggered breathe delays to HairCareSuite CTAs"
```

---

### Task 6: Build and verify

**Files:**
- Verify: `pnpm build` passes with no errors

- [ ] **Step 1: Run TypeScript check**

```bash
pnpm check
```
Expected: No errors.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```
Expected: Build completes successfully.

- [ ] **Step 3: Start dev server and verify visually**

```bash
pnpm dev
```

Open in browser. Verify on mobile viewport (Chrome DevTools device toolbar):
1. WhatsApp float: appears as green pill at bottom-right → expands with "Fazer meu pedido" text after ~1.5s → holds ~3s → collapses → repeats
2. Click WhatsApp float: opens WhatsApp directly (new tab)
3. HairCareSuite CTAs: each breathes at a different time (staggered), background shifts from dark to green smoothly
4. FloatingBadge "Entrega VIP": centered horizontally on mobile
5. Desktop: no breathing animations — standard `:hover` effects only
6. `prefers-reduced-motion: reduce`: all breathing paused, WhatsApp float stays static pill

- [ ] **Step 4: Commit any final adjustments if needed**

```bash
# Only if adjustments were made during verification
git add -A
git commit -m "chore: final polish after verification"
```
