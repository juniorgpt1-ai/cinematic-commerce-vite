# Plano de Segurança — Defense in Depth (OWASP + Vercel)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o projeto em uma aplicação com segurança em camadas seguindo OWASP ASVS, OWASP Top 10, OWASP Cheat Sheet Series e recomendações da Vercel.

**Architecture:** Security-first hardening com foco em headers HTTP (CSP, HSTS, Permissions-Policy), eliminação de vazamento de informação, correção de vulnerabilidades em dependências, mitigação de SSRF, e boas práticas de Content Security Policy.

**Tech Stack:** React 19 + Vite 5 + TypeScript + Express 4 + Vercel (static) deployment

## Global Constraints

- Deploy na Vercel como site estático (sem serverless functions)
- Vercel `vercel.json` headers para CSP/HSTS em produção
- Express server como fallback (não usado na Vercel, mantido para self-host)
- Build: Vite → `dist/public/` + esbuild → `dist/index.js`
- Nenhuma alteração que quebre o fluxo WhatsApp (core CTA)
- Manter compatibilidade com Vite 5.x (não migrar para v6/v7 ainda)
- OWASP ASVS Level 1 como baseline

---

# AUDITORIA COMPLETA — RESULTADOS

## Vulnerabilidades Encontradas

### CRITICAL (3)

| ID | Problema | Arquivo | Risco |
|----|----------|---------|-------|
| C1 | Stack trace exposto em produção | `client/src/components/ErrorBoundary.tsx:37` | Information Disclosure |
| C2 | SSRF via proxy `/manus-storage` ativo em produção | `vite.config.ts:186-237` | SSRF / Credential Exposure |
| C3 | vitest@2.1.9 — CVE crítica (arbitrary file read/exec) | `package.json` (devDeps) | RCE via dev server |

### HIGH (5)

| ID | Problema | Arquivo | Risco |
|----|----------|---------|-------|
| H1 | Sem CSP (Content-Security-Policy) | `vercel.json`, `server/index.ts` | XSS / Data Injection |
| H2 | Sem HSTS (Strict-Transport-Security) | `vercel.json`, `server/index.ts` | MITM / Downgrade |
| H3 | Sem Permissions-Policy | `vercel.json`, `server/index.ts` | Feature Abuse |
| H4 | vite@5.4.21 — bypass `server.fs.deny` no Windows | `package.json` | File Read |
| H5 | `VITE_WHATSAPP_NUMBER` exposto no bundle cliente | `client/src/lib/whatsapp.ts:4-5` | Information Disclosure |

### MEDIUM (10)

| ID | Problema | Arquivo | Risco |
|----|----------|---------|-------|
| M1 | Inline `<style>` gigante — bloqueia CSP estrita | `client/index.html:44-62` | CSP bypass |
| M2 | Inline `<script>` (MutationObserver) — bloqueia CSP estrita | `client/index.html:91` | CSP bypass |
| M3 | `rel="noreferrer"` sem `noopener` em 18+ links | Múltiplos arquivos `.tsx` | Tabnabbing |
| M4 | `vitePluginCssPreload` injeta `onload=` inline | `vite.config.ts:175` | CSP blocker |
| M5 | Server `allowedHosts` muito permissivo | `vite.config.ts:288-299` | Host Header Injection |
| M6 | `vitePluginManusDebugCollector` sem body size limit | `vite.config.ts:139-141` | DoS (dev-only) |
| M7 | 15 dependências desatualizadas | `package.json` | Supply Chain |
| M8 | Telefone placeholder hardcoded no HTML estático | `client/index.html:84` | Information Disclosure |
| M9 | URLs placeholder (`SEU-DOMINIO.com`) no HTML/canonical/robots | Múltiplos arquivos | SEO/Phishing |
| M10 | Sem proteção anti-clickjacking no Vercel | `vercel.json` | Clickjacking |

### LOW (6)

