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

## FASE 1 — Imagens em alta resolução

**Problema:** o site usava as variantes `-mob` (1x, 380–600px) em todos os
layouts, inclusive desktop. Esticadas, ficavam visivelmente sem qualidade.
As variantes `-mob-2x` (720–880px) existiam no repositório mas **não eram
referenciadas em lugar nenhum**.

**Correção:** 5 imagens repontadas para `-2x`.

| Imagem | Antes | Depois |
|---|---|---|
| consultora | 400×470 | **720×845** |
| hair-care-volume | 380×359 | **760×718** |
| hair-care-liso | 380×214 | **760×428** |
| floratta-red-lifestyle | 600×448 | **760×567** |
| malbec-collage | 600×445 | **720×538** |

**Exceção:** `malbec-lifestyle` ficou no arquivo 1x — nesse caso específico o
arquivo "1x" (800×597) é **maior** que o próprio "-2x" (760×567). Anomalia de
como os arquivos foram gerados originalmente.

**Hero intocado**, conforme pedido: `malbecSMOB.webp`, `malbecDDESK.webp` e
`malbec-signatureA.webp` seguem como estavam.

> ⚠️ Os arquivos-fonte originais em alta (`*-opt.webp`, `floratta.webp`,
> `malbec1.webp`) **não existem mais** no repositório. Os `-2x` são a maior
> resolução disponível hoje. Se você tiver os originais, dá pra regerar com
> qualidade bem melhor.

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
