# Professional Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the S&C Beauty landing page — tighten Hero messaging, compress section spacing (~25%), standardize CTAs, reposition social proof, and add subtle microinteractions. Zero dependency changes.

**Architecture:** 10 targeted file edits on existing React components + CSS. No new files, no structural refactors. All changes are spacing value swaps, text replacements, or small CSS utility additions. Build verification via `pnpm build`.

**Tech Stack:** React 19, TypeScript 5.6, Tailwind CSS v4, Vite 7

## Global Constraints

- No image, color, branding, font-family, or animation changes
- No new dependencies or libraries
- Must pass `pnpm build` (Vite + esbuild) cleanly
- Must pass `pnpm check` (TypeScript) cleanly
- Must preserve existing animation behavior and reduced-motion support
- Section ordering change (Depoimentos) must preserve all lazy-loading boundaries

---

### Task 1: Hero Section Polish

**Files:**
- Modify: `client/src/pages/Home.tsx:172-302`

**Interfaces:**
- Consumes: none (first task)
- Produces: updated Hero component with restructured title, simplified subtitle, single CTA, removed mobile brand overlay, mobile height adjustment

- [ ] **Step 1: Restructure Hero title**

Replace the h1 block in the Hero component. Current (lines 240-248):
```tsx
<h1 className="font-display text-[clamp(2.75rem,11vw,6rem)] leading-[0.85] md:leading-[1.0] tracking-tight font-bold">
  <span className="text-luxe-gold">
    Luxo Acessível
  </span>
  <br />
  <span className="text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
    Para Todos.
  </span>
</h1>
```

Replace with:
```tsx
<h1 className="font-display text-[clamp(2.75rem,11vw,6rem)] leading-[0.85] md:leading-[1.0] tracking-tight font-bold">
  <span className="block text-[clamp(0.85rem,3vw,1.15rem)] tracking-[0.24em] uppercase font-sans font-semibold text-luxe-gold-soft mb-3 md:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
    Perfumaria Premium
  </span>
  <span className="text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
    Entrega Expressa
  </span>
  <br />
  <span className="text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
    em BH e Região
  </span>
</h1>
```

- [ ] **Step 2: Simplify Hero subtitle**

Replace the subtitle paragraph (lines 250-253):
```tsx
<p className="mt-8 max-w-xl text-lg md:text-lg text-white/70 font-sans font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
  Perfumaria e hair care premium do Grupo Boticário com entrega expressa para <strong className="text-white font-semibold">BH e regiões</strong>.
  Peça agora pelo WhatsApp e receba seu pedido em minutos, com segurança e preço justo.
</p>
```

Replace with:
```tsx
<p className="mt-6 max-w-lg text-base md:text-lg text-white/70 font-sans font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
  Grupo Boticário e Eudora. Peça pelo WhatsApp, receba em minutos.
</p>
```

- [ ] **Step 3: Remove "Explorar Ofertas" secondary link and replace with scroll chevron**

Remove the "Explorar Ofertas" link block (lines 275-280):
```tsx
<a
  href="#haircare"
  className="relative inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-white/85 hover:text-luxe-gold-soft border-b border-white/30 hover:border-luxe-gold-soft pb-1 transition-colors before:absolute before:inset-[-12px] before:content-[''] md:ml-0 ml-4"
>
  Explorar Ofertas
</a>
```

Replace with a scroll-down indicator:
```tsx
<div className="hidden md:flex justify-center mt-6">
  <span className="animate-bounce text-white/40">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </span>
</div>
```

- [ ] **Step 4: Remove mobile brand identity overlay**

Remove the entire mobile brand overlay block (lines 203-226):
```tsx
{/* MOBILE: Brand identity — overlaid on Hero, scrolls away with Hero */}
<div className="md:hidden absolute top-10 left-0 right-0 z-20">
  ...entire block including brand logos...
</div>
```

- [ ] **Step 5: Adjust mobile Hero min-height**

Change the section element (line 181):
```tsx
// From:
<section className="relative min-h-screen w-full bg-[#070707] text-white overflow-hidden flex flex-col justify-end">
// To:
<section className="relative min-h-[85vh] md:min-h-screen w-full bg-[#070707] text-white overflow-hidden flex flex-col justify-end">
```