| ID | Problema | Arquivo | Risco |
|----|----------|---------|-------|
| L1 | `.gitignore` não cobre `.env.production` | `.gitignore` | Secret Leak |
| L2 | `express@4.22.2` — versão antiga | `server/index.ts` | Supply Chain |
| L3 | `console.error` de erro do servidor sem sanitização | `server/index.ts:54` | Log Injection |
| L4 | `pnpm.onlyBuiltDependencies` legado (não lido pelo pnpm) | `package.json` | Config drift |
| L5 | Sem rate limiting no Express | `server/index.ts` | DoS |
| L6 | Sem `Cross-Origin-Resource-Policy` / `Cross-Origin-Embedder-Policy` | `server/index.ts` | Cross-Origin leak |

### Verificações LIMPAS (sem vulnerabilidades)

- `dangerouslySetInnerHTML` — **não encontrado** em nenhum arquivo
- `eval()`, `Function()`, `document.write()` — **não encontrados**
- `innerHTML`, `outerHTML`, `insertAdjacentHTML` — **não encontrados**
- `window.open()`, `postMessage()`, `javascript:` URLs — **não encontrados**
- API keys / secrets no código fonte — **não encontrados** (exceto placeholder phone)
- `.env` real no repositório — **não encontrado** (apenas `.env.example`)
- Scripts de build (`scripts/*.mjs`) — apenas processamento de imagem com `sharp`, sem riscos
- `localStorage` — apenas para tema (light/dark), baixo risco
- Formulários — não existem (tudo via WhatsApp), sem input injection

---

# PLANO DE REMEDIAÇÃO EM CAMADAS

## CAMADA 1 — CRÍTICAS (Alta Prioridade)

### 1.1 — Corrigir vazamento de stack trace no ErrorBoundary

**Problema:** `ErrorBoundary.tsx:37` renderiza `{this.state.error?.stack}` em produção — qualquer erro exibe paths internos, nomes de funções e lógica do bundle para o usuário final (e atacantes).

**Risco:** Information Disclosure (OWASP A05:2021). Atacante pode provocar erros intencionais para mapear a estrutura do código.

**Impacto:** Alto — expõe estrutura interna do bundle, paths de arquivos, nomes de funções.

**Arquivo afetado:** `client/src/components/ErrorBoundary.tsx:35-39`

**Dificuldade:** Baixa

**Prioridade:** CRÍTICA

**Como será corrigido:**
- Em produção (`import.meta.env.PROD`): mostrar mensagem genérica "Algo deu errado. Recarregue a página." sem stack trace
- Em desenvolvimento: manter o stack trace para debugging
- Adicionar check `import.meta.env.DEV` para condicional render do `<pre>` block

**Efeitos colaterais:** Nenhum. Debugging em dev mantido.

**Compatibilidade:** Total com React/Vite/Vercel.

---

### 1.2 — Desativar `vitePluginStorageProxy` em produção / Blindar contra SSRF

**Problema:** O plugin `manus-storage-proxy` em `vite.config.ts:186-237`:
- Expõe o endpoint `/manus-storage` que faz proxy de requisições para uma API interna (forge)
- Usa `BUILT_IN_FORGE_API_KEY` como Bearer token — se a env var vazar, o proxy vira SSRF
- O parâmetro `key` não é sanitizado (linha 191)
- Redireciona (307) para qualquer URL retornada pela API forge (linha 228)
- **O plugin está sempre ativo** (linha 245), não apenas em dev

**Risco:** SSRF (OWASP A10:2021). Se as env vars de forge estiverem configuradas, um atacante pode usar o proxy para acessar recursos internos.

**Impacto:** Crítico — acesso a APIs internas, potencial exfiltração de dados.

**Arquivo afetado:** `vite.config.ts:186-237, 245`

**Dificuldade:** Baixa

**Prioridade:** CRÍTICA

**Como será corrigido:**
- Mover `vitePluginStorageProxy()` para dentro do array condicional `isDev` (junto com manusRuntime e debugCollector)
- Adicionar validação de `key` com regex restritivo (apenas alfanumérico + `/-_.`) como defesa adicional
- Adicionar rate limit no endpoint (máx 10 req/s no dev server)

**Efeitos colaterais:** Nenhum em produção (proxy nunca foi necessário em prod). Em dev, storage proxy continua funcionando normalmente.

**Compatibilidade:** Total.

---

### 1.3 — Atualizar vitest para >= 3.2.6 (corrigir CVE crítica)

