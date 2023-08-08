---
title: 'Ambiente de desenvolvimento no Docker para aplicações Vite'
description: ''
date: '2023-07-31 09:31'
tags: ['docker', 'vite']
icon: 'docker-moby'
---

Nesse tutorial eu vou te ajudar a configurar ambientes Docker de produção e desenvolvimento, com direito à hot reload, que vai funcionar com suas aplicações Vite. Se você estiver usando Turborepo, perfeito, vou te mostrar como faz também!

Antes de tudo, eu assumo que você já tenha um ambiente simples de Docker + Vite. Se você ainda não tem, dá uma olhada [nesse outro post](/blog/sveltekit-docker) (SvelteKit).

// Da pra reusar conhecimento para outros gerenciadores de monorepo (ou mesmo nenhum). Tbm da pra reusar com outras ferramentas que não Vite.

## Diferenciando ambientes

// .env e NODE_ENV

<p class="file-title">.env</p>

```sh
NODE_ENV="development"
```

// target

<p class="file-title">docker-compose.yml</p>

```yml
services:
  frontend:
    build:
      context: .
      dockerfile: ./apps/frontend/Dockerfile
      target: ${NODE_ENV}
```

## Usando arquivos locais

// Explicar volume binding

// Explicar `- /app/apps/frontend/node_modules`

<p class="file-title">docker-compose.yml</p>

```yml
services:
  frontend:
    build:
      context: .
      dockerfile: ./apps/frontend/Dockerfile
      target: ${NODE_ENV}
    volumes:
      - type: bind
        source: ./apps/frontend
        target: /app/apps/frontend
      - type: bind
        source: ./packages
        target: /app/packages
      - /app/apps/frontend/node_modules
```

## Builds de múltiplas etapas

// Explicar multi-stage builds

// Explicar que baseado no nosso Dockerfile, vamos adicionar uma etapa development, mesmo nome do target

// TODO: ^ mudança de planos, vamos usar o Dockerfile básico de exemplo, depois mostrar como ficaria com Turborepo.

```Dockerfile
# ...

FROM base AS development
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
COPY ./packages ./packages
COPY ./apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
CMD npm run dev
```

TODO: Esse código ainda não foi aprovado pelo Leozinho! ⚠️

// Por consequência:

<p class="file-title">Dockerfile</p>

```diff
- FROM base AS runner
+ FROM base AS production
```

## Hot reload 🔥

// Explicar tbm o 0.0.0.0

<p class="file-title">vite.config.ts</p>

```ts
export default defineConfig({
	// ...
	server: {
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true
		}
	},
	preview: {
		host: '0.0.0.0',
		port: 3000
	}
});
```
