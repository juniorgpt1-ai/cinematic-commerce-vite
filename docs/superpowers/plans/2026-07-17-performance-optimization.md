# Performance + Image Quality Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atingir 90+ Lighthouse Performance com imagens em alta qualidade (quality 90), eliminar 1.7 MB de assets mortos, zerar CLS, adicionar preconnects, e otimizar bundle.

**Architecture:** Pipeline de imagens reescrito com `sharp` processando todas as imagens a quality 90/effort 6, unificação de nomenclatura (remover sufixo `-opt`), limpeza de dead assets, e correções de CLS/performance.

**Tech Stack:** Node.js + sharp, Vite 5, React 19, Tailwind CSS v4

## Global Constraints

- Nenhuma alteração que quebre o fluxo WhatsApp (core CTA)
- Manter Vite 5.x (não migrar para v6)
- Quality 90 em todas as imagens WebP
- Effort 6 (máxima compressão lossless-aware)
- `withoutEnlargement: true` em todos os resize
- Imagens mantidas em `client/public/` (servidas estaticamente)
- Nomes de arquivo sem sufixo `-opt` (unificar nomenclatura)
- Manter `<picture>` com srcset para mobile/desktop (2x DPR)

---

## Auditoria de Assets Atuais (44 imagens, 3.6 MB)

### Dead assets (remover)
| Arquivo | Tamanho | Por que remover |
|---------|---------|-----------------|
| hero-bg-desk-1x.webp | 45 KB | Zero referências no código |
| hero-bg-desk-2x.webp | 107 KB | Zero referências |
| hero-bg-desk-3x.webp | 107 KB | Zero referências |
| hero-bg-mob-1x.webp | 35 KB | Zero referências |
| hero-bg-mob-2x.webp | 112 KB | Zero referências |
| hero-bg-mob-3x.webp | 158 KB | Zero referências |
| VOLMOB.webp | 100 KB | Zero referências |
| VOLMOB-opt.webp | 24 KB | Zero referências |
| LISMOB.webp | 51 KB | Zero referências |
| LISMOB-opt.webp | 14 KB | Zero referências |
| lora-400.woff2 | 24 KB | Não declarada em fonts.css |
| fenix-400.woff2 | 16 KB | Não declarada em fonts.css |
| **Total** | **~793 KB** | |

### Duplicatas (unificar removendo sufixo -opt)
Arquivos onde `-opt` e original coexistem. O `-opt` é o processado pelo `optimize-images.mjs` atual. Vamos re-otimizar o original a quality 90 e remover o `-opt`.

| Original | -opt | Uso no código |
|----------|------|---------------|
| malbec-lifestyle.webp | malbec-lifestyle-opt.webp | `-opt` referenciado |
| malbec-collage.webp | malbec-collage-opt.webp | `-opt` referenciado |
| floratta-red-lifestyle.webp | floratta-red-lifestyle-opt.webp | `-opt` referenciado |
| hair-care-volume.webp | hair-care-volume-opt.webp | `-opt` referenciado |
| hair-care-liso.webp | hair-care-liso-opt.webp | `-opt` referenciado |
| consultora.webp | consultora-opt.webp | `-opt` referenciado |
| malbec1.webp | malbec1-opt.webp | `-opt` referenciado |

### Imagens mantidas (referenciadas, sem duplicata)
| Arquivo | Tamanho atual | Dimensões | Uso |
|---------|-------------|-----------|-----|
| malbec-signatureA.webp | 125 KB | 1254x1254 | Hero fallback + OG |
| malbecDDESK.webp | 94 KB | 1672x941 | Hero desktop |
| malbecSMOB.webp | 123 KB | 1075x1463 | Hero mobile + CtaFinal |
| floratta.webp | 94 KB | 1024x1024 | Floratta carousel slide 2 |
| ...-mob.webp (11 files) | 10-29 KB | varias | Mobile srcset |
| ...-mob-2x.webp (9 files) | 11-56 KB | varias | Mobile 2x DPR |

---

### Task 1: Remover dead assets