**Problema:** `vitest@2.1.9` tem CVE crítica (GHSA-5xrq-8626-4rwp): "When Vitest UI server is listening, arbitrary file can be read and executed."

**Risco:** RCE via Vitest UI — um atacante com acesso de rede ao dev server Vitest UI pode ler e executar arquivos arbitrários.

**Impacto:** Crítico em ambiente de desenvolvimento.

**Arquivo afetado:** `package.json` (devDependencies)

**Dificuldade:** Média (major version bump 2.x → 3.x pode ter breaking changes)

**Prioridade:** CRÍTICA

**Como será corrigido:**
- `pnpm add -D vitest@^3.2.6`
- Verificar breaking changes do Vitest 3.x (API de testes, configuração)
- Rodar `npx vitest --run` para confirmar que o runner funciona
- Ajustar `vitest.config.ts` se necessário (provavelmente nenhum ajuste, não há testes)

**Efeitos colaterais:** Vitest 3.x mudou algumas APIs (snapshot format, pool config). Como o projeto não tem testes ainda, impacto zero.

**Compatibilidade:** Total com Vite 5.x (Vitest 3.x suporta Vite 5).

---

## CAMADA 2 — IMPORTANTES

### 2.1 — Implementar CSP (Content-Security-Policy) no Vercel

**Problema:** Sem CSP configurado. O `index.html` tem inline `<style>` (44 linhas) e inline `<script>` (MutationObserver) que bloqueiam CSP estrita.

**Risco:** XSS (OWASP A03:2021). Sem CSP, um script injetado (via CDN compromise, extensão maliciosa, ou DOM XSS) executa sem barreira.

**Impacto:** Alto — CSP é a última linha de defesa contra XSS.

**Arquivos afetados:**
- `vercel.json` — adicionar bloco `headers`
- `client/index.html` — extrair inline style/script para arquivos externos
- `vite.config.ts` — `vitePluginCssPreload` (injeta `onload=` inline)

**Dificuldade:** Alta (extrair inline style/script, gerar nonces/hashes)

**Prioridade:** ALTA

**Como será corrigido:**
1. **Extrair inline `<style>`** para `client/src/critical.css` e usar `<link rel="stylesheet">` inline (permitido com `style-src 'unsafe-inline'` ou hash) OU usar nonce gerado pelo Vite
2. **Extrair inline `<script>`** para `client/src/hero-fallback.js` e carregar como `<script type="module">`
3. **Adicionar headers no `vercel.json`:**
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://wa.me; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'" }
    ]
  }
]
```
4. **Resolver `vitePluginCssPreload`** — remover `onload=` do plugin, usar `<link rel="stylesheet">` normal

**Efeitos colaterais:**
- Google Fonts precisam ser self-hosted (já são) ou adicionados ao `font-src`
- Imagens de WhatsApp/OG precisam de `img-src https:` (já incluído)
- `style-src 'unsafe-inline'` mantido temporariamente; migrar para nonces no futuro

**Compatibilidade:** Total com Vercel (headers estáticos). Funciona em todos os browsers modernos.

---

### 2.2 — Adicionar Security Headers no Vercel e Express

**Problema:** Faltam headers de segurança essenciais:
- **HSTS** (`Strict-Transport-Security`) — protege contra downgrade de HTTPS
- **Permissions-Policy** — restringe APIs do browser (câmera, microfone, geolocalização)
- **Cross-Origin-Resource-Policy** — previne vazamento cross-origin
- **X-Frame-Options** — já existe no Express mas **falta no Vercel** (`vercel.json` sem headers)

**Risco:** MITM, clickjacking, abuso de APIs do browser, vazamento de dados cross-origin.

**Impacto:** Médio-Alto.

**Arquivos afetados:**
- `vercel.json` — adicionar headers estáticos
- `server/index.ts` — complementar headers existentes

**Dificuldade:** Baixa

**Prioridade:** ALTA

**Como será corrigido:**

**vercel.json:**
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { "key": "Cross-Origin-Resource-Policy", "value": "cross-origin" },
      { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
      { "key": "Content-Security-Policy", "value": "..." }
    ]
  }
]
```

**server/index.ts** — adicionar headers faltantes:
- `Strict-Transport-Security` (em produção)
- `Permissions-Policy`
- `Cross-Origin-Resource-Policy`