- [ ] **Step 6: Bring VIP badge closer to CTA on mobile and adjust padding**

Change the Hero content wrapper padding (line 228):
```tsx
// From:
<div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 pt-48 pb-14 md:pt-48 md:pb-32 flex flex-col justify-end flex-1 md:grow-0">
// To:
<div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 pt-36 md:pt-48 pb-10 md:pb-32 flex flex-col justify-end flex-1 md:grow-0">
```

Move the mobile VIP badge (lines 283-290) to appear directly after the CTA button section. Find the closing of the CTA div (line 281 closes `</div>` after "Explorar Ofertas") — after removing that link, place the mobile FloatingBadge right after the `<span className="text-xs...">Resposta em minutos</span>` and before the closing `</div>` of the CTA container. Result structure:

```tsx
<div>
  <div className="mt-10 md:mt-12 flex flex-col items-start gap-2">
    <a ref={ctaRef} ...className="PrimaryWhatsAppCTA...">...</a>
    <span className="text-xs text-white/55...">Resposta em minutos</span>
  </div>

  <div className="md:hidden mt-4">
    <FloatingBadge className="border-white/30 bg-white/95 px-2.5 py-1">
      <Timer className="size-3 text-luxe-black" />
      <span className="text-[11px] tracking-[0.14em] uppercase text-luxe-black font-semibold">
        Entrega VIP · Em até 1h para BH e Região
      </span>
    </FloatingBadge>
  </div>
</div>
```

- [ ] **Step 7: Remove the old mobile badge location (was standalone after Explorar Ofertas link, now integrated)**

Delete the standalone mobile badge block (old lines 283-290, now gone because it was moved above):
```tsx
<div className="md:hidden mt-3">
  <FloatingBadge ...>...</FloatingBadge>
</div>
```
(If already removed during restructuring, verify the DOM is clean — no duplicate badge.)

- [ ] **Step 8: Verify build**

Run: `pnpm check`
Expected: No TypeScript errors

Run: `pnpm build`
Expected: Clean build output

- [ ] **Step 9: Commit**

```bash
git add client/src/pages/Home.tsx
git commit -m "polish: restructure Hero title, simplify copy, streamline mobile CTA flow"
```

---

### Task 2: TrustBar Polish

**Files:**
- Modify: `client/src/components/sections/TrustBar.tsx`

**Interfaces:**
- Consumes: none
- Produces: TrustBar with compressed vertical padding and trimmed heading copy

- [ ] **Step 1: Compress vertical padding**

Change line 83:
```tsx
// From:
<div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-36 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-24 relative z-10">
```

- [ ] **Step 2: Trim heading copy**

Change the eyebrow text (line 88):
```tsx
// From:
Por que escolher a S&C Beauty
// To:
Por que a S&C Beauty
```

Change the h2 text (line 92):
```tsx
// From:
Confiança e Luxo em{" "}
<span className="italic font-light">Cada</span> Detalhe
// To:
Confiança em{" "}
<span className="italic font-light">Cada</span> Detalhe
```

- [ ] **Step 3: Reduce header margins proportionally**

Change the header bottom margin (line 85):
```tsx
// From:
<div ref={headerRef} className="reveal-up text-center mb-14 md:mb-20">
// To:
<div ref={headerRef} className="reveal-up text-center mb-10 md:mb-14">
```

Change h2 top margin (line 91):
```tsx
// From:
<h2 className="mt-6 md:mt-8 font-section text-5xl md:text-5xl font-semibold leading-[1.05] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
// To:
<h2 className="mt-4 md:mt-6 font-section text-5xl md:text-5xl font-semibold leading-[1.05] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
```

Change gold rule top margin (line 95):
```tsx
// From:
<span className="gold-rule mt-8 md:mt-10 mx-auto" />
// To:
<span className="gold-rule mt-6 md:mt-8 mx-auto" />
```

- [ ] **Step 4: Build check**

Run: `pnpm check && pnpm build`
Expected: Clean

- [ ] **Step 5: Commit**