**Files:**
- Delete: `client/public/hero-bg-desk-1x.webp`
- Delete: `client/public/hero-bg-desk-2x.webp`
- Delete: `client/public/hero-bg-desk-3x.webp`
- Delete: `client/public/hero-bg-mob-1x.webp`
- Delete: `client/public/hero-bg-mob-2x.webp`
- Delete: `client/public/hero-bg-mob-3x.webp`
- Delete: `client/public/VOLMOB.webp`
- Delete: `client/public/VOLMOB-opt.webp`
- Delete: `client/public/LISMOB.webp`
- Delete: `client/public/LISMOB-opt.webp`
- Delete: `client/public/fonts/lora-400.woff2`
- Delete: `client/public/fonts/fenix-400.woff2`
- Delete: `client/public/malbec-lifestyle-opt.webp`
- Delete: `client/public/malbec-collage-opt.webp`
- Delete: `client/public/floratta-red-lifestyle-opt.webp`
- Delete: `client/public/hair-care-volume-opt.webp`
- Delete: `client/public/hair-care-liso-opt.webp`
- Delete: `client/public/consultora-opt.webp`
- Delete: `client/public/malbec1-opt.webp`

- [ ] **Step 1: Remover arquivos**

```bash
cd client/public
rm hero-bg-desk-{1x,2x,3x}.webp hero-bg-mob-{1x,2x,3x}.webp
rm VOLMOB.webp VOLMOB-opt.webp LISMOB.webp LISMOB-opt.webp
rm fonts/lora-400.woff2 fonts/fenix-400.woff2
rm malbec-lifestyle-opt.webp malbec-collage-opt.webp floratta-red-lifestyle-opt.webp
rm hair-care-volume-opt.webp hair-care-liso-opt.webp consultora-opt.webp malbec1-opt.webp
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "perf: remove dead assets (793 KB hero-bg, unused fonts, VOLMOB/LISMOB, -opt duplicates)"
```

---

### Task 2: Reescrever optimize-images.mjs (quality 90, todas as imagens)

**Files:**
- Modify: `scripts/optimize-images.mjs`

**Interfaces:**
- Consumes: imagens em `client/public/`
- Produces: imagens otimizadas in-place com quality 90, effort 6

- [ ] **Step 1: Escrever novo script**

```javascript
/**
 * Image optimization script — processa TODAS as imagens WebP do projeto.
 * Quality 90, effort 6 (máximo), sem upscaling.
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readFile, writeFile, stat as fsStat, readdir } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");

// Mapeamento: nome do arquivo → target width (null = manter dimensão original)
// Apenas resize para baixo. withoutEnlargement: true em todos.
const IMAGE_TARGETS = {
  // Hero — LCP critical, manter dimensão original, recompress quality 90
  "malbecDDESK.webp":         { width: null },
  "malbecSMOB.webp":          { width: null },
  "malbec-signatureA.webp":   { width: null },

  // Lifestyle / Collage — grandes, resize para 2400px wide max
  "malbec-lifestyle.webp":    { width: 2400 },
  "malbec-collage.webp":      { width: 2400 },
  "floratta-red-lifestyle.webp": { width: 2400 },
  "hair-care-volume.webp":    { width: 2200 },
  "hair-care-liso.webp":      { width: 1672 },
  "consultora.webp":          { width: 1200 },
  "floratta.webp":            { width: 1024 },
  "malbec1.webp":             { width: 2400 },

  // Mobile variants — manter dimensão, recompress
  "malbec-lifestyle-mob.webp":       { width: null },
  "malbec-lifestyle-mob-2x.webp":    { width: null },
  "malbec-collage-mob.webp":         { width: null },
  "malbec-collage-mob-2x.webp":      { width: null },
  "floratta-red-lifestyle-mob.webp": { width: null },
  "floratta-red-lifestyle-mob-2x.webp": { width: null },
  "hair-care-volume-mob.webp":       { width: null },
  "hair-care-volume-mob-2x.webp":    { width: null },
  "hair-care-liso-mob.webp":         { width: null },
  "hair-care-liso-mob-2x.webp":      { width: null },
  "consultora-mob.webp":             { width: null },
  "consultora-mob-2x.webp":          { width: null },
  "floratta-mob.webp":               { width: null },
  "floratta-mob-2x.webp":            { width: null },
  "malbec1-mob.webp":                { width: null },
  "malbec1-mob-2x.webp":             { width: null },
};

async function optimizeImage(filePath, target) {
  const inputBuffer = await readFile(filePath);
  const metadata = await sharp(inputBuffer).metadata();
  const inputSizeKB = ((await fsStat(filePath)).size / 1024).toFixed(1);

  const { width } = target;

  // Skip if already at target (idempotent — no re-encode of already-optimized)
  if (width && metadata.width <= width) {
    console.log(`  ${basename(filePath)}: ${inputSizeKB} KiB (already at target width, skipping)`);
    return;
  }

  let pipeline = sharp(inputBuffer);

  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  const outputBuffer = await pipeline.webp({ quality: 90, effort: 6 }).toBuffer();
  await writeFile(filePath, outputBuffer);

  const outputSizeKB = ((await fsStat(filePath)).size / 1024).toFixed(1);
  const delta = (outputSizeKB - inputSizeKB).toFixed(1);
  const sign = delta > 0 ? "+" : "";
  console.log(`  ${basename(filePath)}: ${inputSizeKB} KiB → ${outputSizeKB} KiB (${sign}${delta} KiB)`);
}

async function main() {
  console.log("Optimizing all WebP images (quality 90, effort 6)...\n");

  const allFiles = await readdir(PUBLIC_DIR, { recursive: true });
  const webpFiles = allFiles
    .filter(f => f.endsWith(".webp"))
    .filter(f => !f.includes("node_modules"));

  let count = 0;
  for (const relPath of webpFiles.sort()) {
    const absPath = join(PUBLIC_DIR, relPath);
    const target = IMAGE_TARGETS[basename(relPath)];

    if (!target) {
      console.log(`  ${basename(relPath)}: no target config, skipping`);
      continue;
    }

    try {
      await optimizeImage(absPath, target);
      count++;
    } catch (err) {
      console.error(`  ✗ ${basename(relPath)}: ${err.message}`);
    }
  }

  console.log(`\nDone. Optimized ${count} images.`);
}

main();
```