**Efeitos colaterais:** Nenhum. Headers são aditivos, não quebram funcionalidade existente.

**Compatibilidade:** Total. São headers HTTP padrão (RFC 6797, W3C Permissions Policy, etc.).

---

### 2.3 — Atualizar vite para mitigar CVE de file bypass no Windows

**Problema:** `vite@5.4.21` é vulnerável a `server.fs.deny` bypass em Windows (CVE GHSA-9w8q-2x2w-5q5q).

**Risco:** Um atacante pode bypassar a proteção `server.fs` e acessar arquivos fora do root permitido.

**Impacto:** Alto em Windows — permite leitura de arquivos do sistema via dev server.

**Arquivo afetado:** `package.json` (devDependencies)

**Dificuldade:** Média — manter compatibilidade com plugin ecosystem Vite 5

**Prioridade:** ALTA

**Como será corrigido:**
- `pnpm add -D vite@^5.4.22` (último patch da linha 5.x com a correção)

**Efeitos colaterais:** Patch version, sem breaking changes. Todos os plugins compatíveis.

**Compatibilidade:** Total.

---

### 2.4 — Blindar `VITE_WHATSAPP_NUMBER` no bundle cliente

**Problema:** `import.meta.env.VITE_WHATSAPP_NUMBER` é exposto no bundle JavaScript cliente. Por design do Vite, qualquer env var prefixada com `VITE_` é inlined no bundle. O número de WhatsApp é considerado PII (embora comercial).

**Risco:** Information Disclosure — qualquer visitante pode ver o número no bundle JS.

**Impacto:** Baixo-Médio (número comercial público, mas facilita scraping/spam).

**Arquivo afetado:** `client/src/lib/whatsapp.ts:4-5`

**Dificuldade:** Baixa

**Prioridade:** MÉDIA

**Como será corrigido:**
- Documentar que este é um número comercial intencionalmente público
- Adicionar header `X-Robots-Tag: noindex` no HTML de fallback (já que o número está hardcoded lá também) — não, isso quebraria SEO
- Alternativa: manter como está; é um trade-off aceitável para WhatsApp commerce
- Mitigação: implementar rate limiting no Vercel (via `vercel.json` rewrites ou Vercel WAF) para evitar scraping excessivo

**Efeitos colaterais:** Nenhum. O número PRECISA estar no cliente para gerar links WhatsApp.

**Compatibilidade:** Total.

---

## CAMADA 3 — BOAS PRÁTICAS

### 3.1 — Corrigir `rel="noreferrer"` → `rel="noopener noreferrer"`

**Problema:** 18+ links externos usam `rel="noreferrer"` mas não incluem `noopener`. Embora browsers modernos tratem `noreferrer` como implicando `noopener`, a OWASP recomenda explicitamente ambos.

**Risco:** Tabnabbing / Reverse Tabnabbing — `window.opener` pode ser manipulado para phishing.

**Impacto:** Baixo (browsers modernos já mitigam).

**Arquivos afetados:** 18 ocorrências em 9 arquivos (Home.tsx, WhatsappFloating.tsx, MalbecShowcase.tsx, KitsGrid.tsx, HairCareSuite.tsx, Footer.tsx, EditorialShowcase.tsx, CtaFinal.tsx, Consultoria.tsx, BoticarioCarousel.tsx)

**Dificuldade:** Baixa

**Prioridade:** MÉDIA

**Como será corrigido:**
- Substituição global: `rel="noreferrer"` → `rel="noopener noreferrer"` em todos os arquivos `.tsx` e `.html`
- Criar um componente wrapper `<ExternalLink>` ou helper para padronizar — **NÃO fazer** (YAGNI, todos os links são WhatsApp, não há variação)
- Apply replace_all nos arquivos afetados

**Efeitos colaterais:** Nenhum. `noreferrer` já esconde o referrer; adicionar `noopener` não muda comportamento.

**Compatibilidade:** Total.

---

### 3.2 — Extrair inline style/script para CSP compatível

**Problema:** `client/index.html` contém:
- Linhas 44-62: bloco `<style>` de 18 linhas (critical CSS inline)
- Linha 91: bloco `<script>` (MutationObserver para esconder hero fallback)