```bash
git add client/src/components/sections/TrustBar.tsx
git commit -m "polish: compress TrustBar spacing, trim heading copy"
```

---

### Task 3: Product Sections Spacing + Copy (HairCare, PerfumesHeader, Malbec, EditorialShowcase)

**Files:**
- Modify: `client/src/components/sections/HairCareSuite.tsx`
- Modify: `client/src/components/sections/PerfumesHeader.tsx`
- Modify: `client/src/components/sections/MalbecShowcase.tsx`
- Modify: `client/src/components/sections/EditorialShowcase.tsx`

**Interfaces:**
- Consumes: none
- Produces: 4 section components with compressed spacing and refined copy

- [ ] **Step 1: HairCareSuite — spacing + copy**

File: `client/src/components/sections/HairCareSuite.tsx`

Line 18 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-4 sm:px-6 py-32 md:py-40 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 relative z-10">
```

Line 19 — header bottom margin:
```tsx
// From:
<div ref={headerRef} className="reveal-up max-w-3xl mb-20 text-center mx-auto">
// To:
<div ref={headerRef} className="reveal-up max-w-3xl mb-14 text-center mx-auto">
```

Line 26 — subtitle copy:
```tsx
// From:
Tecnologia de salão adaptada para a sua rotina diária. A sofisticação da alta performance agora acessível na sua casa.
// To:
Resultado de salão na sua rotina diária.
```

Line 31 — product grid gap:
```tsx
// From:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32 md:mb-40">
// To:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center mb-24 md:mb-32">
```

Line 125 (second product grid) — gap:
```tsx
// From:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
// To:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
```

Line 102 — price installment text (standardize to 3x):
```tsx
// From:
ou <span className="font-semibold text-luxe-ink">3x sem juros</span>
// (Stays 3x — already correct for HairCare. No change needed.)
```
(Verify both product blocks consistently use "3x sem juros" — check lines 104 and 198. Both already show 3x. OK.)

- [ ] **Step 2: PerfumesHeader — spacing**

File: `client/src/components/sections/PerfumesHeader.tsx`

Line 7 — section padding:
```tsx
// From:
<section id="perfumes" className="bg-luxe-gradient pt-32 md:pt-40 pb-8 border-b border-luxe-line/20 relative overflow-hidden">
// To:
<section id="perfumes" className="bg-luxe-gradient pt-20 md:pt-28 pb-6 border-b border-luxe-line/20 relative overflow-hidden">
```

- [ ] **Step 3: MalbecShowcase — spacing + price standard**

File: `client/src/components/sections/MalbecShowcase.tsx`

Line 39 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-36 md:py-44 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-28 md:py-36 relative z-10">
```

Line 41 — grid gap:
```tsx
// From:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
// To:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
```

Line 179 — collage margin:
```tsx
// From:
<div ref={collageRef} className="reveal-scale mt-24 md:mt-32">
// To:
<div ref={collageRef} className="reveal-scale mt-20 md:mt-28">
```

Line 158 — price installment (standardize to 3x):
```tsx
// From:
ou <span className="text-luxe-ink font-semibold">6x sem juros</span>
// To:
ou <span className="text-luxe-ink font-semibold">3x sem juros</span>
```

- [ ] **Step 4: EditorialShowcase — spacing + price standard**

File: `client/src/components/sections/EditorialShowcase.tsx`