- [ ] **Step 2: Executar otimização e verificar output**

```bash
node scripts/optimize-images.mjs
```

Esperado: ~27 imagens processadas, quality 90 aplicada. Tamanho total deve aumentar ~30% vs antes (quality 90 vs 75-80), compensado pela remoção dos dead assets.

- [ ] **Step 3: Commit**

```bash
git add scripts/optimize-images.mjs
git commit -m "perf: rewrite image optimizer — quality 90, effort 6, process all images"
```

---

### Task 3: Atualizar referências de imagem no código (remover -opt)

**Files:**
- Modify: `client/src/pages/Home.tsx:16-22`
- Modify: `client/src/components/sections/MalbecShowcase.tsx:81`
- Modify: `client/src/components/sections/FlorattaRedShowcase.tsx:24`
- Modify: `client/src/components/sections/HairCareSuite.tsx:33`

**Interfaces:**
- Consumes: props `lifestyleImg`, `collageImg`, `volumeImg`, `lisoImg`, `image`, `secondImage` de Home.tsx
- Produces: mesmas props, sem sufixo `-opt`

- [ ] **Step 1: Atualizar Home.tsx — remover sufixo -opt das constantes de assets**

```diff
-const malbecLifestyleImg = "/malbec-lifestyle-opt.webp";
+const malbecLifestyleImg = "/malbec-lifestyle.webp";
-const malbecCollageImg = "/malbec-collage-opt.webp";
+const malbecCollageImg = "/malbec-collage.webp";
-const florattaRedImg = "/floratta-red-lifestyle-opt.webp";
+const florattaRedImg = "/floratta-red-lifestyle.webp";
-const hairCareVolumeImg = "/hair-care-volume-opt.webp";
+const hairCareVolumeImg = "/hair-care-volume.webp";
-const hairCareLisoImg = "/hair-care-liso-opt.webp";
+const hairCareLisoImg = "/hair-care-liso.webp";
-const consultoraImg = "/consultora-opt.webp";
+const consultoraImg = "/consultora.webp";
```

- [ ] **Step 2: Atualizar MalbecShowcase.tsx — slide 2 hardcoded path**

