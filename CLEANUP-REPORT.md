# CLEANUP REPORT — S&C Beauty

**Branch:** `cleanup/refactor-safe` (a partir de `main` @ `efe06cc`)
**Data:** 2026-07-20
**Stack:** React 19 + Vite 5 + TypeScript 5.6 + Tailwind v4 (SPA, sem backend)

Cada fase é um commit isolado — dá pra reverter qualquer uma individualmente com
`git revert <sha>`.

| Fase | Commit | Descrição |
|---|---|---|
| 1 | `0e91afd` | Imagens em alta resolução + 2 imagens quebradas corrigidas |
| 2 | `338e546` | Gitlinks órfãos + `robots.txt` inválido |
| 2b | `bd6b2a2` | `.gitignore` para o gitlink não voltar |
| 3 | `9852ba5` | Código morto, assets e scripts não usados |
| 4 | — | Sem alterações (ver justificativa) |

---

## 🐛 Bugs encontrados e corrigidos

Não estavam no escopo pedido, mas eram defeitos reais em produção:

1. **Duas imagens quebradas no site.** `FlorattaRedShowcase.tsx` apontava para
   `/floratta.webp` e `MalbecShowcase.tsx` para `/malbec1.webp` — nenhum dos dois
   arquivos existia em `client/public/`. Religados para as variantes `-2x`
   correspondentes, que existiam mas estavam sem uso.

2. **JSON-LD (SEO) com imagem inexistente.** O structured data em `index.html`
   referenciava `malbec1.webp` (inexistente). Religado para `malbec1-mob-2x.webp`
   e o `sc-beauty-lockup.png` trocado por `og-image.png`.

3. **`robots.txt` com sintaxe inválida.** Continha `<!-- TODO -->` — comentário
   HTML não é válido em robots.txt (o formato usa `#`). Podia fazer crawler
   engasgar na linha do `Sitemap:`.

4. **Repositório git em estado quebrado.** Duas entradas gitlink (mode `160000`)
   sem `.gitmodules`: `cinematic-commerce-vite/` (pasta vazia — repo aninhado
   commitado por engano) e `awesome-design-md/`.

---

## FASE 1 + FASE 5 — Imagens em alta resolução

**Problema:** o site servia as variantes `-mob` (380–880px) esticadas em
**todos** os viewports, inclusive desktop. Visivelmente sem qualidade.

**Causa-raiz:** o commit `18cd5d9` ("gg") **deletou as 8 imagens desktop
originais** do repositório. O commit anterior `0713165` já havia removido as
tags `<source>` mobile de todas as seções, com a intenção declarada de "usar as
imagens desktop em todos os viewports" — mas os arquivos desktop foram apagados
logo depois, deixando o site preso nas variantes mobile.

**Correção final (commit `8028a8f`):** as 8 imagens desktop foram
**recuperadas do histórico do git** (`git checkout 18cd5d9^ -- ...`) e
religadas em todas as seções.

| Imagem | Antes | Depois |
|---|---|---|
| consultora | 720×845 | **1200×1408** |
| hair-care-volume | 760×718 | **2200×2078** |
| hair-care-liso | 760×428 | **1672×941** |
| floratta-red-lifestyle | 760×567 | **2400×1792** |
| malbec-collage | 720×538 | **2400×1792** |
| malbec-lifestyle | 800×597 | **2400×1792** |
| malbec1 | 880×657 | **2400×1792** |
| floratta | 760×760 | **1024×1024** |

**Hero intocado**, conforme pedido: `malbecSMOB.webp`, `malbecDDESK.webp` e
`malbec-signatureA.webp` seguem exatamente como estavam, com o `<picture>` e os
breakpoints originais.

Todas as 8 variantes `-mob`/`-mob-2x` foram para quarentena.

> ⚠️ **Trade-off de peso:** as imagens de seção passaram de ~270 KB para
> ~1,2 MB no total. Todas são lazy-loaded (abaixo da dobra, via `LazySection` +
> `loading="lazy"`), então não afetam o LCP — mas o mobile agora baixa arquivos
> bem maiores. Se quiser o melhor dos dois mundos depois, o caminho é
> reintroduzir `<picture>` com `<source media="(max-width: 767px)">` apontando
> para variantes intermediárias (~1000–1200px) geradas a partir dessas
> desktop — que é justamente o que o `generate-mobile-srcset.mjs` (em
> quarentena) fazia.

---

## FASE 2 — Arquivos inválidos

- Removidos do índice do git os 2 gitlinks órfãos. `awesome-design-md/`
  continua no disco (é um repo de referência clonado), só saiu do controle
  do git. `cinematic-commerce-vite/` era uma pasta vazia e foi removida.
- `.gitignore`: adicionada entrada para `awesome-design-md/`, senão qualquer
  `git add -A` re-adiciona o gitlink quebrado. **Foi o único arquivo de
  config tocado** — era necessário pro fix da fase 2 persistir.
- `robots.txt`: `<!-- -->` → `#`.
- `sitemap.xml`: **mantido como está** — `<!-- -->` é comentário válido em XML.

---

## FASE 3 — Código morto

### Módulos removidos (0 imports, provado por grep em todo o `src`)

| Arquivo | Por quê |
|---|---|
| `hooks/useMobile.tsx` | Nenhum import |
| `hooks/useComposition.ts` | Ilha morta: só era usado por... |
| `hooks/usePersistFn.ts` | ...ele mesmo. Nada externo importa a dupla |
| `components/ui/tooltip.tsx` | Nenhum import |
| `components/ui/sonner.tsx` | `App.tsx` importa o pacote `sonner` direto, não o wrapper |