Line 74 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-28 md:py-36 relative z-10">
```

Line 77 — grid gap:
```tsx
// From:
className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
// To:
className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center ${
```

Line 197 — price installment (standardize to 3x):
```tsx
// From:
ou <span className="text-luxe-ink font-semibold">6x sem juros</span>
// To:
ou <span className="text-luxe-ink font-semibold">3x sem juros</span>
```

- [ ] **Step 5: Build check**

Run: `pnpm check && pnpm build`
Expected: Clean

- [ ] **Step 6: Commit**

```bash
git add client/src/components/sections/HairCareSuite.tsx client/src/components/sections/PerfumesHeader.tsx client/src/components/sections/MalbecShowcase.tsx client/src/components/sections/EditorialShowcase.tsx
git commit -m "polish: compress product section spacing, standardize to 3x installments, refine copy"
```

---

### Task 4: Secondary Sections Spacing (BoticarioCarousel, KitsGrid, Consultoria, ComoFunciona)

**Files:**
- Modify: `client/src/components/sections/BoticarioCarousel.tsx`
- Modify: `client/src/components/sections/KitsGrid.tsx`
- Modify: `client/src/components/sections/Consultoria.tsx`
- Modify: `client/src/components/sections/ComoFunciona.tsx`

**Interfaces:**
- Consumes: none
- Produces: 4 sections with compressed spacing, Kits CTA button upgrade, carousel card polish

- [ ] **Step 1: BoticarioCarousel — spacing + card polish**

File: `client/src/components/sections/BoticarioCarousel.tsx`

Line 125 — section padding:
```tsx
// From:
<section id="mais-amados" className="bg-luxe-dark-gradient text-white py-28 md:py-36 relative overflow-hidden border-b border-luxe-line/30">
// To:
<section id="mais-amados" className="bg-luxe-dark-gradient text-white py-24 md:py-28 relative overflow-hidden border-b border-luxe-line/30">
```

Line 175 — card padding (mobile reduction):
```tsx
// From:
className="reveal-up min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[340px] bg-black/50 border border-white/10 p-6 md:p-8 rounded-2xl snap-start flex flex-col justify-between group hover:border-luxe-gold/60 hover:bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
// To (add border-left accent on hover):
className="reveal-up min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[340px] bg-black/50 border border-white/10 p-5 md:p-8 rounded-2xl snap-start flex flex-col justify-between group hover:border-luxe-gold/60 hover:bg-black/70 hover:border-l-luxe-gold/60 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
```

Line 194 — description min-height (reduce to tighten cards):
```tsx
// From:
<p className="mt-4 text-white/65 text-sm sm:text-base font-sans font-light leading-relaxed min-h-[72px]">
// To:
<p className="mt-3 text-white/65 text-sm sm:text-base font-sans font-light leading-relaxed min-h-[60px]">
```

- [ ] **Step 2: KitsGrid — spacing + CTA upgrade**

File: `client/src/components/sections/KitsGrid.tsx`

Line 36 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
```

Line 51 — card padding (mobile reduction):
```tsx
// From:
className="reveal-up bg-luxe-ink p-10 flex flex-col justify-between group hover:bg-black/90 transition-colors duration-300"
// To:
className="reveal-up bg-luxe-ink p-6 md:p-10 flex flex-col justify-between group hover:bg-black/90 transition-colors duration-300"
```

Line 85-93 — CTA upgrade from underline link to solid button:
```tsx
// From (lines 85-93):
<a
  href={waLink(k.msg)}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Pedir ${k.name} no WhatsApp`}
  className="relative btn-hover-scale inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-luxe-gold-soft border-b border-luxe-gold-soft/60 pb-1 group-hover:text-luxe-gold-soft group-hover:border-luxe-gold-soft transition-colors before:absolute before:inset-[-8px] before:content-['']"
>
  Pedir Combo <ArrowRight className="size-3.5" />
</a>
// To:
<a
  href={waLink(k.msg)}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Pedir ${k.name} no WhatsApp`}
  className="btn-hover-scale inline-flex items-center justify-center gap-2 bg-luxe-ink hover:bg-whatsapp text-luxe-gold-soft hover:text-black border border-luxe-gold-soft/30 hover:border-whatsapp px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
>
  Pedir Combo <ArrowRight className="size-3.5" />
</a>
```

Line 82 — price installment standardize:
```tsx
// From:
6x sem juros <span className="text-luxe-gold-soft">·</span> Pix 5% OFF
// To:
3x sem juros <span className="text-luxe-gold-soft">·</span> Pix 5% OFF
```

- [ ] **Step 3: Consultoria — spacing**

File: `client/src/components/sections/Consultoria.tsx`

Line 16 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
```

Line 17 — grid gap:
```tsx
// From:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
// To:
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
```

- [ ] **Step 4: ComoFunciona — spacing**

File: `client/src/components/sections/ComoFunciona.tsx`

Line 29 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
```