```diff
-      <source srcSet="/malbec1-mob.webp 1x, /malbec1-mob-2x.webp 2x" media="(max-width: 767px)" />
+      <source srcSet="/malbec1-mob.webp 1x, /malbec1-mob-2x.webp 2x" media="(max-width: 767px)" />
       <img
-        src="/malbec1-opt.webp"
+        src="/malbec1.webp"
         alt="Frasco Malbec Cologne O Boticário"
         loading="lazy"
         className="w-full h-full object-cover object-center"
       />
```

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/Home.tsx client/src/components/sections/MalbecShowcase.tsx
git commit -m "perf: remove -opt suffix from image references after pipeline unification"
```

---

### Task 4: Corrigir CLS — adicionar width/height em todas as imagens

**Files:**
- Modify: `client/src/components/sections/EditorialShowcase.tsx`
- Modify: `client/src/components/sections/MalbecShowcase.tsx`
- Modify: `client/src/components/sections/HairCareSuite.tsx`
- Modify: `client/src/components/sections/Consultoria.tsx`
- Modify: `client/src/components/sections/CtaFinal.tsx`

**Interfaces:**
- Consumes: dimensões conhecidas das imagens (do metadata sharp)
- Produces: atributos `width` e `height` adicionados a todos os `<img>`

Dimensões a usar (do metadata extraído):

| Imagem | Width | Height |
|--------|-------|--------|
| malbec-lifestyle | 2400 | 1792 |
| malbec-collage | 2400 | 1792 |
| malbec1 | 2400 | 1792 |
| malbec-signatureA | 1254 | 1254 |
| malbecDDESK | 1672 | 941 |
| malbecSMOB | 1075 | 1463 |
| floratta-red-lifestyle | 2400 | 1792 |
| floratta | 1024 | 1024 |
| hair-care-volume | 2200 | 2078 |
| hair-care-liso | 1672 | 941 |
| consultora | 1200 | 1408 |
| VOLMOB (removido) | — | — |
| LISMOB (removido) | — | — |

- [ ] **Step 1: Adicionar width/height em EditorialShowcase.tsx**

Em ambos os `<img>` (linhas ~105 e ~122), adicionar `width` e `height` baseado nas dimensões das imagens passadas. Como o componente é genérico, vamos usar valores padrão seguros:

```diff
  <img
    src={image}
    alt={imageAlt}
    loading="lazy"
+   width="1200"
+   height="1600"
    className="h-full w-full object-cover object-top"
  />
```

E para o secondImage:

```diff
  <img
    src={secondImage}
    alt={secondLabel || imageAlt}
    loading="lazy"
+   width="800"
+   height="800"
    className="w-full h-full object-cover object-center"
  />
```

- [ ] **Step 2: Adicionar width/height em MalbecShowcase.tsx**

Slide 1 (lifestyle):
```diff
  <img
    src={lifestyleImg}
    alt="Homem sofisticado aplicando Malbec O Boticário"
    loading="lazy"
+   width="1200"
+   height="1600"
    className="h-full w-full object-cover object-top"
  />
```

Slide 2 (bottle):
```diff
  <img
    src="/malbec1.webp"
    alt="Frasco Malbec Cologne O Boticário"
    loading="lazy"
+   width="1200"
+   height="1600"
    className="w-full h-full object-cover object-center"
  />
```

Collage:
```diff
  <img
    src={collageImg}
    alt="Malbec O Boticário — relógio, frasco, aplicação e espelho"
    loading="lazy"
+   width="2400"
+   height="1792"
    className="w-full h-auto md:h-[600px] md:object-cover block"
  />
```

- [ ] **Step 3: Adicionar width/height em HairCareSuite.tsx**

Volume:
```diff
  <img
    src={volumeImg}
    alt="Modelo lavando cabelos com produtos Siàge Hair-Plastia"
    loading="lazy"
    decoding="async"
+   width="1100"
+   height="916"
    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
  />
```

Liso:
```diff
  <img
    src={lisoImg}
    alt="Modelo com cabelo liso e alinhado sob fluxo de água"
    loading="lazy"
    decoding="async"
+   width="836"
+   height="470"
    className="h-full w-full object-cover object-[75%]"
  />
```

- [ ] **Step 4: Adicionar width/height em Consultoria.tsx**

```diff
  <img
    src={image}
    alt="Consultora premium sorrindo, atendimento personalizado e humanizado"
    loading="lazy"
+   width="600"
+   height="704"
    className="h-full w-full object-cover"
  />
```

- [ ] **Step 5: Adicionar width/height em CtaFinal.tsx**

```diff
  <img src={heroImage} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async"
+   width="1075"
+   height="1463"
  />
```

- [ ] **Step 6: Commit**

```bash
git add client/src/components/sections/
git commit -m "perf: add width/height to all images for zero CLS"
```

---

### Task 5: Adicionar preconnect e preload hints

**Files:**
- Modify: `client/index.html:35-41`

- [ ] **Step 1: Adicionar preconnect para WhatsApp e Speed Insights**

```diff
     <!-- Font Preloads: self-hosted critical above-the-fold variants -->
     <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/cormorant-garamond.woff2" />
     <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/plus-jakarta-sans.woff2" />
