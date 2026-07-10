# Cinematic Commerce — Maison Fragrance

Uma landing page de e-commerce cinematográfica para a Maison Fragrance, revendedora autorizada do Grupo Boticário e Eudora.

## Stack

- **Frontend:** React 19 + Vite + TypeScript
- **Estilo:** Tailwind CSS v4 + Radix UI + Framer Motion
- **Roteamento:** Wouter
- **Backend:** Express (apenas para servir o build em produção)

## Como rodar

```bash
pnpm dev   # dev server na porta 5000
```

O workflow `Start application` já está configurado e roda automaticamente.

## Estrutura

```
client/src/        # Código React (componentes, páginas)
client/src/components/ui/  # Componentes Shadcn/UI
server/index.ts    # Express server (produção)
shared/            # Tipos/constantes compartilhados
vite.config.ts     # Configuração do Vite
```

## User preferences

- Manter estrutura e stack existentes