- [ ] **Step 5: Build check**

Run: `pnpm check && pnpm build`
Expected: Clean

- [ ] **Step 6: Commit**

```bash
git add client/src/components/sections/BoticarioCarousel.tsx client/src/components/sections/KitsGrid.tsx client/src/components/sections/Consultoria.tsx client/src/components/sections/ComoFunciona.tsx
git commit -m "polish: compress spacing on carousel, kits, consultoria, como-funciona; upgrade Kits CTAs to solid buttons"
```

---

### Task 5: Final Sections Spacing + Copy (Depoimentos, FAQ, CtaFinal, Footer)

**Files:**
- Modify: `client/src/components/sections/Depoimentos.tsx`
- Modify: `client/src/components/sections/Faq.tsx`
- Modify: `client/src/components/sections/CtaFinal.tsx`
- Modify: `client/src/components/sections/Footer.tsx`

**Interfaces:**
- Consumes: none
- Produces: 4 sections with compressed spacing, CtaFinal heading copy update

- [ ] **Step 1: Depoimentos — spacing**

File: `client/src/components/sections/Depoimentos.tsx`

Line 69 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
// To:
<div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
```

- [ ] **Step 2: FAQ — spacing**

File: `client/src/components/sections/Faq.tsx`

Line 29 — section padding:
```tsx
// From:
<div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
// To:
<div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
```

- [ ] **Step 3: CtaFinal — spacing + copy**

File: `client/src/components/sections/CtaFinal.tsx`

Line 14 — section padding:
```tsx
// From:
<section className="relative bg-dark-deeper text-white overflow-hidden py-36 md:py-44">
// To:
<section className="relative bg-dark-deeper text-white overflow-hidden py-28 md:py-36">
```

Line 31 — heading copy:
```tsx
// From:
<h2 className="mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
  Não encontrou o que procura?
</h2>
// To:
<h2 className="mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
  Catálogo completo à sua disposição.
</h2>
```

- [ ] **Step 4: Footer — spacing**

File: `client/src/components/sections/Footer.tsx`

Line 8 — section padding:
```tsx
// From:
<div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
// To:
<div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
```

- [ ] **Step 5: Build check**

Run: `pnpm check && pnpm build`
Expected: Clean

- [ ] **Step 6: Commit**

```bash
git add client/src/components/sections/Depoimentos.tsx client/src/components/sections/Faq.tsx client/src/components/sections/CtaFinal.tsx client/src/components/sections/Footer.tsx
git commit -m "polish: compress final section spacing, update CtaFinal heading copy"
```

---

### Task 6: Reposition Depoimentos in Page Flow

**Files:**
- Modify: `client/src/pages/Home.tsx:37-58`

**Interfaces:**
- Consumes: Task 1 (Hero changes in Home.tsx)
- Produces: Depoimentos section moved between ComoFunciona and FAQ

- [ ] **Step 1: Reorder section imports and JSX**

File: `client/src/pages/Home.tsx`

The current section order is (lines 42-54):
```
TrustBar → HairCareSuite → PerfumesHeader → MalbecShowcase → FlorattaRedShowcase → BoticarioCarousel → KitsGrid → Consultoria → ComoFunciona → Depoimentos → Faq → CtaFinal → Footer
```

Move Depoimentos to appear between ComoFunciona and Faq. The current order in lines 49-53:
```tsx
<LazySection><Suspense fallback={null}><Consultoria image={consultoraImg} /></Suspense></LazySection>
<LazySection><Suspense fallback={null}><ComoFunciona /></Suspense></LazySection>
<LazySection><Suspense fallback={null}><Depoimentos /></Suspense></LazySection>
<LazySection><Suspense fallback={null}><Faq /></Suspense></LazySection>
<LazySection><Suspense fallback={null}><CtaFinal heroImage={heroPerfume} /></Suspense></LazySection>
```

Depoimentos is already after ComoFunciona and before Faq in the current code. This is already in the correct position per the spec. No change needed to section ordering.

- [ ] **Step 2: Verify Depoimentos position**

The current flow (lines 49-53) is: `Consultoria → ComoFunciona → Depoimentos → Faq → CtaFinal → Footer`

This matches the desired "How it works → People saying it works → Any questions?" flow. No reordering needed. Mark this task as complete.

- [ ] **Step 3: Commit**

```bash
# No changes needed — Depoimentos is already correctly positioned.
# Skip commit.
```

---

### Task 7: Microinteractions (CSS + WhatsappFloating tooltip text)

**Files:**
- Modify: `client/src/index.css`
- Modify: `client/src/components/sections/WhatsappFloating.tsx`

**Interfaces:**
- Consumes: none
- Produces: subtle brightness hover on product images, brightness-95 on button active state, updated floating button tooltip text

- [ ] **Step 1: Add image hover brightness utility to index.css**

File: `client/src/index.css`

Add after the `btn-hover-scale` utility (around line 361):

```css
/* ── Product image hover brightness lift ── */

