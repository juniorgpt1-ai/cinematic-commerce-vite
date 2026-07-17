---
name: Maison Fragrance
description: Accessible-luxury fragrance & haircare reselling via WhatsApp, with VIP 1-hour delivery in Belo Horizonte
colors:
  luxe-bg: "#faf9f6"
  luxe-ink: "#111111"
  luxe-ink-soft: "#444444"
  luxe-gold: "#9A7B50"
  luxe-gold-deep: "#7A5E3A"
  luxe-gold-soft: "#B89A6A"
  luxe-gold-light: "#d4c4a5"
  luxe-black: "#0a0a0a"
  luxe-bordo: "#3d0c11"
  whatsapp: "#25d366"
  whatsapp-hover: "#1ebe57"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 11vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Playfair Display, Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.30em"
rounded:
  xs: "2px"
  sm: "4px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#000000"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.whatsapp-hover}"
  button-secondary:
    backgroundColor: "{colors.luxe-ink}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "16px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#000000"
  card-product:
    backgroundColor: "{colors.luxe-black}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "32px"
  badge-floating:
    backgroundColor: "#ffffff"
    textColor: "{colors.luxe-black}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: Maison Fragrance

## 1. Overview

**Creative North Star: "A Boutique de Bairro" (The Neighborhood Boutique)**

Maison Fragrance sells genuine Grupo Boticário and Eudora products through WhatsApp with 1-hour VIP delivery in Belo Horizonte. The system's entire job is to feel like a trusted person you'd text, not a storefront you'd browse: warm serif headlines paired with a quiet, restrained sans body, a single gold accent used sparingly, and motion that acknowledges every action (a click, a scroll, a carousel change) without ever performing for its own sake. The page explicitly rejects the two failure modes on either side of it: the "digital shelf" of a marketplace app (dense grids, discount badges, primary colors, promotional noise) and the borrowed-prestige theater of aspirational European parfumerie (this is not pretending to be Paris). It is a real, local business, and the design says so plainly — genuine over aspirational, always.

**Key Characteristics:**
- Editorial serif display type (Cormorant Garamond, Playfair Display) paired with a quiet humanist sans body (Plus Jakarta Sans at light weight) — contrast carries the brand's premium register, not saturation or ornament.
- One accent color (aged gold) used at low surface coverage; WhatsApp's own brand green is the only other saturated color, reserved exclusively for the conversion action.
- Flat, near-sharp geometry (2px corners is the default, not 16-24px) with glow reserved for momentary state, never ambient decoration.
- Every WhatsApp CTA is a locally-scoped, specific ask ("I want the Malbec Cologne with 1h delivery"), never a generic "Buy now" — the conversation starts in context.

## 2. Colors

A restrained palette: one warm neutral background, one near-black ink, one gold accent at three depths, one deep wine used exclusively as a promotional signal, and WhatsApp's own green reserved for the single conversion action.

