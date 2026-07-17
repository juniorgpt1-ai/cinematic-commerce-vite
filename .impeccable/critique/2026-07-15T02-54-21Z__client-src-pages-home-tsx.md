---
target: client/src/pages/Home.tsx (full landing page)
total_score: 23
p0_count: 2
p1_count: 2
timestamp: 2026-07-15T02-54-21Z
slug: client-src-pages-home-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | SendMorphIcon solves click-feedback well; no scroll/section-position indicator on a long page |
| 2 | Match System / Real World | 3/4 | Strong locale fit (Pix, Uber Flash, BH); "inteligente" used as a stock modifier so often it starts reading like keyword-stuffing |
| 3 | User Control and Freedom | 2/4 | Nav is `position: absolute`, scrolls away after the hero and never returns; no back-to-top |
| 4 | Consistency and Standards | 2/4 | KitsGrid breaks the SendMorphIcon pattern and the "Olá!" greeting convention every other CTA uses; footer WhatsApp number is hardcoded, decoupled from the real env-driven number |
| 5 | Error Prevention | 2/4 | Placeholder WhatsApp number only logs `console.error` in prod — invisible to real visitors; every CTA breaks silently and simultaneously if unset |
| 6 | Recognition Rather Than Recall | 2/4 | Nav labels are clear while visible, but recognition value is lost once nav scrolls away for ~90% of the page |
| 7 | Flexibility and Efficiency of Use | 2/4 | Single funnel is correct for the model, but zero fallback contact channel (no tel:, no email) if WhatsApp deep link fails |
| 8 | Aesthetic and Minimalist Design | 3/4 | Genuinely tasteful and restrained; loses a point to residual eyebrow-label repetition and section count |
| 9 | Help Recognize/Diagnose/Recover from Errors | 1/4 | No fallback path anywhere if the WhatsApp link is misconfigured or the visitor has no WhatsApp |
| 10 | Help and Documentation | 3/4 | FAQ's 5 items genuinely answer the real pre-purchase objections (legitimacy, payment, returns) |
| **Total** | | **23/40** | **Acceptable — solid foundation, real gaps in error recovery and persistent navigation** |

## Anti-Patterns Verdict

**LLM assessment**: Not an immediate "AI made this" reaction — several deliberate, non-templated choices are visible: no gradient text, no default glassmorphism, TrustBar mixes stat/no-stat cards instead of 4 identical tiles, layouts alternate image-left/image-right, a full-width collage break in MalbecShowcase. But two specific tells survived: **tiny uppercase eyebrow labels still appear on roughly 6-7 of the page's sections** (TrustBar, HairCareSuite, PerfumesHeader, MalbecShowcase, EditorialShowcase/Floratta, BoticarioCarousel, KitsGrid) — worth noting this session's earlier layout pass already removed the eyebrow+rule template from 3 sections (Depoimentos, FAQ, Consultoria) specifically to break this monotony, so it's a partial fix, not an oversight; and **BoticarioCarousel's product cards use the textbook ghost-card pattern** (`border border-white/8` + `hover:shadow-[0_0_40px_-8px_...]`) — a named Codex-specific defect in the skill's own ban list, applied uniformly across all 6 cards. Also present: numbered scaffolding ("COMBO 01/02/03" in KitsGrid, "Nº 01"/"Nº 02" in HairCareSuite).

**Deterministic scan**: `detect.mjs --json` returned 4 findings, all `overused-font` on Plus Jakarta Sans (client/index.html:46,55; fonts.css:21,33) — exit code 2. This is the same finding investigated twice already this session (once during the delight command, once during typeset, both with independent reasoning): Plus Jakarta Sans is self-hosted, paired against two distinct serif display faces, and used consistently as the body/UI workhorse — a deliberate, already-shipped brand choice, not an actionable defect. No other antipattern classes were caught by the detector in this file set — the mechanical floor is clean.

**Visual overlays**: Unavailable — no browser automation tool exists in this environment. No live-server injection was attempted; this critique is source-code-only for both assessments.

## Overall Impression

The page is more deliberately art-directed than it first appears — the typography pairing, layout rhythm, and the SendMorphIcon click-feedback system all show real craft, not default output. But the single biggest gap is structural, not decorative: **the nav physically disappears after the hero and never comes back**, and **the site's only failure mode (a misconfigured WhatsApp number) is invisible to every real visitor while quietly disabling 100% of the conversion path**. Those two issues matter more than any remaining visual polish, because they're the difference between "looks premium" and "actually converts."

## What's Working

1. **SendMorphIcon / useSendMorph system** — a well-considered, reduced-motion-safe click-feedback layer solving a real problem specific to this business model: external-navigation CTAs otherwise give zero visible confirmation. Applied consistently across nearly every CTA.
2. **WhatsappFloating persistent button** — `fixed bottom-6 right-6`, survives the entire scroll, self-reveals a label after the hero. It's quietly doing all the navigational work the missing sticky nav should be doing, and it happens to be the single most important element on the page.
3. **Layout variation across product showcases** — alternating image sides, mixed carousel/single-image treatments, and the full-width collage break in MalbecShowcase show genuine composition thinking, not one component stamped down the page repeatedly.

## Priority Issues

**[P0] Silent, page-wide CTA failure if `VITE_WHATSAPP_NUMBER` is unset**
Why it matters: every conversion point (7+ CTAs) routes through `waLink()`. If the env var isn't set in production, all of them point at a nonexistent placeholder number, and the only safeguard is a `console.error` no real visitor will ever see — the page looks and behaves perfectly while converting 0% of traffic.
Fix: make the failure visible beyond the console — a dev/staging banner, or blocking the production build when the placeholder is still active, not just logging.
Suggested command: `$impeccable harden`

