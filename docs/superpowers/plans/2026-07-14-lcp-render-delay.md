# LCP Optimization: Eliminate Element Render Delay — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce LCP element render delay from 3,240ms to near-zero by putting the hero image in static HTML, replacing framer-motion with CSS, and removing the Home page lazy() boundary.

**Architecture:** The hero content (image, heading, CTA) is duplicated into static HTML so the browser paints it before any JS executes. When React mounts, a MutationObserver hides the fallback — no flash because the image is already cached from preloading. Hero animations move from framer-motion to CSS @keyframes, removing ~30KB gzipped from the critical JS path. The Home page becomes a static import instead of React.lazy(), eliminating a chunk round-trip.

**Tech Stack:** React 19, Vite 7, TypeScript, Tailwind CSS v4, Express 4

## Global Constraints

- Target LCP: Sub-2.5s (currently 3,240ms render delay)
- No new dependencies
- Respect `prefers-reduced-motion: reduce` on all new animations
- Keep below-fold lazy loading via LazySection intact
- Keep AntigravityParticles deferred via requestAnimationFrame + lazy

---

### Task 1: Add CSS keyframe animations for Hero

**Files:**
- Modify: `client/src/index.css` (append after existing animations, before the `@media (prefers-reduced-motion: reduce)` block)

**Interfaces:**
- Produces: `.animate-fade-up` utility class (replaces `useFadeUp` framer-motion hook on Hero)
- Produces: `.animate-float-badge` utility class (replaces `motion.span` on FloatingBadge)

- [ ] **Step 1: Add @keyframes and utility classes to index.css**

Insert after the existing `bottle-enter`/`bottle-float` keyframe block (before the existing `@media (prefers-reduced-motion: reduce)` block at line 187). The exact insertion point: after line 236 (`@utility animate-bottle-float { ... }`) and before line 187 (`@media (prefers-reduced-motion: reduce) {`).

```css
/* ── Hero content fade-up (replaces framer-motion useFadeUp on Hero) ── */

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@utility animate-fade-up {
  animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ── Floating badge bob (replaces framer-motion animate on FloatingBadge) ── */

@keyframes float-badge {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@utility animate-float-badge {
  animation: float-badge 5s ease-in-out infinite;
}
```

- [ ] **Step 2: Add reduced-motion overrides to existing media query**

In the existing `@media (prefers-reduced-motion: reduce)` block at line 187, add the two new classes so they disable when the user prefers reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .wa-glow, .wa-pulse { animation: none; }
  .animate-bottle-in { animation: none; opacity: 1; transform: none; }
  .animate-bottle-float { animation: none; }
  .animate-fade-up { animation: none; opacity: 1; transform: none; }
  .animate-float-badge { animation: none; }
}
```

- [ ] **Step 3: Commit**

```bash
git add client/src/index.css
git commit -m "perf: add CSS keyframe animations for Hero (replaces framer-motion fade-up and float-badge)"
```

---

### Task 2: Replace motion.span with CSS class in FloatingBadge

**Files:**
- Modify: `client/src/components/sections/FloatingBadge.tsx`

**Interfaces:**
- Consumes: `.animate-float-badge` from Task 1
- Produces: FloatingBadge no longer imports framer-motion (removes vendor-framer from Hero critical path)

- [ ] **Step 1: Rewrite FloatingBadge to use CSS class instead of framer-motion**

Replace the entire file content:

```tsx
import { memo } from "react";

const FloatingBadge = memo(function FloatingBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`animate-float-badge inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 border border-luxe-gold/50 bg-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-md max-w-full text-[11px] sm:text-[14px] tracking-wider ${className}`}
    >
      {children}
    </span>
  );
});

export default FloatingBadge;
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/sections/FloatingBadge.tsx
git commit -m "perf: replace framer-motion in FloatingBadge with CSS float-badge animation"
```

---

### Task 3: Replace motion.div with CSS class in Hero + fix decoding

**Files:**
- Modify: `client/src/pages/Home.tsx`

**Interfaces:**
- Consumes: `.animate-fade-up` from Task 1
- Produces: Hero no longer imports framer-motion or useFadeUp; hero img uses decoding="sync"

- [ ] **Step 1: Remove framer-motion and useFadeUp imports from Home.tsx**

Line 1 — remove the entire line:
```tsx
import { motion } from "framer-motion";
```

Line 5 — remove the entire line:
```tsx
import { useFadeUp } from "@/hooks/useFadeUp";
```

The import block at the top of `Home.tsx` should now be:
```tsx
import { Timer, MessageCircle, ArrowRight } from "lucide-react";
import { useState, useEffect, memo, lazy, Suspense } from "react";
import { waLink } from "@/lib/whatsapp";
import FloatingBadge from "@/components/sections/FloatingBadge";
```

- [ ] **Step 2: Replace motion.div with plain div + CSS class in Hero**

Line 218 — change:
```tsx
        <motion.div {...fade} className="max-w-3xl">
