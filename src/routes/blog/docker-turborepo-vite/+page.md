---
title: 'Dockerizando aplicações Vite de um Turborepo'
description: ''
date: '2023-07-31 09:30'
tags: ['docker', 'turborepo', 'vite']
icon: 'docker-moby'
---

Eu amo monorepos e o Turborepo é maneiríssimo. Eu sempre dou o exemplo de poder criar um pacote de componentes frontend e reusar ele em múltiplos projetos que vivem num mesmo repositório, sem precisar versionar uma biblioteca separadamente.

E se você está trabalhando com múltiplas aplicações que compõem um mesmo projeto, naturalmente você vai querer dockerizar tudo com Docker Compose.

O problema: num monorepo, uma aplicação pode depender da outra, e copiar todo o repositório para o contêiner, além de pesado, gera trabalho a mais na hora do Docker fazer a build só de uma parte do código quando houverem mudanças em outra parte do projeto.

A solução? `turbo prune` ao resgate!

## Podando nosso código ✂️🌳🍃

// explicar prune detalhadamente

// citar que dockerignore ainda sera necessario, avisar que falaremos mais na frente sobre e linkar exemplo pro post passado

## Criando o projeto

// se ainda nao fez, turborepo getting started

// se ainda nao fez, npm create vite@latest

## It's Docker time!

<p align="center">
  <img src="https://i.imgur.com/5l1MUjk.gif" />
</p>

// Primeiro, explicar contexto e docker compose

// Docker ignore agora deve ir pra raiz, ja que contexto tbm ta la

<p class="file-title">docker-compose.yml</p>

```yml
services:
  frontend:
    build:
      context: .
      dockerfile: ./apps/frontend/Dockerfile
```

// Explicar estágios

first stage (build)

// node >=18 necessario apesar de nao documentado (fonte: https://github.com/vercel/turbo/issues/2336#issuecomment-1468583751)

<p class="file-title">Dockerfile</p>

```Dockerfile
FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker
```

segundo estagio (instalação)

<p class="file-title">Dockerfile</p>

```Dockerfile
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=frontend...
```

terceiro e ultimo estagio: rodar!

// explicar treta de nao ser root (especialmente importante em prod!!)

<p class="file-title">Dockerfile</p>

```Dockerfile
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite
USER vite

COPY --from=installer /app/apps/frontend/package.json .
COPY --from=installer --chown=vite:nodejs /app/apps/frontend/build ./apps/frontend/build

CMD node apps/frontend/build
```

Por fim, deve ficar parecido com esse:

<p class="file-title">Dockerfile</p>

```Dockerfile
FROM node:18-alpine AS base
 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=frontend...
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit
USER sveltekit

COPY --from=installer /app/apps/frontend/package.json .
COPY --from=installer --chown=sveltekit:nodejs /app/apps/frontend/build ./apps/frontend/build

CMD node apps/frontend/build
```

## Conclusão

// ref: documentação do Turborepo