**[P0] Footer displays fabricated business-legitimacy data**
Why it matters: a placeholder CNPJ, a dead Instagram link (`href="#"`), and a hardcoded WhatsApp number disconnected from the real env-driven logic sit directly beneath the FAQ's explicit legitimacy claims ("Somos revendedores oficiais... nota fiscal completa") — the peak-end moment for a business whose core obstacle is stranger-trust. Shipping fake registration data here undercuts the exact claim the page spends 12 sections building.
Fix: pull the real CNPJ, IG handle, and phone number into the same env-driven source `waLink()` uses, or remove the fields until real data exists.
Suggested command: `$impeccable clarify`

**[P1] Nav is `position: absolute`, not sticky — vanishes after the hero for the rest of the page**
Why it matters: on a 13-section page, the nav (and its WhatsApp CTA) scrolls away after roughly one viewport and never returns. The `.nav-scroll.scrolled` blur/shadow CSS already exists and was clearly built for a sticky header that was never actually made sticky.
Fix: change the header to `sticky top-0` (or `fixed` with body padding compensation), keeping the existing scroll-triggered blur treatment.
Suggested command: `$impeccable layout`

**[P1] Auto-advancing carousels never pause and silently override manual slide selection**
Why it matters: MalbecShowcase and EditorialShowcase both run `setInterval(nextSlide, 4000)` with no pause on interaction, and clicking a dot to manually select a slide doesn't clear the interval — so a user comparing product shots gets silently flipped back within 4 seconds. Also a WCAG 2.2.2 (Pause/Stop/Hide) gap.
Fix: clear and restart the interval on manual dot selection; pause on hover/focus.
Suggested command: `$impeccable harden`

**[P2] Touch targets on secondary/tertiary links fall under 44×44px**
Why it matters: primary CTAs are all comfortably sized, but nav links (mobile and desktop), the "Explorar Ofertas" hero secondary link, "Pedir Combo"/product-card CTAs, and both footer contact links rely on inline text height alone with no padding or min-height — inconsistent with the explicit 44px inline styles already used on the carousel dot indicators elsewhere in the same codebase.
Fix: add padding or `min-height`/`min-width: 44px` to the listed text links, matching the pattern already established on the dot indicators.
Suggested command: `$impeccable adapt`

**[P2] Lazy-loaded sections collapse to zero height before load, guaranteeing layout shift**
Why it matters: every section is wrapped in `<Suspense fallback={null}>` via `LazySection`, so each not-loaded → loaded transition is a CLS jump — content below snaps up then down, the wrong texture for a distracted mobile user mid-scroll.
Fix: give `LazySection` a reserved min-height or lightweight skeleton instead of collapsing to zero height.
Suggested command: `$impeccable optimize`

**[P2] Eyebrow label color override drops below WCAG AA contrast**
Why it matters: the `.eyebrow` utility defaults to `--luxe-gold-deep`, but several sections (HairCareSuite, MalbecShowcase, EditorialShowcase/Floratta) override it to the lighter `text-luxe-gold`. Calculated contrast of `#9A7B50` on the `#faf9f6` background is ≈3.75:1 — below the 4.5:1 AA threshold for text this size (12.48px/0.78rem), despite the 600 weight.
Fix: drop the `text-luxe-gold` override on eyebrow labels, or verify/adjust to an AA-compliant gold shade.
Suggested command: `$impeccable harden`

## Persona Red Flags

**Jordan (Confused First-Timer)**: The mobile header shows O Boticário/Eudora/QDB/Multi B/Vult/O.U.i brand logos with zero explanatory text — the "Revendedor Oficial Grupo Boticário" disclaimer only exists in the desktop header (`hidden md:block`). A mobile-first visitor (the stated primary audience) sees official-looking brand logos above the fold with no reseller disclaimer anywhere, and could plausibly believe this is an official brand storefront. Once Jordan scrolls past the hero, the nav they might use to understand site structure has physically disappeared.

**Riley (Deliberate Stress Tester)**: Riley manually selects slide 2 of the Malbec carousel to read the bottle-detail shot — it auto-reverts to slide 1 within 4 seconds because the interval is never cleared on manual interaction. Riley then tries the footer's displayed WhatsApp number as a manual fallback — it's the fake placeholder, a dead end, while the real functioning number appears as plain copyable text nowhere on the page.

**Casey (Distracted Mobile User)**: Casey flicks quickly down the page on a spotty connection. Because every section collapses to zero height pre-load, sections she's about to reach can still be mid-fetch, so page height changes under her thumb — a tap aimed at a CTA can land on whatever shifted into that position instead. The one thing that reliably works for her: the fixed WhatsappFloating button, thumb-reachable through the entire scroll regardless of what's loaded.

## Minor Observations

- KitsGrid is the only CTA cluster that skips SendMorphIcon and the only one whose WhatsApp messages omit the "Olá!" greeting every other message uses.
- Desktop nav includes a "Mais Amados" link to BoticarioCarousel; the mobile nav does not — a category reachable via nav on desktop but not on the platform this audience actually uses.
- FAQ accordion state always resets to item 0 open on any remount/refresh — trivial, but not persisted.

## Questions to Consider

1. If the nav disappears after one scroll and the floating WhatsApp button is already doing all the navigational and conversion work, is a traditional top nav still earning its place — or should the floating button evolve into the primary navigation system, with real section-jump affordances?
2. The page currently asks a first-time, zero-context visitor to message a stranger before any trust content appears (TrustBar's "Genuínos" nota-fiscal messaging comes after the hero). What would it cost to move one trust signal into the hero itself?
3. Given the brand promise is explicitly "not a boutique with a velvet rope," does a 13-section, 12-SKU single scroll actually serve a WhatsApp-native audience used to deciding fast — or would category-based jump-in match that audience's behavior better than scrolling past everything?