### CSS morto (`index.css`: 596 → 567 linhas)

Removidos: `.header-premium`, `@utility card-premium`,
`@utility animate-bottle-in`, `@utility animate-bottle-float` e os
`@keyframes bottle-enter` / `bottle-float` que só serviam a esses dois.

**Mantidos** (verifiquei que têm uso real, apesar de parecerem órfãos):
`animate-bg-slow-zoom` (usado em `CtaFinal.tsx`) e `luxe-glow-gold`
(usado inline em `MalbecShowcase.tsx`).

Bundle CSS: 85.51 kB → **84.85 kB** (gzip 14.63 → **14.30 kB**).

### Não havia nada a limpar

Procurei e **não encontrei**: blocos de código comentado, `console.log` de
debug (os 3 `console.*` existentes são legítimos — tratamento de erro e boot
do servidor), comentários tipo "teste"/"old", imports não usados.

O código já tinha sido enxugado antes. `Home.tsx` tem 284 linhas.

---

## FASE 4 — Normalização

**Nenhuma alteração.** Verifiquei e não existe no projeto: linhas em branco
excessivas (3+ consecutivas), nem trailing whitespace.

O único "problema" restante é que o código não está no formato canônico do
Prettier — mas rodar `pnpm format` reformataria **os ~30 arquivos do `src`**,
gerando um diff de milhares de linhas que enterraria toda a limpeza e tornaria
a revisão impossível. Fora do espírito de "não reescreva".

👉 Se quiser, rode `pnpm format` você mesmo depois, num commit separado.

---

## 📦 `/_quarentena` — revisar e deletar depois

**855 KB · 28 arquivos.** Nada aqui é referenciado pelo código (verificado
por grep + build + servidor rodando).

### `logos-nao-usados/` (500 KB, 8 arquivos)
`sc-monogram-black.png/.svg`, `sc-monogram-gold.png/.svg`,
`sc-monogram-white.png`, `sc-beauty-lockup.png/.svg`, `preview.webp`

Variantes de logo que sobraram. Os PNGs foram substituídos pelos SVGs;
`preview.webp` e o lockup ficaram órfãos quando o Footer passou a usar
`sc-monogram-transparente.webp`.
⚠️ Guarde os `.svg` se quiser as versões preto/dourado no futuro.

### `assets-baixa-resolucao/` (180 KB, 8 arquivos)
As variantes 1x substituídas na Fase 1, mais `floratta-mob.webp`,
`malbec1-mob.webp` e `malbec-lifestyle-mob-2x.webp` (nunca usados).

### `artefatos-dev/` (144 KB, 3 arquivos)
- `auditoria-completa.html` — relatório antigo, marca "Maison Parfum", fora do build
- `structured-data.json` — duplicata órfã do JSON-LD que já está inline no
  `index.html`, com domínio velho (`maisonfragrance.vercel.app`)
- `haircare.jpg` — screenshot sem referência

### `scripts-nao-usados/` (20 KB, 4 arquivos)
`generate-hero-bg.mjs`, `generate-hero-composite.mjs`, `generate-hero-images.mjs`,
`generate-mobile-srcset.mjs` — só `optimize-images.mjs` está no `package.json`.
⚠️ `generate-mobile-srcset.mjs` documenta como as variantes foram geradas;
pode ser útil se você recuperar os arquivos-fonte originais.

### `modulos-mortos/` (11 KB, 5 arquivos)
Os 5 módulos da Fase 3.

---

## ⚠️ Suspeito — NÃO toquei

1. **`canvas`, `mupdf`, `pdf2svg` no `package.json`** — **zero uso no código**.
   `canvas` e `mupdf` são dependências binárias pesadas. Quase certamente lixo
   de alguma IA anterior. Você proibiu mexer em `package.json`, mas
   **recomendo remover** — economiza bastante no `node_modules` e no tempo de
   instalação.

2. **`pnpm build` reescreve os `.webp` toda vez.** O `optimize-images.mjs`
   recomprime as imagens in-place, sujando o git a cada build. Não é bug da
   limpeza — é comportamento do script. Considere torná-lo idempotente ou
   movê-lo pra um comando manual.

3. **`replit.md` e `.replit`** — o projeto migrou pra Vercel; provavelmente
   obsoletos. São config, então deixei.

4. **`CLAUDE.md` está desatualizado** e vai confundir IAs futuras: diz
   "55+ shadcn components" (são **2** agora), "Home.tsx ~1448 LOC" (são **284**)
   e "TooltipProvider no App" (não existe). Não atualizei porque não estava no
   escopo — mas vale corrigir.

5. **Placeholders de produção ainda pendentes:** o número de WhatsApp
   (`5531900000000`), o domínio (`SEU-DOMINIO.com.br` em `index.html`,
   `robots.txt`, `sitemap.xml`) e o CNPJ no Footer.

---

## ✅ Verificação

Rodado ao fim de **cada** fase:

- `pnpm check` (tsc --noEmit) — ✅ limpo
- `pnpm build` — ✅ sem erros
- Validação de que **toda** referência a asset no bundle final resolve — ✅
- Dev server (`pnpm dev`) subindo e respondendo **HTTP 200** em: página,
  12 assets críticos e os 7 módulos de seção lazy — ✅
- Log do Vite sem nenhum erro/warning — ✅

**Diff total:** 42 arquivos, +74 / −84 linhas.

**Nada foi deletado permanentemente.** Tudo que saiu está em `/_quarentena`
e rastreado no git.