Ambos bloqueiam CSP estrita (`script-src 'self'` / `style-src 'self'`).

**Risco:** Se CSP for implementado com `'unsafe-inline'`, a proteção fica enfraquecida.

**Impacto:** Médio — reduz eficácia do CSP.

**Arquivo afetado:** `client/index.html:44-62, 91`

**Dificuldade:** Média

**Prioridade:** MÉDIA

**Como será corrigido:**

**Inline `<style>` (critical CSS):**
- Calcular hash SHA-256 do conteúdo e usar `style-src 'sha256-<hash>'` no CSP — isso permite este inline específico sem `'unsafe-inline'`

**Inline `<script>` (MutationObserver):**
- Mesma abordagem: hash SHA-256 no CSP
- OU extrair para arquivo `client/public/hero-fallback.js` (mas perde o benefício de ser inline/bloqueante para evitar FOUC)

**Melhor abordagem:** Usar hashes para ambos. O Vite pode gerar os hashes no build via plugin customizado.

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'sha256-<hashDoScript>' 'sha256-<hashDoMutationObserver>'; style-src 'self' 'sha256-<hashDoCriticalCSS>'; ...">
```

**Efeitos colaterais:** Hashes precisam ser recalculados quando o conteúdo inline muda. Automatizar via script de build.

**Compatibilidade:** Total. CSP com hashes é suportado em todos os browsers modernos.

---

### 3.3 — Atualizar dependências desatualizadas

**Problema:** 15 pacotes atrás da versão latest:
- `express@4.22.2` → `5.2.1` (major)
- `@vitejs/plugin-react@4.7.0` → `6.0.3` (major)
- `typescript@5.6.3` → `7.0.2` (major)
- `lucide-react@0.453.0` → `1.25.0` (major)
- `@tailwindcss/vite@4.3.2` → `4.3.3` (patch)
- etc.

**Risco:** Supply chain — vulnerabilidades conhecidas em versões antigas, falta de patches de segurança.

**Impacto:** Médio — acumula risco ao longo do tempo.

**Arquivo afetado:** `package.json`

**Dificuldade:** Média-Alta (major version bumps com breaking changes)

**Prioridade:** MÉDIA

**Como será corrigido:**
- **Patch/minor updates (sem breaking changes):** atualizar imediatamente
  - `@tailwindcss/vite`, `tailwindcss`, `tsx`, `sharp`, `vite-plugin-manus-runtime`
- **Major updates (com breaking changes):** avaliar e agendar
  - `express@5`: API mudou, mas server/index.ts é simples (~55 LOC), migração viável
  - `@vitejs/plugin-react@6`: compatível com Vite 5? Verificar docs
  - `typescript@7`: check `tsc --noEmit` após upgrade
  - `lucide-react@1`: ícones renomeados/removidos — verificar breaking changes e ajustar imports
  - `rollup-plugin-visualizer@7`: breaking changes na API
  - `@types/express@5`: compatível com express@5

**Efeitos colaterais:** Breaking changes do TypeScript 7 podem afetar tipagem do projeto. Lucide React 1.x renomeou vários ícones.

**Compatibilidade:** Requer verificação cuidadosa de breaking changes.

---

### 3.4 — Adicionar `.env.production` ao `.gitignore`

**Problema:** `.gitignore` cobre `.env`, `.env.local`, `.env.*.local` mas **não** `.env.production`.

**Risco:** Se alguém criar `.env.production` com o número real, pode ser commitado acidentalmente.

**Impacto:** Baixo-Médio.

**Arquivo afetado:** `.gitignore`

**Dificuldade:** Trivial

**Prioridade:** MÉDIA

**Como será corrigido:**
- Adicionar `.env.production` e `.env.*` (qualquer env específico) ao `.gitignore`

**Efeitos colaterais:** Nenhum.

**Compatibilidade:** Total.

---

### 3.5 — Substituir placeholder `SEU-DOMINIO.com`

**Problema:** Vários arquivos contêm `SEU-DOMINIO.com` como placeholder:
- `client/index.html:14` — canonical URL
- `client/index.html:20-32` — OG tags e Twitter cards
- `client/public/robots.txt:3` — Sitemap URL

**Risco:** SEO incorreto, links quebrados em redes sociais.

**Impacto:** Baixo (segurança), mas relevante para produção.

**Arquivos afetados:** `client/index.html`, `client/public/robots.txt`

**Dificuldade:** Trivial

**Prioridade:** BAIXA

**Como será corrigido:**
- Usar env var `VITE_SITE_URL` com fallback para localhost
- Ou definir o domínio real no deploy (via Vercel env vars)

**Efeitos colaterais:** Nenhum.

**Compatibilidade:** Total.

---

## CAMADA 4 — HARDENING

### 4.1 — Implementar Rate Limiting no Express

**Problema:** `server/index.ts` não tem rate limiting. Um atacante pode fazer scraping agressivo ou DoS simples.

**Risco:** DoS / Resource Exhaustion.

**Impacto:** Baixo (site é majoritariamente estático, sem endpoints POST).

**Arquivo afetado:** `server/index.ts`

**Dificuldade:** Baixa

**Prioridade:** BAIXA

**Como será corrigido:**
- Instalar `express-rate-limit`
- Configurar: 100 req/15min por IP para rotas estáticas
- Endpoint catch-all (SPA fallback): 200 req/15min

```ts
import rateLimit from "express-rate-limit";
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
```

**Efeitos colaterais:** Em produção Vercel, rate limiting é feito pelo edge (não pelo Express). No self-host, adiciona proteção.

**Compatibilidade:** Total.

---

### 4.2 — Adicionar Helmet ao Express (modo produção)

**Problema:** Embora o server já tenha alguns headers manuais, o middleware `helmet` fornece configuração completa e mantida de headers de segurança.

**Risco:** Headers ausentes ou mal configurados manualmente.

**Impacto:** Baixo (headers manuais já cobrem o essencial).

**Arquivo afetado:** `server/index.ts`

**Dificuldade:** Baixa

**Prioridade:** BAIXA

**Como será corrigido:**
- Instalar `helmet`
- Substituir middleware manual de headers por `app.use(helmet())` com configuração customizada
- Helmet já inclui: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS, X-DNS-Prefetch-Control, etc.

```ts
import helmet from "helmet";
app.use(helmet({
  contentSecurityPolicy: false, // CSP gerenciado pelo Vercel/meta tag
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
```

**Efeitos colaterais:** CSP do Helmet é desabilitado (gerenciado separadamente). Headers padrão do Helmet são mais restritivos que os atuais.

**Compatibilidade:** Total.

---

### 4.3 — Adicionar Subresource Integrity (SRI) para scripts

**Problema:** Scripts carregados sem `integrity` hash — se o CDN for comprometido, código malicioso pode ser injetado.

**Risco:** Supply Chain / CDN Compromise.

**Impacto:** Baixo (todos os assets são self-hosted via Vite, sem CDN externo).

**Arquivo afetado:** `vite.config.ts`

**Dificuldade:** Média

**Prioridade:** BAIXA

**Como será corrigido:**
- Plugin Vite `vite-plugin-sri` para gerar hashes de integridade automaticamente
- Ou configuração manual no `rollupOptions`

```ts
import sri from "vite-plugin-sri";
// adicionar aos plugins
```

**Efeitos colaterais:** Hashes quebram se o arquivo for modificado após build. Em deploy Vercel (imutável), não há problema.

**Compatibilidade:** Total.

---

### 4.4 — Sanitizar logs do servidor

**Problema:** `server/index.ts:54` — `startServer().catch(console.error)` — em caso de erro na inicialização, o objeto de erro é logado diretamente. Dependendo do erro, pode vazar paths ou configuração.

**Risco:** Information Disclosure via logs.

**Impacto:** Baixo.

**Arquivo afetado:** `server/index.ts:54`

**Dificuldade:** Trivial

**Prioridade:** BAIXA

**Como será corrigido:**
```ts
startServer().catch((err) => {
  console.error("Failed to start server:", err instanceof Error ? err.message : "Unknown error");
  process.exit(1);
});
```

**Efeitos colaterais:** Perde stack trace no log (mas em produção já não seria útil mesmo).

**Compatibilidade:** Total.

---

### 4.5 — Remover `onload=` inline do `vitePluginCssPreload`

**Problema:** `vite.config.ts:175` — o plugin injeta `onload="this.media='all'"` como atributo inline, o que viola CSP estrita (`script-src` sem `'unsafe-inline'`).

**Risco:** Bloqueia implementação de CSP estrita.

**Impacto:** Baixo.

**Arquivo afetado:** `vite.config.ts:173-176`

**Dificuldade:** Baixa

**Prioridade:** BAIXA

**Como será corrigido:**
- Remover o hack `onload=` e usar `<link rel="stylesheet">` normal (sem `media="print"`)
- O trade-off é que o CSS bloqueia renderização, mas isso é aceitável para um site de landing page (o CSS é pequeno após minificação)

**Efeitos colaterais:** CSS volta a ser render-blocking. Impacto insignificante em performance (o Vite já gera bundles pequenos).

**Compatibilidade:** Total.

---

## CAMADA 5 — PERFORMANCE SEM REDUZIR SEGURANÇA

### 5.1 — Mover `vite-plugin-manus-runtime` para dev-only (já está, verificar)

**Problema:** O plugin já está condicionado a `isDev` (linha 244). Confirmar que não há resíduo em produção.

**Risco:** Exposição de endpoints de debug em produção.

**Impacto:** Baixo (já está condicionado).

**Arquivo afetado:** `vite.config.ts:244`

**Dificuldade:** Trivial

**Prioridade:** BAIXA

**Como será corrigido:**
- Build de produção e verificar se `__manus__` endpoints NÃO estão presentes no bundle final
- Adicionar comentário explícito: "// DEV-ONLY: never shipped to production"

**Efeitos colaterais:** Nenhum.

**Compatibilidade:** Total.

---

### 5.2 — Configurar cache headers para segurança

**Problema:** Headers de cache já estão configurados no Express (linhas 33-38), mas:
- `client/index.html` não define `Cache-Control` via meta tag
- Vercel automaticamente aplica cache agressivo para assets com hash

**Risco:** Cache poisoning — se um HTML for cacheado com headers errados, usuários podem receber versão antiga com vulnerabilidades conhecidas.

**Impacto:** Baixo.

**Arquivos afetados:** `vercel.json`, `client/index.html`

**Dificuldade:** Baixa

**Prioridade:** BAIXA

**Como será corrigido:**
- Adicionar headers de cache seletivos no `vercel.json`:
```json
{
  "source": "/index.html",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }]
},
{
  "source": "/assets/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
}
```
- Para arquivos sem hash de conteúdo (imagens, fonts): usar `max-age=86400, stale-while-revalidate`

**Efeitos colaterais:** Melhora performance (cache de assets) sem reduzir segurança (HTML nunca cacheado).

**Compatibilidade:** Total com Vercel.

---

### 5.3 — Adicionar `__vercel` ao `.gitignore`

**Problema:** `.vercel` pasta pode conter tokens de deploy e configuração local.

**Risco:** Exposição acidental de config Vercel.

**Impacto:** Baixo.

**Arquivo afetado:** `.gitignore` (já contém `.vercel` na linha 115 — verificar)

**Dificuldade:** Trivial

**Prioridade:** BAIXA

**Como será corrigido:**
- Confirmar que `.vercel` está no `.gitignore` (já está)
- Adicionar `.vercel/output` se quiser ser mais específico

**Efeitos colaterais:** Nenhum.

**Compatibilidade:** Total.

---

# ROADMAP DE IMPLEMENTAÇÃO

## Fase 1 — Correções Críticas

| Etapa | Item | Camada | Duração Estimada |
|-------|------|--------|------------------|
| 1.1 | 🔴 Corrigir vazamento de stack trace no ErrorBoundary | C1 | 15 min |
| 1.2 | 🔴 Desativar storage proxy em produção (SSRF) | C1 | 15 min |
| 1.3 | 🔴 Atualizar vitest → >= 3.2.6 | C1 | 30 min |
| 1.4 | 🔴 Atualizar vite → >= 5.4.22 | C2 | 15 min |
| 1.5 | 🟠 Adicionar Security Headers no Vercel (HSTS, XFO, etc.) | C2 | 30 min |
| 1.6 | 🟠 Adicionar Security Headers no Express | C2 | 15 min |
| 1.7 | 🟠 Implementar CSP baseline no Vercel + meta tag | C2 | 1h |

**Total Fase 1:** ~3h | **Criticidade:** BLOQUEANTE para deploy

---

## Fase 2 — Proteções Adicionais

| Etapa | Item | Camada | Duração Estimada |
|-------|------|--------|------------------|
| 2.1 | 🟡 Corrigir `rel="noreferrer"` → `noopener noreferrer` (18 links) | C3 | 15 min |
| 2.2 | 🟡 Extrair inline style → hash CSP / external file | C3 | 1h |
| 2.3 | 🟡 Extrair inline script → hash CSP / external file | C3 | 30 min |
| 2.4 | 🟡 Atualizar deps patch/minor (tailwind, tsx, sharp, etc.) | C3 | 30 min |
| 2.5 | 🟡 Adicionar `.env.production` ao `.gitignore` | C3 | 5 min |
| 2.6 | 🟡 Substituir `SEU-DOMINIO.com` pelo domínio real | C3 | 15 min |

**Total Fase 2:** ~2.5h | **Criticidade:** IMPORTANTE

---

## Fase 3 — Hardening

| Etapa | Item | Camada | Duração Estimada |
|-------|------|--------|------------------|
| 3.1 | 🔵 Instalar e configurar `helmet` no Express | C4 | 20 min |
| 3.2 | 🔵 Instalar e configurar `express-rate-limit` | C4 | 15 min |
| 3.3 | 🔵 Adicionar SRI (Subresource Integrity) no build | C4 | 30 min |
| 3.4 | 🔵 Sanitizar error handling do servidor | C4 | 5 min |
| 3.5 | 🔵 Remover `onload=` inline do `vitePluginCssPreload` | C4 | 15 min |

**Total Fase 3:** ~1.5h | **Criticidade:** RECOMENDADO

---

## Fase 4 — Monitoramento

| Etapa | Item | Camada | Duração Estimada |
|-------|------|--------|------------------|
| 4.1 | ⚪ Configurar Vercel Analytics / Web Analytics | C5 | 30 min |
| 4.2 | ⚪ Verificar headers com securityheaders.com | C5 | 15 min |
| 4.3 | ⚪ Rodar OWASP ZAP scan no deploy preview | C5 | 30 min |
| 4.4 | ⚪ Documentar configuração de segurança no README/CLAUDE.md | C5 | 15 min |

**Total Fase 4:** ~1.5h | **Criticidade:** BOA PRÁTICA

---

## Fase 5 — Auditoria Final

| Etapa | Item | Camada | Duração Estimada |
|-------|------|--------|------------------|
| 5.1 | ⚪ Rodar `pnpm audit` e verificar 0 vulnerabilidades | — | 10 min |
| 5.2 | ⚪ Rodar `pnpm build` e verificar build limpo | — | 10 min |
| 5.3 | ⚪ Rodar `pnpm check` (TypeScript) sem erros | — | 10 min |
| 5.4 | ⚪ Verificar headers CSP/HSTS no deploy preview | — | 10 min |
| 5.5 | ⚪ Revisão manual de todos os arquivos modificados | — | 20 min |

**Total Fase 5:** ~1h | **Criticidade:** GATE DE QUALIDADE

---

# SUMÁRIO EXECUTIVO

| Camada | Itens | Criticidade |
|--------|-------|-------------|
| CAMADA 1 — Críticas | 3 | 🔴 Bloqueantes |
| CAMADA 2 — Importantes | 4 | 🟠 Alta prioridade |
| CAMADA 3 — Boas Práticas | 6 | 🟡 Média prioridade |
| CAMADA 4 — Hardening | 5 | 🔵 Baixa prioridade |
| CAMADA 5 — Performance | 3 | ⚪ Cosmético |

**Tempo total estimado:** ~9.5h (distribuído em 5 fases)

**Vulnerabilidades críticas que devem ser corrigidas ANTES do próximo deploy:**
1. ErrorBoundary stack trace leak
2. vitePluginStorageProxy ativo em produção (SSRF)
3. vitest CVE (RCE no dev server)
