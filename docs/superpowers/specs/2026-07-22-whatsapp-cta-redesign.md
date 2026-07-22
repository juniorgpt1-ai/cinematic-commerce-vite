# WhatsApp Float & CTA Breathing — Redesign

**Date:** 2026-07-22
**Status:** Approved for implementation

## Problem

Two effects from the previous implementation are not working as expected:

1. **WhatsApp floating button:** expansion cycle is unreliable (JS timer-driven), and `useSendMorph` adds unwanted intermediate icon states. The button should be a single direct CTA, not a FAB with a menu.

2. **CTA breathing animation:** the current `cta-breathe` keyframe animates properties with poor timing — the full cycle is active animation, making the background-color shift read as a blink or error alert. The vignette `::after` animates `opacity` incorrectly, contributing to the flicker. The goal is a nearly imperceptible premium microinteraction where the button spends most of its time at rest, breathing subtly into a highlighted state before returning.

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

### 2. CTA Breathing Animation — Hybrid approach

**Approach:** Rewrite the `cta-breathe` keyframe using a combination of compositor-safe properties (`brightness()`, `drop-shadow()`, `transform: scale()`) plus `background-color` for dark buttons that shift toward green at peak. The vignette pseudo-element uses `radial-gradient` with `opacity` animated in lockstep.

The previous implementation failed because `background-color` was animated across the entire cycle with poor timing, creating a blink. The fix is timing: 60% of the cycle is complete rest — the background shift only happens during the slow inhale/exhale phases, making it feel like a natural breath rather than a flicker.

**Keyframe `cta-breathe`** (~5s cycle):

| Phase | % | `background-color` | `brightness` | `drop-shadow` | `scale` |
|---|---|---|---|---|---|
| Rest | 0%–60% | `--btn-breathe-rest` | `1` | `drop-shadow(0 2px 6px rgba(0,0,0,0.10))` | `1` |
| Inhale | 60%–75% | `→ --btn-breathe-peak` | `1 → 1.06` | `→ drop-shadow(0 4px 14px rgba(0,0,0,0.18))` | `1 → 1.015` |
| Peak | 75%–85% | `--btn-breathe-peak` | `1.06` | `drop-shadow(0 4px 14px rgba(0,0,0,0.18))` | `1.015` |
| Exhale | 85%–100% | `→ --btn-breathe-rest` | `→ 1` | `→ drop-shadow(0 2px 6px rgba(0,0,0,0.10))` | `→ 1` |

**Easing:** `ease-in-out` for the full cycle — smooth and continuous, no abrupt changes.

**Per-button colors via CSS custom properties:**

| Button type | `--btn-breathe-rest` | `--btn-breathe-peak` |
|---|---|---|
| Dark buttons (Consulta, Kits, HairCare, Malbec) | `#0a0a0a` | `#25d366` |
| Green buttons (Hero, CtaFinal, WhatsApp float) | `#25d366` | `#2ecc71` |
| Gold/gradient buttons (Malbec gold) | `rgba(154,123,80,0.1)` | `rgba(154,123,80,0.2)` |

Dark buttons shift from near-black to WhatsApp green at peak, then return. This is the most visually impactful version — the button "comes alive" with brand color. Green buttons shift to a slightly lighter green. Gold buttons get a subtle boost.

**Vignette:** `::after` pseudo-element with `radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)`. `opacity` animated in sync with the cycle: `0` at rest → `1` at peak → `0` on exhale. Nearly imperceptible — exists only for depth perception. On dark buttons the vignette is invisible (black on black), which is fine — `drop-shadow` and `brightness` carry the depth.

**What does NOT change:**
- No `opacity` on the button itself (only on `::after` vignette)
- No colored glow (`box-shadow` with `currentColor` or spread)
- No neon, no blink, no alert-like effects

**Per-button stagger:**
Each button instance gets a staggered `animation-delay` (0s, 1.2s, 2.4s, 3.6s) so they don't all breathe in unison.

**Touch gate:** `@media (hover: none) and (pointer: coarse)` — animation only fires on touch devices. Desktop keeps standard `:hover` via `.btn-hover-scale`.

**Accessibility:**
- `prefers-reduced-motion: reduce` → `animation: none` on both `.btn-breathe` and `::after`
- `:active` → pause animation, `brightness(0.95)`

**Performance:**
- `will-change: transform, filter, background-color` on the breathing button
- `transform` and `filter` run on compositor thread
- `background-color` triggers paint, but only during 25% of the cycle (inhale/exhale) — the remaining 75% is at rest with zero paint
- `opacity` on `::after` is compositor-only
- Zero layout recalculation

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
