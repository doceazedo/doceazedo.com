---
title: 'Introdução ao Svelte: visão geral e primeiros passos'
description: 'COLOCAR DESCRIÇÃO!!!'
date: '2022-08-10 20:15 GMT-3'
tags: ['svelte']
icon: 'svelte'
---

// verdeiramente reativo
// sem virtual dom
// resumir introdução no geral

Não é novidade para ninguém que o ecossistema do JavaScript é cheio de framework que vem e vão, cada um com suas peculiaridades, mas todos com a mesma proposta de permitir criar interfaces interativas com facilidade. Svelte cumpre esse propósito de um jeito diferente, onde você escreve menos código e deixa o compilador tratar do trabalho pesado.

Sim, compilador! Diferente de outros frameworks, o Svelte converte o seu código em JavaScript vanilla no momento de build, isso significa que não é necessário que seus usuários importem a todo o framework ao acessar o seu site, fazendo sua aplicação carregar muito mais rápido.

E por boa parte do código que escrevemos já se assemelhar muito com o JavaScript vanilla, sem a necessidade de boilerplates nem muitas abstrações, a curva de aprendizagem é muito baixa tanto para iniciantes quanto para quem já conhece outros frameworks.

## O que vamos precisar

- Conhecimentos de [HTML](https://w3schools.com/html/default.asp) e [CSS](https://www.w3schools.com/css/default.asp)
- Conhecimento de [JavaScript](https://www.w3schools.com/js/default.asp)
- Familiaridade com funcionalidades e sintaxe do [ES6+](https://w3schools.com/Js/js_es6.asp)
- [Node.js e NPM](https://nodejs.org/en) (ou [yarn](https://yarnpkg.com)) instalados globalmente
- Familiaridade com [APIs REST](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697) também é desejável

## Objetivos

Nesse tutorial nós vamos criar uma pequena aplicação com Svelte. Nosso site vai servir como um simples banco de usuários, e com isso nós poderemos aprender:

- Como **configurar** um projeto Svelte
- A **composição** de um arquivo Svelte
- Como trabalhar com **dados, xxxxx e yyyyy** em Svelte
- Como usar a **sintaxe de template** do Svelte para apresentar dados e componentes
- Como usar uma **API** para **criar, atualizar, visualizar e apagar** usuários
- Como usar **tabelas**, **formulários** e realizar **validações**
- Como hospedar uma aplicação Svelte no **GitHub Pages**

## Preparando o ambiente

Se você quiser testar o Svelte sem precisar baixar nada, no site oficial você encontra o [REPL](https://svelte.dev/repl), que serve como playground para criar aplicações, fazer testes, compartilhar código e brincar no navegador.

Agora, a forma oficial em mais simples para inicializar um novo projeto Svelte na sua máquina é utilizando o [Vite](https://vitejs.dev), ferramenta que deixa fácil fazer a build e subir um ambiente de desenvolvimento da nossa aplicação. Para isso, use o comando:

```bash
yarn create vite nome-app --template svelte
# ou com typescript
yarn create vite nome-app --template svelte-ts
```

Esse comando vai criar um projeto na pasta "nome-app" com os arquivos iniciais da nossa aplicação. Podemos agora acessar essa pasta e instalar as dependências com os seguintes comandos:

```bash
cd nome-app
yarn
```

Agora, sempre que quisermos rodar o ambiente de desenvolvimento, poderemos usar o comando:

```bash
yarn dev
```

Com o servidor aberto, se você acessar http://127.0.0.1:5174 no seu navegador, você deve ver uma página parecida com essa:

![](/img/vite-plus-svelte.jpg)

Perceba que no fim da página é citado o [SvelteKit](https://kit.svelte.dev), um framework oficial desenvolvido em cima do Svelte e é comparável ao Next.js para React ou Nuxt para Vue. Essa é outra boa opção para desenvolver projetos Svelte, mas não será o nosso foco agora.

> Além disso, caso você esteja usando o VS Code e não tenha recebido a notificação, recomendo utilizar a extensão oficial [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) para adicionar _syntax highlighting_ e _intellisense_ aos arquivos Svelte.

## Anatomia de um componente Svelte

Os componentes Svelte usam a extensão de mesmo nome, `.svelte`, e consistem de apenas três partes, todas opcionais:

- Lógica, representado pela tag `<script>`
- Marcação, representado por tags HTML
- Estilização, representado pela tag `<style>`

E se parece com isso:

```svelte
<script>
  const name = 'Doce';
</script>

<p>Olá, {name}!</p>

<style>
  p {
    color: #6930c3;
  }
</style>
```

Se você já estiver acostumado a programar em Vue, perceberá uma grande semelhança com a diferença de que é necessário menos código para escrever o mesmo componente.

Intuitivamente, podemos escrever JavaScript dentro da tag `<script>` para desenvolver toda a lógica do nosso componente; CSS dentro de `<style>` para aplicar estilos apenas à ele e; nossa marcação pode ficar entre essas duas tags.

Entendendo isso, já podemos desenvolver nossa aplicação de fato!

## Criando um componente

Vamos começar criando um componente `UsersTable` com uma tabela de dados estáticos. Por uma preferência minha, vou chamar o arquivo de `users-table.svelte`, escrito em kebab-case, mas caso você prefira escrever em CamelCase, não há problema algum. Vou criar esse arquivo na pasta `src/lib/components`.

<p class="file-title">src/lib/components/users-table.svelte</p>

```svelte
<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Endereço de e-mail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DoceAzedo</td>
      <td>me@doceazedo.com</td>
    </tr>
    <tr>
      <td>Stella Stefany da Costa</td>
      <td>stellasdc@hotmail.com</td>
    </tr>
    <tr>
      <td>Rafael Maya Moraes</td>
      <td>rafamoraes@gmail.com</td>
    </tr>
  </tbody>
</table>
```

Perceba que nosso arquivo falta as tags `<script>` e `<style>`, o que não é um problema. Enquanto não tivermos lógica nem estilos, podemos omitir essas tags. No momento, nosso componente não tem diferença de um arquivo HTML qualquer.

Agora poderemos importar e usar nosso componente em outra parte da nossa aplicação, nesse caso, em **App.svelte**:

<p class="file-title">src/App.svelte</p>

```svelte
<script>
  import UsersTable from './lib/components/users-table.svelte';
</script>

<UsersTable />
```

Se você acessar o site novamente, verá algo parecido com isso:

// TODO: screenshot

Agora, vamos refatorar um pouco a nossa aplicação para usar os dados de uma array de objetos ao invés de preenchermos os valores diretamente na tabela, de forma _hard coded_. Então vamos criar uma array de `users` com os usuários e um ID, para facilitar identificar cada um mais tarde.

<p class="file-title">src/App.svelte</p>

```svelte
<script>
  import UsersTable from './lib/components/users-table.svelte';

  let users = [
    {
      id: 1,
      name: 'DoceAzedo',
      email: 'me@doceazedo.com'
    },
    {
      id: 2,
      name: 'Stella Stefany da Costa',
      email: 'stellasdc@hotmail.com'
    },
    {
      id: 3,
      name: 'Rafael Maya Moraes',
      email: 'rafamoraes@gmail.com'
    }
  ];
</script>

<UsersTable />
```

> Sim, só precisamos criar uma variável. Nada de `useState` do React, nem `data` do Vue.

Ainda precisamos precisamos passar essa variável para o nosso componente e podemos fazer isso como qualquer outro atributo HTML:

```svelte
<!-- prettier-ignore -->
<UsersTable users={users} />
```

E como o atributo e variável têm o mesmo nome, podemos encurtar para apenas:

```svelte
<UsersTable {users} />
```

Agora, para que o nosso componente receba esse valor, só precisamos adicionar a tag `<script>` no topo do arquivo e exportar uma variável `users`. Podemos ainda dar um valor inicial a ela para tornar o atributo opcional.

<p class="file-title">src/lib/components/users-table.svelte</p>

```svelte
<script>
  export let users = [];
</script>

<!-- ... -->
```

### Iterando arrays com `{#each}`

Nosso componente continua usando valores predefinidos, então devemos fazer ele mostrar os itens na tabela de acordo com a array que recebemos em `users`, e para isso podemos usar o bloco `{#each}`:

<p class="file-title">src/lib/components/users-table.svelte</p>

```svelte
<script>
  export let users = [];
</script>

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Endereço de e-mail</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    {/each}
  </tbody>
</table>
```

Apesar de não ter nenhuma diferença visual, agora nosso componente trabalha com dados de uma forma muito mais eficiente e flexível.

## Manipulando formulários

## Validação de formulário

### Condições com `{#if}`

## Fazendo requisições a uma API

### GET

### POST

### PUT

### DELETE

## Fazendo deploy para o GitHub Pages

## Conclusão

...

próximos passos (sveltekit)