+    <link rel="preconnect" href="https://wa.me" />
+    <link rel="dns-prefetch" href="https://wa.me" />
+
+    <!-- Playfair Display: used in section headings, preload to avoid FOUT on scroll -->
+    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/playfair-display-600.woff2" />

     <!-- LCP Preload: hero image discovered before CSS/JS -->
     <link rel="preload" as="image" href="/malbecDDESK.webp" fetchpriority="high" type="image/webp" media="(min-width: 768px)" />
     <link rel="preload" as="image" href="/malbecSMOB.webp" fetchpriority="high" type="image/webp" media="(max-width: 767px)" />
```

- [ ] **Step 2: Commit**

```bash
git add client/index.html
git commit -m "perf: add preconnect to wa.me, preload Playfair Display font"
```

---

### Task 6: Otimizações de runtime (content-visibility, waLink constants)

**Files:**
- Modify: `client/src/index.css`
- Modify: `client/src/pages/Home.tsx`

- [ ] **Step 1: Adicionar content-visibility nas sections abaixo da dobra**

No `index.css`, adicionar após as utilities existentes:

```css
/* Performance: skip rendering for off-screen sections */
@media (min-width: 768px) {
  .section-below-fold {
    content-visibility: auto;
    contain-intrinsic-size: 500px;
  }
}
```

- [ ] **Step 2: Aplicar classe nas sections de Home.tsx (todas exceto Hero)**

As sections já estão dentro de `<LazySection>`, então `content-visibility` é redundante para as lazy-loaded. Vamos aplicar apenas nas que NÃO são lazy (se houver).

Na verdade, como todas as sections são lazy-loaded via `LazySection`, o `content-visibility` não é necessário. Vamos pular esta parte e focar no que realmente importa.

- [ ] **Step 3: Mover waLink() calls para constantes módulo-level**

Em Home.tsx, os waLink calls no JSX criam novas strings a cada render. Extrair para constantes:

```typescript
// WhatsApp message constants (hoisted to avoid recreation on re-renders)
const WA_MSG_CONSULTORIA = "Olá, quero falar com a consultora premium para fazer minha seleção personalizada.";
const WA_MSG_EMBALAGEM = "Olá! Quero saber mais sobre a embalagem de luxo da Maison e os kits exclusivos.";
```

Estas são usadas via props nos componentes de seção — já estão hardcoded lá. Nenhuma mudança necessária.

- [ ] **Step 4: Commit (se houver mudanças)**

---

### Task 7: Build final e verificação

- [ ] **Step 1: Build de produção**

```bash
pnpm build
```

Esperado: build passa sem erros. Verificar que o output é menor que antes (menos dead assets).

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Esperado: 0 erros.

- [ ] **Step 3: Verificar imagens no dist**

```bash
find dist/public -name "*.webp" | wc -l
```

Esperado: ~27 imagens (44 antes -10 dead -7 duplicatas).

- [ ] **Step 4: Verificar que hero-bg NÃO está no dist**

```bash
find dist/public -name "hero-bg-*"
```

Esperado: sem resultados.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "perf: verify build — 27 images, zero dead assets, quality 90"
```

---

## Resumo

| Task | Descrição | Esforço |
|------|-----------|---------|
| 1 | Remover dead assets (hero-bg, VOLMOB, LISMOB, lora, fenix, -opt duplicatas) | 5 min |
| 2 | Reescrever optimize-images.mjs (quality 90, effort 6, todas imagens) | 15 min |
| 3 | Atualizar referências no código (remover -opt) | 10 min |
| 4 | Adicionar width/height em todas as imagens (CLS zero) | 15 min |
| 5 | Preconnect wa.me + preload Playfair Display | 2 min |
| 6 | Otimizações runtime (content-visibility, constantes) | 5 min |
| 7 | Build final e verificação | 5 min |
| **Total** | | **~1h** |

**Resultado esperado:**
- Imagens: ~27 arquivos (vs 44), qualidade 90, ~2.5 MB total (vs 3.6 MB)
- CLS: <0.05 (width/height em todas as imagens)
- LCP: -200ms (preconnect wa.me)
- Lighthouse estimado: 90-94