```
to:
```tsx
        <div className="animate-fade-up max-w-3xl">
```

- [ ] **Step 3: Remove the `const fade = useFadeUp();` line**

Line 190 — remove the entire line:
```tsx
  const fade = useFadeUp();
```

- [ ] **Step 4: Fix decoding attribute on hero image**

Line 208 — change:
```tsx
          decoding="async"
```
to:
```tsx
          decoding="sync"
```

- [ ] **Step 5: Commit**

```bash
git add client/src/pages/Home.tsx
git commit -m "perf: replace framer-motion in Hero with CSS fade-up, fix decoding to sync on LCP image"
```

---

### Task 4: Remove React.lazy() from Home in App.tsx

**Files:**
- Modify: `client/src/App.tsx`

**Interfaces:**
- Produces: Home is now a static import — no chunk round-trip for above-fold content

- [ ] **Step 1: Change lazy import to static import**

Line 8 — change:
```tsx
const Home = lazy(() => import("./pages/Home"));
```
to:
```tsx
import Home from "./pages/Home";
```

- [ ] **Step 2: Remove Suspense wrapper around Home**

Lines 16-26 — the Route for "/" currently wraps `<Home />` in `<Suspense>`. Remove the Suspense:

```tsx
// Before (lines 14-27):
    <Switch>
      <Route path={"/"}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-luxe-bg flex items-center justify-center">
              <div className="animate-pulse text-luxe-gold font-display text-2xl">
                Carregando...
              </div>
            </div>
          }
        >
          <Home />
        </Suspense>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>

