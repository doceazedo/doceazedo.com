---
title: 'Como usar SvelteKit com Docker'
description: 'Tutorial de como colocar projetos SvelteKit em contêineres Docker'
date: '2023-07-27 09:00'
tags: ['svelte', 'docker']
icon: 'docker-moby'
---

Você quer dockerizar seu projeto SvelteKit? É super fácil, eu te mostro! ☺️

Antes de tudo, se você ainda não criou seu projeto, você pode fazer isso usando o comando `npm create svelte@latest`.

Para começar, vamos usar um [*adapter*](https://kit.svelte.dev/docs/adapters) para servidores Node. Para isso, você deve instalá-lo com `npm i -D @sveltejs/adapter-node` e atualizar o arquivo **svelte.config.js** do seu projeto:


<p class="file-title">svelte.config.js</p>

```diff
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-node';
```

## Dockerizando

Na raíz do seu projeto, crie um arquivo **.dockerignore** que listará os arquivos e diretórios que nós queremos que o contêiner ignore, como dependências, configurações e arquivos gerados pelo SvelteKit:

<p class="file-title">.dockerignore</p>

```
.svelte-kit
build
node_modules
.dockerignore
.eslintignore
.eslintrc.cjs
.git
.gitattributes
.gitignore
.prettierignore
.prettierrc
README.md
```

Depois, crie um arquivo **Dockerfile**, que servirá como uma lista de intruções para o Docker construir a imagem do contêiner.

O SvelteKit precisa do **Node 16** ou mais recente, por isso recomendo usar uma imagem baseada no Alpine, por já vir com tudo o que precisamos configurado e ser bem leve e performática. Para isso, escrevemos `FROM node:16-alpine`.

Agora vamos usar `WORKDIR /app` para definir o diretório de trabalho, depois `COPY package.json package-lock.json ./` para copiar as dependências do projeto que deverão ser instaladas. Para instalá-las, usamos `RUN npm ci` para fazer uma instalação limpa que corresponde ao `package-lock.json` do seu projeto.

> 💡 Lembre-se que se seu projeto usa outro gerenciador de pacotes, os comandos e arquivos podem variar.

Depois, vamos copiar os arquivos restantes com `COPY . .` e fazer a build do projeto com `RUN npm run build`. Por fim, vamos expor a porta padrão com `EXPOSE 3000` e rodar a aplicação usando `CMD ["node", "build"]`.

O arquivo deve ficar mais ou menos assim:

<p class="file-title">Dockerfile</p>

```Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "build"]
```

Agora podemos usar o comando `docker build` para fazer a build da imagem do contêiner. Use a flag `-t` para dar uma **tag**, ou seja, um nome legível para sua imagem, e no fim, `.` para indicar o diretório para *buildar* a imagem.

```sh
docker build -t sveltekit-docker .
```

Depois, podemos usar `docker run` com a flag `-p` com [as portas](https://docs.docker.com/network/#published-ports) e a tag que acabamos de definir para rodar nossa contêiner:

```sh
docker run -p 3000:3000 sveltekit-docker
```

Tudo pronto! 🎉 Sua aplicação agora está rodando e pode ser acessada em `http://localhost:3000`!

## Docker Compose

Se quiser ir um passo além, você pode configurar um novo contâiner com seu projeto usando o **Docker Compose**, uma ferramenta que te ajuda a configurar e rodar aplicações com múltiplos contâineres.

Se ainda não tiver, crie um arquivo **docker-compose.yml**. Depois, adicione um novo serviço com um nome de sua escolha, que deve ficar mais ou menos assim:

<p class="file-title">docker-compose.yml</p>

```yml
services:
  sveltekit-docker:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

Os valores vão variar de acordo com cada projeto. Por exemplo, se o "docker-compose.yml" está na raíz do repositório, mas seu projeto SvelteKit está na pasta "./apps/frontend", o `context` deve refletir isso.

🎊 Agora, você pode iniciar sua aplicação com o Docker Compose:

```sh
docker-compose up
```

## Conclusão

Essa é uma configuração básica para dockerizar seus projetos SvelteKit, você pode otimizar ainda mais suas imagens e configurar mais opções, e eu espero que esse artigo te dê um pontapé inicial para usar Docker nos seus projetos.

> 💡 De acordo com as dependências de cada projeto, as configurações podem ser mais complexas, por exemplo, para monorepos e para usar o Prisma.

Qualquer dúvida, pode deixar aí nos comentários (se eu não souber responder, eu peço pro [Leozinho](/blog/tryhackme-couch#:~:text=Leozinho) responder por mim)! 💜