### Primary
- **Dourado Envelhecido** (#9A7B50): the brand's one accent color. Used for the primary eyebrow/label token, note-pyramid hover states, and thin decorative rules (`.gold-rule`). Never fills more than a hairline or a small badge — it accents, it doesn't cover.
- **Dourado Profundo** (#7A5E3A): the AA-contrast-safe default for the `.eyebrow` label utility on light backgrounds. This is the color eyebrow labels resolve to unless explicitly overridden for a dark-background context.
- **Dourado Suave** (#B89A6A): the gold used against dark surfaces (BoticarioCarousel, KitsGrid, CtaFinal) — noticeably lighter than the deep variant so it holds contrast against near-black backgrounds.

### Secondary
- **Vinho Profundo** (#3d0c11): reserved as a promotional/urgency signal — currently the one place it appears is a real markdown tag (an actual discounted product), never applied decoratively or to a tag that isn't backed by a genuine offer.

### Neutral
- **Marfim Suave** (#faf9f6): the page background. A true warm off-white, not a saturated cream — the brand's warmth comes from typography and imagery, not the body background tint.
- **Tinta Quase-Preta** (#111111): primary text and the fill color for filled "commit" buttons (`bg-luxe-ink`, e.g. product CTAs before their WhatsApp-green hover state).
- **Tinta Suave** (#444444): secondary/supporting text where full ink weight would be too heavy.
- **Preto Real** (#0a0a0a): true black, used for the Hero and other full-dark section backgrounds (BoticarioCarousel, KitsGrid, CtaFinal).

### Named Rules
**The One Accent Rule.** Gold is the only decorative color in the system. It never appears as a background fill beyond a thin badge or hairline rule — it accents typography and thin dividers, never surfaces.

**The Green-Means-Go Rule.** WhatsApp's brand green (#25d366) is reserved exclusively for the primary conversion action. No other element on the page uses this color, so its appearance always means "this is the button that starts the sale."

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, Times New Roman fallback)
**Body Font:** Plus Jakarta Sans (with system-ui fallback)
**Section Font:** Playfair Display (with Cormorant Garamond, Georgia fallback)

**Character:** A quiet humanist sans carries nearly all body and UI text at a light weight (300), while two related-but-distinct serif display faces (a delicate Cormorant for the Hero, a slightly firmer Playfair for section headlines) carry all the brand's personality. The sans never competes for attention; the serifs never appear below headline size.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 11vw, 6rem)`, line-height 0.85): the Hero H1 only. One instance on the entire page.
- **Headline** (600, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.08): every section's `<h2>`. Standardized to one size across the page as of this session's layout pass — CtaFinal is the one deliberate exception, sized up to `text-7xl` as the page's closing climax.
- **Title** (700, 1.25rem): sub-headings within a section (product names in cards, trust-bar item titles) and the `.eyebrow`-adjacent bold labels.
- **Body** (300, 1.125rem, line-height 1.625, max-width tuned to stay under 75ch): all paragraph copy. Deliberately light weight — the lower stroke contrast reads warmer than a standard 400-weight sans.
- **Label** (600, 0.78rem, letter-spacing 0.30em, uppercase): the `.eyebrow` utility and all tracked-out badges, nav links, and footer meta. The wide tracking is a deliberate, consistent voice across the whole page, not a one-off flourish — but never applied below ~11px, where 0.30em starts to feel sparse rather than editorial.

### Named Rules
**The Two-Serif Rule.** Cormorant Garamond is reserved for the Hero H1 alone; every other heading uses Playfair Display. Don't reach for Cormorant outside the Hero — it dilutes the one moment it's meant to mark.

**The 75ch Ceiling.** No body paragraph exceeds a ~75-character measure, even inside wide section containers. Constrain with `max-w-*` independent of the parent's width.

## 4. Elevation

Flat by default, glow only as a response to state — never ambient decoration. Nearly every surface in the system is a plain fill or a single hairline border; no drop shadows exist as a resting-state property anywhere in the page. Depth and hierarchy come from background-color changes between sections (light `luxe-bg` sections alternating with dark `luxe-black`/`luxe-ink` sections), not from shadow layering.

### Shadow Vocabulary
- **Glow-gold** (`box-shadow: 0 0 Npx rgb(var(--luxe-glow-rgb) / alpha)`): the one shadow family in the system, token-driven from a single `--luxe-glow-rgb: 201 168 76` channel value. Used exclusively as a *state* signal — the primary CTA's ambient pulse, the one-shot emphasis flash when a CTA scrolls into view, and the carousel dot's 4-second auto-advance countdown ring. Never applied to a resting card or button.
- **Card border** (`border: 1px solid`, opacity 10-20%): the sole depth cue for product cards at rest. On hover, the border's opacity and color shift (toward gold) — the card never gains a shadow, by design (a prior "1px border + wide soft shadow" combination was identified and removed as a "ghost card" anti-pattern).

### Named Rules
**The One-Signal Rule.** A surface gets a border OR a glow to signal state change, never both at once. Combining a border-color shift with an added shadow on the same hover state is the exact anti-pattern this system explicitly avoids.

**The Earned-Glow Rule.** Glow effects only fire in direct response to a real state change (hover, focus, scroll-into-view, an active carousel countdown) — never as a static, always-on ambient effect on a resting element.

## 5. Components

Contained and decisive: every interactive element commits to one clear geometry (2px corners, not soft/rounded) and one clear state signal, with tactile press feedback (`scale(0.96)` on `:active`) applied consistently across every CTA on the page.

### Buttons
- **Shape:** Near-sharp corners (2px radius) on filled buttons; text-link CTAs use an underline instead of a border/fill.
- **Primary (`button-primary`):** WhatsApp green fill, black text, `16px 32px` padding — the only button style reserved for the actual "message us" action.
- **Secondary (`button-secondary`):** Ink-black fill, white text, transitioning to the primary green fill on hover — used for product-specific CTAs ("Garantir meu Malbec") that still resolve to the same WhatsApp action.
- **Hover / Focus:** All buttons scale to 1.02 on hover and 0.96 on `:active` (`.btn-hover-scale`), with the scale-down on press pausing any ambient glow animation so the press reads clearly. Focus-visible state is a 2px solid gold outline, applied globally.
- **Icon feedback:** The primary WhatsApp CTAs use a three-phase icon morph (message → paper-plane → checkmark, `SendMorphIcon` / `useSendMorph`) as click acknowledgment, since the actual action navigates away to WhatsApp with no other visible confirmation.

### Cards (`card-product`)
- **Corner Style:** 16px radius — the one deliberately softer surface in the system (product carousel cards), sitting at the upper bound of what the system permits.
- **Background:** Near-black fill (`bg-black/50` at rest, darkening further on hover).
- **Shadow Strategy:** None — border-opacity shift only, per the Elevation section's One-Signal Rule.
- **Border:** 1px, 10% white at rest, shifting toward 60% gold on hover.
- **Internal Padding:** 24-32px (`p-6 md:p-8`).

### Badges (`badge-floating`)
- **Style:** White fill, near-black text, full-pill radius, gentle up-down float animation. Used as a floating callout layered over hero imagery ("Best Seller", "Entrega VIP · Em até 1h").
- **State:** Static — badges are informational, not interactive.

### Navigation
- Fixed header (pinned through the entire scroll, not just the hero), transparent at rest, gaining a blurred dark background once the user scrolls past ~80px. Nav links are uppercase, tracked-out labels matching the Label typography role. Mobile and desktop navs carry the same link set — an information-architecture mismatch between the two was identified and closed in this session.

### Signature Component: WhatsApp Floating Action Button
The one persistent piece of navigation on the page. Fixed bottom-right, pulses continuously to stay noticeable, and self-reveals a text label ("Fale com a gente") once per session, the first time a visitor scrolls past the Hero — a single, restrained moment of proactive help rather than a persistent distraction.

## 6. Do's and Don'ts

### Do:
- **Do** keep gold to a hairline, a badge, or typography — never a surface fill (**The One Accent Rule**).
- **Do** reserve WhatsApp green exclusively for the primary conversion action (**The Green-Means-Go Rule**).
- **Do** use Cormorant Garamond only for the Hero H1; every other heading is Playfair Display (**The Two-Serif Rule**).
- **Do** give every interactive element one clear state signal — border-shift OR glow, never both (**The One-Signal Rule**).
- **Do** write every WhatsApp CTA message specific to what the visitor just read, never a generic "Buy now" (the pattern that already holds across all 7+ CTAs on the page).
- **Do** apply the same tactile press feedback (`scale(0.96)` on `:active`, pausing any ambient animation) to every clickable CTA, filled or text-link.

### Don't:
- **Don't** pair a 1px border with a wide, soft box-shadow on the same element — the "ghost card" pattern was identified and removed from the product carousel this session; don't reintroduce it.
- **Don't** add a tiny uppercase tracked eyebrow above every section as a reflex — it's already present on more sections than ideal; treat it as a deliberate choice per section, not default scaffolding.
- **Don't** let `--luxe-gold` (#9A7B50) sit at default opacity on small text against the `#faf9f6` background — it fails WCAG AA (~3.75:1) at label sizes. Use `--luxe-gold-deep` for text-sized gold on light backgrounds.
- **Don't** ship a dense marketplace grid, discount badges, or promotional noise — the brand explicitly rejects the "digital shelf" aesthetic of Mercado Livre / iFood-style templates (per PRODUCT.md's anti-references).
- **Don't** reach for aspirational, borrowed-European-luxury language or imagery — this is a real Belo Horizonte business with real delivery times, not a haute parfumerie fantasy.
- **Don't** bolt "inteligente" onto every noun as a reflexive modifier. "Luxo Inteligente" is the one deliberate, FAQ-defined brand phrase — repeating the word elsewhere (a fragrance note, a hair ingredient, a testimonial quote) dilutes it into keyword-stuffing.
