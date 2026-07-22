# WhatsApp Float & CTA Breathing — Redesign

**Date:** 2026-07-22
**Status:** Approved for implementation

## Problem

Two effects from the previous implementation are not working as expected:

1. **WhatsApp floating button:** expansion cycle is unreliable (JS timer-driven), and `useSendMorph` adds unwanted intermediate icon states. The button should be a single direct CTA, not a FAB with a menu.

2. **CTA breathing animation:** the current `cta-breathe` keyframe animates `background-color`, which produces a blinking/dimming effect that reads as an error or alert. The vignette `::after` animates `opacity` incorrectly, contributing to the flicker. The goal is a nearly imperceptible premium microinteraction — not a blink.

## Design

### 1. WhatsApp Floating Button — CSS-only expansion cycle

**Approach:** Replace all JS timer logic with a single CSS `@keyframes` animation. The `<a>` tag remains a direct WhatsApp link — no `useSendMorph`, no `SendMorphIcon`, no intermediate icon states.

**Keyframe `whatsapp-float-expand`** (~10s cycle):

| Phase | % | State |
|---|---|---|
| Rest (pill only) | 0%–20% | `max-width: 52px`, text `opacity: 0`, `padding-right: 0` |
| Expand | 20%–30% | `max-width: 180px`, text `opacity: 1`, `padding-right: 20px` |
| Hold expanded | 30%–60% | Stay expanded, fully readable |
| Collapse | 60%–70% | `max-width: 52px`, text `opacity: 0`, `padding-right: 0` |
| Rest | 70%–100% | Pill only |

**Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for expand; `cubic-bezier(0.65, 0, 0.35, 1)` for collapse. Applied via `animation-timing-function` inline in the keyframe.

**First cycle:** Animation starts at 0% (closed pill). No artificial delay — the first expansion happens naturally 2s in.

**Click:** `<a href={waLink(...)} target="_blank">` — single click always opens WhatsApp directly. No intermediate logic.

**Accessibility:**
- `prefers-reduced-motion: reduce` → `animation: none`, button stays as static pill
- `aria-label` on the link for screen readers

**Files changed:**
- `client/src/index.css` — add `@keyframes whatsapp-float-expand` and `.whatsapp-float` utility
- `client/src/components/sections/WhatsappFloating.tsx` — remove `useState`, `useEffect`, `useSendMorph`; simplify to pure `<a>` with CSS class

---

### 2. CTA Breathing Animation — Filter-based microinteraction

**Approach:** Replace the current `cta-breathe` keyframe (which animates `background-color` + `opacity` on vignette, causing blink) with filter-only properties: `brightness()`, `drop-shadow()`, and `transform: scale()`. All run on the compositor thread — zero paint triggers.

The vignette pseudo-element switches from `box-shadow: inset` to `radial-gradient` with `opacity` animated in lockstep.

**Keyframe `cta-breathe`** (~5s cycle):

| Phase | % | `brightness` | `drop-shadow` | `scale` |
|---|---|---|---|---|
| Rest | 0%–60% | `1` | `drop-shadow(0 2px 6px rgba(0,0,0,0.10))` | `1` |
| Inhale | 60%–75% | `1 → 1.06` | `→ drop-shadow(0 4px 14px rgba(0,0,0,0.18))` | `1 → 1.015` |
| Peak | 75%–85% | `1.06` | `drop-shadow(0 4px 14px rgba(0,0,0,0.18))` | `1.015` |
| Exhale | 85%–100% | `→ 1` | `→ drop-shadow(0 2px 6px rgba(0,0,0,0.10))` | `→ 1` |

**Easing:** `ease-in-out` for the full cycle — smooth and continuous, no abrupt changes.

**Vignette:** `::after` pseudo-element with `radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)`. `opacity` animated in sync with the cycle: `0` at rest → `1` at peak → `0` on exhale. Nearly imperceptible — exists only for depth perception.

**What does NOT change:**
- No `background-color` animation (the button's background stays fixed)
- No `opacity` on the button itself (only on `::after` vignette)
- No colored glow (`box-shadow` with `currentColor` or spread)
- No neon, no blink, no alert-like effects

**Per-button variation:**
- Buttons declare `--btn-breathe-rest` and `--btn-breathe-peak` CSS custom properties for their base colors — but these are no longer used since `background-color` is not animated. They're kept only for the fallback transition on desktop hover.
- Each button instance gets a staggered `animation-delay` (0s, 1.2s, 2.4s, 3.6s) so they don't all breathe in unison.

**Touch gate:** `@media (hover: none) and (pointer: coarse)` — animation only fires on touch devices. Desktop keeps standard `:hover` via `.btn-hover-scale`.

**Accessibility:**
- `prefers-reduced-motion: reduce` → `animation: none` on both `.btn-breathe` and `::after`
- `:active` → pause animation, `brightness(0.95)`

**Performance:**
- `will-change: transform, filter` on the breathing button
- All animated properties are compositor-only: `transform`, `filter`, `opacity` (on `::after`)
- Zero layout recalculation, zero paint

**Files changed:**
- `client/src/index.css` — rewrite `@keyframes cta-breathe`, `@keyframes cta-breathe-vignette`, `.btn-breathe`, `.btn-breathe-no-bg`
- No component file changes needed — the classes are already applied everywhere

---

## Implementation Plan

### Step 1 — CSS: WhatsApp float keyframe
Add `@keyframes whatsapp-float-expand` and `.whatsapp-float` utility to `index.css`.

### Step 2 — Component: Simplify WhatsappFloating.tsx
Strip JS logic, apply CSS class, keep direct `<a>` link.

### Step 3 — CSS: Rewrite CTA breathing keyframes
Replace `cta-breathe`, `cta-breathe-vignette`, `cta-breathe-no-bg` with filter-based versions.

### Step 4 — CSS: Update `.btn-breathe` and `.btn-breathe-no-bg`
Adjust utility classes for the new keyframes, `::after` vignette, and staggered delays.

### Step 5 — Verify
Test on mobile viewport: WhatsApp float expands/collapses smoothly, all CTAs breathe subtly, clicks go straight to WhatsApp.
