# Design Spec: Professional Polish — UX, UI & Conversion Refinement

**Date:** 2026-07-20
**Status:** Approved
**Scope:** Cinematic Commerce — S&C Beauty landing page polish

## Objective

Professional polish of the luxury e-commerce landing page without changing brand identity, colors, images, or core layout. Focus: Hero clarity, CTA conversion, mobile experience, typography hierarchy, spacing, and rhythm.

## Priority: A — Hero Clarity + CTA Conversion + Mobile Experience

### Hero Section (Home.tsx:172-302)

**Title restructure:**
- Change from: "Luxo Acessível" (gold) / "Para Todos." (white)
- Change to: "Perfumaria Premium" (gold, eyebrow-style) / "Entrega Expressa" (white, large) / "em BH e Região" (white, slightly smaller)
- Front-load the value proposition: brand category + delivery promise visible in <1 second

**Subtitle simplification:**
- Current: 3 dense lines, 56 words
- Proposed: "Grupo Boticário e Eudora. Peça pelo WhatsApp, receba em minutos."

**CTA simplification:**
- Remove "Explorar Ofertas" secondary link from directly below primary CTA (eliminates decision fatigue)
- Keep only primary WhatsApp CTA with morph icon
- Add subtle scroll-down indicator (animated chevron) to replace the removed secondary link

**Mobile brand overlay removal:**
- Remove the md:hidden brand identity overlay that duplicates nav content
- Saves ~180px of Hero real estate on mobile

**Mobile-specific adjustments:**
- Hero min-height: `min-h-screen` → `min-h-[85vh]` on mobile (shows hint of next section, reduces thumb travel)
- VIP delivery badge: bring closer to CTA on mobile (currently positioned far apart)

### TrustBar Section (TrustBar.tsx)

**Vertical compression:**
- `py-20 md:py-36` → `py-14 md:py-24`

**Header trim:**
- Eyebrow: "Por que escolher a S&C Beauty" → "Por que a S&C Beauty"
- Heading: "Confiança e Luxo em Cada Detalhe" → "Confiança em Cada Detalhe" (removes redundancy)

### Depoimentos Repositioning

- Move from section 10 to right after ComoFunciona (between steps and FAQ)
- Natural flow: "How it works → People saying it works → Any questions?"
- Reduce padding: `py-24 md:py-32` → `py-20 md:py-28`

## Design: Products & CTAs

### CTA Button Standardization

Three-tier CTA system:
1. **Primary (WhatsApp CTA):** `bg-whatsapp hover:bg-whatsapp-hover text-white` — Hero, CtaFinal
2. **Secondary (product purchase):** `bg-luxe-ink hover:bg-whatsapp text-white hover:text-black` — product sections (HairCare, Malbec, Consultoria, EditorialShowcase)
3. **Tertiary (inline link):** Underline link — only for navigation/utility, never for purchase actions

### Kits CTAs

- Upgrade from underline links to solid secondary buttons matching product sections

### BoticarioCarousel

- No product images to add (constraint)
- Strengthen typography hierarchy inside cards
- Better tag contrast, more prominent price/CTA area
- Subtle gold border-left accent on card hover

### Price Block Standardization

All product sections use consistent pattern:
```
PRICE (text-2xl font-semibold)
ou 3x sem juros · Pix 5% OFF (text-sm, single line)
```
Unify installment messaging (currently mixed 3x/6x across sections).

## Design: Typography, Spacing & Mobile

### Typography Hierarchy

- Section titles: standardize to `font-section text-4xl md:text-5xl`
- Eyebrows: consistently use `.eyebrow` utility
- Body text: `text-base md:text-lg`
- Paragraph max-width: cap at `max-w-xl` (36rem)

### Global Spacing Reduction

| Section | Current | Proposed |
|---------|---------|----------|
| TrustBar | `py-20 md:py-36` | `py-14 md:py-24` |
| HairCare | `py-32 md:py-40` | `py-24 md:py-32` |
| PerfumesHeader | `pt-32 md:pt-40 pb-8` | `pt-20 md:pt-28 pb-6` |
| Malbec | `py-36 md:py-44` | `py-28 md:py-36` |
| EditorialShowcase | `py-32 md:py-40` | `py-28 md:py-36` |
| BoticarioCarousel | `py-28 md:py-36` | `py-24 md:py-28` |
| Kits | `py-32 md:py-40` | `py-24 md:py-32` |
| Consultoria | `py-32 md:py-40` | `py-24 md:py-32` |
| ComoFunciona | `py-24 md:py-32` | `py-20 md:py-28` |
| Depoimentos | `py-24 md:py-32` | `py-20 md:py-28` |
| FAQ | `py-24 md:py-32` | `py-20 md:py-28` |
| CtaFinal | `py-36 md:py-44` | `py-28 md:py-36` |
| Footer | `py-24 md:py-32` | `py-20 md:py-28` |

Total page height reduction: ~25-30%.

### Mobile-Specific

- Hero: `min-h-screen` → `min-h-[85vh]` on mobile
- Carousel cards: reduce internal padding from `p-6 md:p-8` to `p-5 md:p-8`
- Kits grid: reduce mobile card padding from `p-10` to `p-6 md:p-10`
- Product split layouts: reduce mobile gap from `gap-12` to `gap-8`

### Microinteractions

- Product card image hover: add subtle `brightness-110`
- Button pressed state: reinforce active:scale-96 with `brightness-95`
- Floating WhatsApp button: label tooltip on first view, fades after 5s

### Copy Refinement

| Location | Current | Proposed |
|----------|---------|----------|
| Hero subtitle | 3 lines, 56 words | "Grupo Boticário e Eudora. Peça pelo WhatsApp, receba em minutos." |
| TrustBar eyebrow | "Por que escolher a S&C Beauty" | "Por que a S&C Beauty" |
| TrustBar heading | "Confiança e Luxo em Cada Detalhe" | "Confiança em Cada Detalhe" |
| HairCare subtitle | "Tecnologia de salão adaptada para..." | "Resultado de salão na sua rotina diária." |
| CtaFinal heading | "Não encontrou o que procura?" | "Catálogo completo à sua disposição." |

## Constraints (Non-Negotiable)

- Do NOT change: images, colors, branding, logo, visual identity, typography family, existing animations
- Do NOT add libraries or dependencies
- Do NOT reduce Lighthouse performance
- Section structure preserved; only spacing and ordering adjusted

## Exclusions (Deliberately NOT Changing)

- AntigravityParticles — already well-tuned, no performance concern
- ThemeContext — out of scope
- Font imports — already optimized
- WhatsApp link logic — already clean
- SendMorphIcon — already polished
- FloatingBadge — already refined
- LazySection wrapper — working correctly
- EditorialShowcase component — shared component, changes affect multiple sections; only spacing adjusted
- BoticarioCarousel product images — no images available to add