// After:
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
```

- [ ] **Step 3: Clean up unused lazy import if needed**

Check the remaining imports. `lazy` is still used for Toaster on line 9. `Suspense` is still used for Toaster on line 48. Both imports remain needed. No change to line 1:
```tsx
import { Suspense, lazy } from "react";
```

- [ ] **Step 4: Commit**

```bash
git add client/src/App.tsx
git commit -m "perf: convert Home from lazy() to static import, eliminate chunk round-trip"
```

---

### Task 5: Expand hero fallback in index.html with image + CTA + fix MutationObserver

**Files:**
- Modify: `client/index.html`

**Interfaces:**
- Consumes: Hero image assets (`/malbec-signatureA.webp`, `/malbecSMOB.webp`)
- Produces: LCP image renders from static HTML before any JS executes

- [ ] **Step 1: Expand critical inline CSS**

Replace the existing inline `<style>` block (lines 44-56) with expanded styles that also cover the hero image, overlays, and CTA:

```html
    <style>
      html{scroll-behavior:smooth}
      body{margin:0;background:#070707;color:#fff;font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased}
      #root{position:relative;min-height:100vh}
      #hero-fallback{position:absolute;inset:0;z-index:1;display:flex;align-items:flex-end;pointer-events:none}
      #hero-fallback .hero-fb-bg{position:absolute;inset:0}
      #hero-fallback .hero-fb-bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.6}
      #hero-fallback .hero-fb-overlay-1{position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.95),rgba(0,0,0,.7),transparent)}
      #hero-fallback .hero-fb-overlay-2{position:absolute;inset:0;background:linear-gradient(to top,#070707,transparent,rgba(0,0,0,.5))}
      #hero-fallback .hero-fb-content{position:relative;z-index:2;max-width:80rem;width:100%;margin:0 auto;padding:2.5rem 1rem 8rem}
      #hero-fallback .hero-fb-h1{font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif;font-weight:700;line-height:.88;font-size:clamp(2.5rem,12vw,5.5rem)}
      #hero-fallback .hero-fb-p{font-family:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:1.05rem;max-width:36rem;margin:1rem auto 0;color:rgba(255,255,255,.7);line-height:1.55;font-weight:300}
      #hero-fallback .hero-fb-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;white-space:nowrap;background:#25d366;color:#000;font-weight:700;padding:.75rem 1rem;font-size:.875rem;letter-spacing:.025em;margin-top:2.5rem;text-decoration:none;pointer-events:auto}
      #hero-fallback .hero-fb-cta:hover{background:#1ebe57}
      h1,h2,h3{font-family:'Cormorant Garamond',Georgia,'Times New Roman',serif}
      .text-white\/95{color:rgba(255,255,255,.95)}
      .text-luxe-gold{color:#9A7B50}
      .drop-shadow-\[0_2px_18px_rgba\(0\2c 0\2c 0\2c 0\.6\)\]{filter:drop-shadow(0 2px 18px rgba(0,0,0,.6))}
      .bg-whatsapp{background-color:#25d366}
    </style>
```

- [ ] **Step 2: Replace the #hero-fallback div with full hero content**

Replace the existing `#hero-fallback` div (lines 123-131):

```html
    <div id="hero-fallback">
      <div class="hero-fb-bg">
        <picture>
          <source srcset="/malbecSMOB.webp" media="(max-width: 767px)" />
          <img src="/malbec-signatureA.webp" alt="Fragrância de luxo iluminada em fundo escuro" fetchpriority="high" loading="eager" decoding="sync" width="1600" height="1200" />
        </picture>
        <div class="hero-fb-overlay-1"></div>
        <div class="hero-fb-overlay-2"></div>
      </div>
      <div class="hero-fb-content">
        <h1 class="hero-fb-h1">
          <span class="text-luxe-gold">Luxo Acessível</span><br>
          <span class="text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">Para Todos.</span>
        </h1>
        <p class="hero-fb-p">Perfumaria e hair care premium do Grupo Boticário com entrega expressa para <strong style="color:#fff;font-weight:600">BH e regiões</strong>. Peça agora pelo WhatsApp e receba seu pedido em minutos, com segurança e preço justo.</p>
        <a class="hero-fb-cta" href="https://wa.me/5531900000000?text=Ol%C3%A1%21%20Quero%20fazer%20meu%20pedido%20para%20entrega%20expressa%20em%20BH%2Fregi%C3%A3o.%20Pode%20me%20ajudar%3F" target="_blank" rel="noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          Peça Agora e Receba em Minutos
        </a>
      </div>
    </div>
```

Note: The WhatsApp URL uses the encoded message matching the existing waLink format from `lib/whatsapp.ts` — `"Olá! Quero fazer meu pedido para entrega expressa em BH/região. Pode me ajudar?"`. If the phone number (`5531900000000`) differs from the actual production number, update accordingly.

- [ ] **Step 3: Fix MutationObserver — remove subtree:true**

Line 133 — change:
```html
    <script>new MutationObserver(function(e,o){for(var r of e)for(var n of r.addedNodes)if(n.nodeType===1||(n.nodeType===3&&n.textContent.trim())){var d=document.getElementById("hero-fallback");d&&(d.style.display="none");o.disconnect();return}}).observe(document.getElementById("root"),{childList:!0,subtree:!0})</script>
```
to:
```html
    <script>new MutationObserver(function(e,o){for(var r of e)for(var n of r.addedNodes)if(n.nodeType===1||(n.nodeType===3&&n.textContent.trim())){var d=document.getElementById("hero-fallback");d&&(d.style.display="none");o.disconnect();return}}).observe(document.getElementById("root"),{childList:!0})</script>
```

The only change is removing `,subtree:!0` from the observer options.

- [ ] **Step 4: Commit**

```bash
git add client/index.html
git commit -m "perf: expand hero fallback with image and CTA in static HTML, fix MutationObserver"
```

---

### Task 6: Build, verify, and smoke-test

**Files:**
- No source changes — verification only

- [ ] **Step 1: Type-check the project**

```bash
pnpm check
```

Expected: No TypeScript errors.

- [ ] **Step 2: Build for production**

```bash
pnpm build
```

Expected: Build completes successfully. Check the `dist/stats.html` treemap — `vendor-framer` should NOT appear in the initial chunks loaded with the entry point.

- [ ] **Step 3: Verify chunk composition**

```bash
ls -la dist/public/assets/ | grep -E "(vendor-framer|Home|index)"
```

Expected: `vendor-framer` chunk still exists (it's needed by below-fold sections) but the entry `index-*.js` should be larger (now includes Home) and there should be NO separate `Home-*.js` chunk. The `vendor-framer` chunk should NOT have a `modulepreload` tag in the built `dist/public/index.html`.

- [ ] **Step 4: Verify built HTML has correct static hero and no subtree:true**

```bash
grep -c "hero-fallback" dist/public/index.html
grep "subtree" dist/public/index.html
```

Expected: `hero-fallback` appears multiple times (the fallback div + observer reference). The `subtree` grep should return empty (or only show in the Vite-injected script, not in our observer).

- [ ] **Step 5: Start production server and do visual check**

```bash
pnpm start
```

Visit `http://localhost:3000` and verify:
- Hero image appears instantly (before React mounts)
- Text heading is visible immediately
- When React mounts, no flash — content is seamless
- Scroll down — below-fold sections lazy-load correctly
- Mobile viewport (Chrome DevTools) — shows `/malbecSMOB.webp` as source
- CTA button works and opens WhatsApp

- [ ] **Step 6: Commit verification notes (optional)**

Only if you want to record verification results. Otherwise skip.