@utility img-hover-lift {
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover {
    filter: brightness(1.08);
  }
}
```

- [ ] **Step 2: Add button active brightness to btn-hover-scale**

File: `client/src/index.css`

Update the `btn-hover-scale` utility (lines 351-358) to add `brightness-95` on active:

```css
@utility btn-hover-scale {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              filter 0.15s ease;
  &:hover { transform: scale(1.02); }
  &:active { transform: scale(0.96); filter: brightness(0.95); animation-play-state: paused; }
}
```

- [ ] **Step 3: Update WhatsappFloating tooltip text**

File: `client/src/components/sections/WhatsappFloating.tsx`

Line 46 — change the label text:
```tsx
// From:
Fale com a gente
// To:
Precisa de ajuda?
```

- [ ] **Step 4: Apply img-hover-lift to product images**

File: `client/src/components/sections/HairCareSuite.tsx`

Line 41 (volume image) — add `img-hover-lift` to className:
```tsx
// From:
className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
// To:
className="h-full w-full object-cover object-center img-hover-lift group-hover:scale-105"
```

Line 135 (liso image) — add `img-hover-lift` to className:
```tsx
// From:
className="h-full w-full object-cover object-[75%]"
// To:
className="h-full w-full object-cover object-[75%] img-hover-lift"
```

File: `client/src/components/sections/EditorialShowcase.tsx`

Line 142 — add `img-hover-lift` to the single-image variant:
```tsx
// From:
className="h-full w-full object-cover transition-transform duration-750 hover:scale-103"
// To:
className="h-full w-full object-cover img-hover-lift transition-transform duration-750 hover:scale-103"
```

Note: Carousel images (lines 96-97 and 110-116 of EditorialShowcase, lines 58-65 and 74-89 of MalbecShowcase) use `absolute inset-0` positioning — skip adding img-hover-lift to those since they're background-style fills.

- [ ] **Step 5: Build check**

Run: `pnpm check && pnpm build`
Expected: Clean

- [ ] **Step 6: Commit**

```bash
git add client/src/index.css client/src/components/sections/WhatsappFloating.tsx client/src/components/sections/HairCareSuite.tsx client/src/components/sections/EditorialShowcase.tsx
git commit -m "polish: add img-hover-lift utility, button active brightness, update floating WA tooltip"
```

---

### Task 8: Final Build Verification

**Files:** (none — verification only)

- [ ] **Step 1: Full TypeScript check**

Run: `pnpm check`
Expected: Zero errors

- [ ] **Step 2: Production build**

Run: `pnpm build`
Expected: Clean build, no warnings

- [ ] **Step 3: Check git diff for scope creep**

Run: `git diff main --stat`
Expected: Only the files listed in tasks 1-7 appear. No unexpected files.

- [ ] **Step 4: Spot-check build artifacts**

Run: `ls dist/public/index.html dist/index.js`
Expected: Both files exist (client build + server build)

- [ ] **Step 5: Check for unused imports in changed files**

Run: `pnpm check`
(A second pass — TypeScript with `noUnusedLocals` would catch these, but verify cleanliness)
Expected: Clean

- [ ] **Step 6: Commit (if any final cleanup needed)**

```bash
git status
# Expected: clean working tree
```
