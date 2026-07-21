# CTA Breathing — Touch-Only Hover Substitute

**Date:** 2026-07-21
**Status:** Approved for implementation

## Problem

The desktop hover on section CTAs delivers three simultaneous signals: background goes
`luxe-ink` → `whatsapp` green, text goes white → black, and the button scales to 1.02.

The arrow icon (`/msg.svg`) is a hardcoded `fill="black"` SVG — it does not inherit
`currentColor`. On `bg-luxe-ink` (#0a0a0a) it is effectively invisible; the hover green is
what reveals it.

Touch devices have no hover, so those CTAs read as static and the arrow stays hidden. This
spec restores the *perception of interactivity* on touch — nothing more. It is not a
marketing or attention device.

## Non-Goals

No entrance animation, one-shot, fade-in, bounce, heartbeat, blink, shake, exaggerated zoom,
blinking glow, or attention-grabbing pulse. **Desktop behavior changes in no way.**

## Scope

### Included — 9 CTAs

| Component | Line | Base background |
|---|---|---|
| `Consultoria.tsx` | 71 | `bg-luxe-ink` |
| `HairCareSuite.tsx` | 37, 129, 223 | `bg-luxe-ink` |
| `MalbecShowcase.tsx` | 150 | `bg-luxe-ink` |
| `EditorialShowcase.tsx` | 188 | `bg-luxe-ink` |
| `KitsGrid.tsx` | 56 | `bg-luxe-gold/10` (variant) |
| `KitsGrid.tsx` | 107 | `bg-luxe-ink` (card button) |
| `BoticarioCarousel.tsx` | 211 | `bg-luxe-ink` (card button) |

### Excluded — with rationale

- **Hero CTA** (`Home.tsx:204`) — explicit user instruction; also already `bg-whatsapp`.
- **CtaFinal** (`CtaFinal.tsx:45`) — already `bg-whatsapp`; breathing toward green is a no-op.
- **WhatsappFloating** (`WhatsappFloating.tsx:103`) — `position: fixed`, permanently visible,
  already green. Viewport-driven breathing is meaningless.
- **MalbecShowcase gold CTA** (`MalbecShowcase.tsx:189`) — `btn-gold-metallic`; its hover
  identity is `brightness-105 + shadow-xl`, not green. It already runs
  `luxe-glow-gold 2.5s infinite`; adding green breathing would break its visual identity and
  collide with a running animation. Its `useTouchCtaReveal("")` call is deleted, not replaced.

## Design System Reuse

All values derive from the existing desktop hover. No new arbitrary values.

| Token | Source | Use |
|---|---|---|
| `--whatsapp: #25d366` | `index.css:96` | Breath peak tint |
| `cubic-bezier(0.22, 1, 0.36, 1)` | `btn-hover-scale`, `index.css:335` | Promoted to `--ease-luxe` |
| `--luxe-ink` | `index.css` palette | Breath resting color |
| `shadow-md` | Tailwind v4 `--shadow-md` | Breath resting shadow |
| scale `1.02` | `btn-hover-scale:hover` | Reference; breathing uses a softer 1.015 |

`--ease-luxe` is a refactor: the literal `cubic-bezier(0.22, 1, 0.36, 1)` is currently
copy-pasted across ~6 utilities in `index.css`. It is extracted to a named token and those
call sites reference it. Behavior is unchanged.

## Visual Specification

The background is the primary actor. The arrow is **never targeted directly** — it gains
contrast as a consequence of the background lightening. Text color is untouched.

```css
@keyframes cta-breathe {
  0%, 100% {
    background-color: var(--cta-base);
    transform: scale(1);
    box-shadow: var(--shadow-md);
  }
  38%, 52% {
    background-color: var(--cta-breathe-peak);
    transform: scale(1.015);
    box-shadow: 0 8px 28px -4px rgb(37 211 102 / 0.28);
  }
  83% {
    background-color: var(--cta-base);
    transform: scale(1);
    box-shadow: var(--shadow-md);
  }
}
```

The explicit `83%` stop is what creates the rest phase: without it the exhale would stretch
across `52% → 100%` and the cycle would loop with no pause, reading as mechanical.

- `--cta-base` defaults to `var(--luxe-ink)`; one modifier class overrides it for `KitsGrid:56`.
- `--cta-breathe-peak` = `color-mix(in oklab, var(--whatsapp) 75%, var(--cta-base))`.
  **75%, not 100%** — full `#25d366` reads as a flash. 75% raises the black arrow to
  comfortable contrast while remaining nearly subliminal.
- Peak scale is **1.015**, a hard ceiling. Never exceeded.
- Peak shadow reuses the hover green at low alpha; the resting shadow is the button's existing
  `shadow-md`, so there is no visual jump at cycle boundaries.

### Cycle timing — 6s total

| Phase | Duration | Keyframe span |
|---|---|---|
| Inhale | 2.28s | 0% → 38% |
| Hold | 0.84s | 38% → 52% |
| Exhale | 1.86s | 52% → 83% |
| Rest | 1.02s | 83% → 100% |

Breath ≈ 5s, pause ≈ 1s. The asymmetry between inhale, hold, and rest is what makes it read
as organic breath rather than a mechanical sine loop.

## Architecture

### `useCtaBreathing` hook

Replaces `useTouchCtaReveal` entirely. Returns a ref to attach to the CTA element.

JS **never writes inline styles**. It toggles a single `data-breathing` attribute; CSS owns
all visual state:

```css
[data-breathing="true"] { animation: cta-breathe 6s var(--ease-luxe) infinite; }
```

### Module-level coordinator

A singleton registry, not per-hook state — "only one CTA breathes" is a global invariant and
cannot be enforced by independent hook instances.

Responsibilities:

1. **Touch gate.** Registry is inert unless `(hover: none) and (pointer: coarse)` matches.
   Desktop never activates. Evaluated once at module load.
2. **Reduced motion.** Inert if `prefers-reduced-motion: reduce`. Watched live via
   `MediaQueryList.addEventListener` so a mid-session change takes effect.
3. **Visibility.** One shared `IntersectionObserver` at `threshold: 0.6`. Elements crossing
   in become candidates; crossing out are removed and lose the attribute immediately.
4. **Election.** Among candidates, the highest `intersectionRatio` wins. Exactly one element
   holds `data-breathing` at any moment.
5. **Start delay.** 300–600ms randomized, applied before the winner starts. Makes the
   interface feel responsive to the user rather than to the scroll position.
6. **Scroll stabilization.** One shared `passive: true` scroll listener for the entire module
   — not one per CTA. It only resets a timer; it never reads layout
   (no `getBoundingClientRect`, no style reads). On scroll: revoke `data-breathing`
   immediately. After 250ms idle: re-elect and re-apply the 300–600ms start delay.

**Note on the scroll listener.** The original brief said "never use scroll listeners." The
intent — never drive animation by reading layout on scroll — is honored: this listener does
nothing but reset a timer. A pure-IntersectionObserver proxy was rejected because a fully
visible CTA crosses no thresholds during slow scroll and would fail to pause. The native
`scrollend` event was rejected for poor Safari iOS support, which is the primary target.

### Cleanup

Deleting `useTouchCtaReveal` requires removing its import and call in `Consultoria.tsx`,
`KitsGrid.tsx`, `HairCareSuite.tsx`, and `MalbecShowcase.tsx` (two call sites in the latter,
including the gold CTA which gains no replacement). Delete the hook file. Audit `index.css`
for `cta-emphasize` / `wa-pulse` usage that becomes dead or conflicting on touch.

## Performance

`transform` and `box-shadow` are compositor-friendly. `background-color` triggers paint but
not layout, on a single small element — negligible, and it is the property the effect
fundamentally depends on. No layout shift: scale uses `transform`, never width/height/margin.
At most one element animates at a time, by design.

## Accessibility

`prefers-reduced-motion: reduce` disables breathing entirely — the registry never grants the
attribute. A CSS-level guard also nulls the animation, so the feature is off even if a stale
attribute persists. This matches the existing guard at `index.css:343`.

## Verification

Real mobile device, slow scroll through the full Home page:

1. Exactly one CTA breathes at any moment — never two.
2. Nothing breathes on the Hero.
3. The black arrow becomes legible at breath peak.
4. The green matches desktop hover identity.
5. Breathing stops on scroll and resumes ~250ms after it settles.
6. Breathing stops immediately when the CTA leaves the viewport.
7. Desktop hover is byte-for-byte unchanged; nothing breathes on desktop.
8. Sustained 60 FPS in DevTools performance capture.
9. With reduced motion enabled, no breathing occurs anywhere.
