# CTA Breathing Animation — Touch-Only Hover Substitute

**Date:** 2026-07-21
**Status:** Approved for implementation

## Problem

Desktop buttons have hover feedback (color change, scale, glow). Touch devices have no hover.
The `useTouchCtaReveal` hook fires a one-shot on scroll-into-view, which doesn't provide
continuous interactive affordance. This spec replaces it with a CSS breathing animation.

## Non-Goals

No entrance animation, bounce, heartbeat, blink, shake, exaggerated zoom, blinking glow,
or attention-grabbing pulse. Desktop hover behavior is unchanged.

## Scope

**All clickable CTA buttons** across the entire site — Hero, section headers, product cards,
KitsGrid, CtaFinal, WhatsappFloating, Consultoria, HairCareSuite, MalbecShowcase,
FlorattaRedShowcase, BoticarioCarousel, Footer.

## Design

### Gate

```css
@media (hover: none) and (pointer: coarse) {
  .btn-breathe { animation: cta-breathe 4s ease-in-out infinite; }
}
```

`hover: none` detects touch devices. `pointer: coarse` reinforces it (avoids stylus false
positives). Desktop (`hover: hover`) never runs the animation.

### Keyframe

```css
@keyframes cta-breathe {
  0%, 100% {
    background-color: <original>;
    box-shadow: <original>;
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    background-color: var(--btn-breathe-peak, <original>);
    box-shadow: 0 0 24px var(--btn-breathe-shadow, transparent),
                0 8px 24px -4px rgba(0,0,0,0.15);
    transform: scale(1.025);
    filter: brightness(1.08);
  }
}
```

**4-second cycle, symmetric ease-in-out.** The `50%` peak holds briefly due to the easing
curve (ease-in-out plateaus at extremes).

### CSS Custom Properties per Variant

Each button family declares `--btn-breathe-peak` (peak background) and
`--btn-breathe-shadow` (peak glow color) inline via Tailwind arbitrary properties:

| Family | `--btn-breathe-peak` | `--btn-breathe-shadow` |
|---|---|---|
| WhatsApp green (`bg-whatsapp`) | `#1ebe57` (hover green) | `rgba(37,211,102,0.4)` |
| Dark → green (`bg-luxe-ink`) | `#25d366` (whatsapp) | `rgba(37,211,102,0.28)` |
| Gold metallic (`btn-gold-metallic`) | `#e2c87a` (lighter gold) | `rgb(201,168,76 / 0.45)` |
| Outline gold (`bg-luxe-gold/10`) | `rgba(154,123,80,0.15)` | `rgb(201,168,76 / 0.2)` |
| Glass/outline light (`glass-btn`) | `rgba(255,255,255,0.12)` | `rgba(255,255,255,0.15)` |
| Secondary/ghost | `var(--accent)` at 15% opacity | `var(--ring)` at 20% alpha |

### Vinheta (Focus Depth Effect)

A `.btn-breathe` uses a `::after` pseudo-element with `box-shadow: inset` for vignette.
The opacity is driven by a second `@keyframes` animation synced to the same 4s cycle:

```css
.btn-breathe {
  position: relative;
  isolation: isolate;
}
.btn-breathe::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  animation: cta-breathe-vignette 4s ease-in-out infinite;
}

@keyframes cta-breathe-vignette {
  0%, 100% { box-shadow: inset 0 0 20px rgba(0,0,0,0); }
  50%      { box-shadow: inset 0 0 20px rgba(0,0,0,0.18); }
}
```

### Implementation: Pure CSS

No JS hook. No IntersectionObserver. No scroll listeners. No singleton coordinator.
A single `@utility` class `.btn-breathe` applied to all CTA elements.

**Rationale:** The user chose symmetric breathing (approach B) — no viewport awareness needed.
The animation runs continuously on touch devices, exactly like a hover affordance.

## Cleanup

- Delete `client/src/hooks/useTouchCtaReveal.ts`
- Remove all `useTouchCtaReveal()` calls from `Consultoria.tsx`, `KitsGrid.tsx`,
  `HairCareSuite.tsx`, `MalbecShowcase.tsx`
- Add `btn-breathe` class + variant custom properties to every CTA `<a>` element
- The existing `cta-emphasize` and `wa-glow`/`wa-pulse` classes on touch devices are
  redundant with breathing and should be gated to `@media (hover: hover)` only

## Performance

- `transform`, `opacity`, `filter` — compositor-only, no layout
- `background-color` — paint only, single small element, negligible
- `box-shadow` — compositor-friendly when on a non-root element with `will-change`
- No JS animation frames, no `getBoundingClientRect`, no forced reflows

## Accessibility

- `@media (prefers-reduced-motion: reduce)` disables the animation entirely
- The existing global reduced-motion block at `index.css:578` already handles this
- Add explicit `.btn-breathe { animation: none !important; }` in that block for defense

## Verification

1. Desktop: hover works exactly as before — no breathing
2. Mobile/touch: all CTAs breathe continuously with 4s cycle
3. Each variant breathes to its own peak color
4. Peak includes scale (1.025), glow shadow, brightness lift, and vignette
5. Reduced motion: no breathing on any device
6. Sustained 60 FPS on mobile
