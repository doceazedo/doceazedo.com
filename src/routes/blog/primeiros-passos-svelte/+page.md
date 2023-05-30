---
title: 'Svelte: visão geral e primeiros passos'
description: 'Tutorial de introdução ao Svelte para iniciantes'
date: '2023-02-15 08:30'
tags: ['svelte', 'beginners']
icon: 'svelte'
---

Quando eu comecei a estudar JavaScript e seus frameworks, eu fiquei levemente intimidado por opções como React e Vue. E depois de algumas tentativas frustradas de aprender React, eu conheci a palavra do Svelte — *e eles foram felizes para sempre*.

Por isso, eu recomendo Svelte como uma ótima opção de primeiro framework JavaScript a se aprender. Você terá a chance de aprender conceitos complexos com uma simplicidade muito similar a programar apenas com JavaScript.

> 💡 Muita gente prefere não chamar Svelte e React de frameworks, mas todo mundo entende se referir a eles dessa forma.

## Requisitos

Para seguir esse tutorial, eu assumo que você cumpra alguns pré-requisitos. Se você nunca usou JavaScript antes, por exemplo, talvez seja melhor se familiarizar com a linguagem antes de tentar aprender Svelte.

* Familiaridade com [HTML, CSS e JavaScript](https://www.w3schools.com/html/default.asp)
* Familiaridade com a sintaxe do [ES6](https://www.w3schools.com/js/js_es6.asp)
* [Node.js e npm](https://nodejs.org/pt-br/download) instalados

## O que é Svelte?

* Svelte é um framework JavaScript — mais especificamente, um **compilador**
* Diferente de outros frameworks, o Svelte compila seu código no momento de build
* Por padrão, seu código final é muito **menor** e mais **performático** que frameworks tradicionais

Um dos pontos principais é que, assim como outros frameworks, você pode desenvolver aplicações web separadas em **componentes**, elementos feitos com HTML, CSS e JavaScript que podem ser reusados de forma eficiente.

## Introdução

O jeito mais fácil de começar a programar em Svelte é usando o [REPL](https://svelte.dev/repl), um playground muito útil pra gente testar e compartilhar nosso código sem precisar inicializar um novo projeto na nossa máquina.

A primeira coisa que você verá ao abrir o REPL será algo parecido com isso:

![](/img/svelte-overview-repl-hello-world.png)

À esquerda temos nosso código e à direita a pré-visualização. Nesse exemplo podemos notar uma seção de lógica dentro de uma tag `<script>`, definindo a variável `name`. Logo abaixo, temos a marcação com um `<h1>` referenciando a variável `name`.

Repare como esse código é similar a um código em HTML e JavaScript _vanilla_.

## Estrutura de um componente

Agora, vamos dar uma olhada nesse outro componente:

```svelte
<script>
  let count = 0;
  
  const increment = () => {
    count++;
  }
</script>

<button on:click={increment}>
  Você me clicou {count} vezes!
</button>
```

Se o recriarmos no [REPL](https://svelte.dev/repl/fa5241ee97b046578b34f092ffcdbd43?version=3.55.1), poderemos ver que esse componente se parece com isso:

<p align="center">
  <img src="/img/svelte-overview-counter.gif" />
</p>

E com ele podemos entender alguns fatores determinantes:

* Podemos referenciar variáveis na nossa marcação com `{nomeDaVariavel}`
* Podemos chamar funções quando um elemento é clicado usando `on:click={nomeDaFuncao}`
* Nossa marcação é atualizada assim que o valor da variável é alterado

Agora, vamos estilizar nosso botão. Assim como temos uma tag `<script>` para lógica, nossa marcação em seguida, podemos adicionar também uma tag `<style>` no final para os nossos estilos:

```svelte
<script>
  let count = 0;
  
  const increment = () => {
    count++;
  }
</script>

<button on:click={increment}>
  Você me clicou {count} vezes!
</button>

<style>
  button {
    padding: 1rem 1.75rem;
    font-family: 'Rubik', sans-serif;
    font-size: 1.25rem;
    font-weight: 300;
    color: #fff;
    background-color: #6930c3;
    border: none;
    border-radius: 0.5rem;
  }
</style>
```

No [REPL](https://svelte.dev/repl/446dc9839ea14da48ae33f094106d87b?version=3.55.1), o componente deve ficar parecido com esse:

<p align="center">
  <img src="/img/svelte-overview-counter-style.png" style="height:203px" />
</p>

Você deve ter percebido que estamos aplicando um estilo a todos os elementos `button`. E o que acontece com outros `buttons` fora desse componente? Nada. **Todos os estilos e lógica são limitados apenas ao próprio componente e não afetam outros.**

Nesse ponto você deve ter percebido também que um componente Svelte é composto por três seções, sendo cada uma delas opcional:

* Lógica, dentro de uma tag `<script>`
* Marcação, usando tags HTML (e sintaxe do Svelte)
* Estilo, dentro de uma tag `<style>`

## Componentes, slots e props

Agora imagine que nós queremos reusar esse botão para fazer outras coisas que não só um contador. Para isso, ainda no REPL, podemos criar um arquivo **"Button.svelte"**:

Nesse novo componente, podemos usar a tag `<slot />` para definir onde os filhos do nosso componente deverão aparecer:

<p class="file-title">Button.svelte</p>

```svelte
<button on:click>
  <slot />
</button>

<style>
  /* ... */
</style>
```

Perceba também que deixamos o `on:click` vazio em `<button>`, dessa forma sinalizamos que caso nosso componente receba um `on:click`, é nesse elemento que ele deve ser aplicado.

Na prática, podemos criar outro arquivo **"Counter.svelte"** que usará nosso novo componente `<Button />` dessa maneira (sim, nós podemos usar um componente dentro do outro):

<p class="file-title">Counter.svelte</p>

```svelte
<script>
  import Button from './Button.svelte';
  
  let count = 0;
  
  const increment = () => {
    count++;
  }
</script>

<Button on:click={increment}>
  Você me clicou {count} vezes!
</Button>
```

Agora que nós temos um componente `<Button />` que serve para diversos fins e o nosso contador está organizado dentro do seu próprio componente `<Counter />`, vamos voltar ao primeiro arquivo **"App.svelte"** e importar ambos:

<p class="file-title">App.svelte</p>

```svelte
<script>
  import Counter from './Counter.svelte';
  import Button from './Button.svelte';
</script>

<Counter />
<Button>
  Outro botão!
</Button>
```

O resultado no [REPL](https://svelte.dev/repl/b906690e5cf444eeb9c4a11aaaff471b?version=3.55.1) deve ser semelhante a esse:

<p align="center">
  <img src="/img/svelte-overview-counter-button.png" style="height:217px" />
</p>

Agora você já sabe que pode passar texto e marcação como filhos de um componente pelo chamado `slot`. Mas você sabia que também pode criar `props`? Esses são atributos personalizados que podem ser passados do componente pai para o componente filho.

Vamos supor que queremos receber um valor inicial personalizado para nosso contador. Podemos exportar a variável `count` como um atributo, dessa forma:

<p class="file-title">Counter.svelte</p>

```diff
- let count = 0;
+ export let count = 0;
```

E agora, no nosso "App.svelte", podemos passar um valor `count` como atributo:

<p class="file-title">App.svelte</p>

```svelte
<Counter count={15} />
```

Se voltarmos ao [REPL](https://svelte.dev/repl/d6619bfec97b4f2fb01e071cf5c390f7?version=3.55.1), poderemos ver que agora o valor inicial de `count` é 15:

<p align="center">
  <img src="/img/svelte-overview-props.png" style="height:181px" />
</p>

O valor desse atributo poderia também vir de uma variável, dessa forma:

```svelte
<script>
  const count = 15;
</script>

<Counter count={count} />
```

Como o nome da variável e do atributo é o mesmo, ainda podemos encurtar esse código para:

```svelte
<script>
  const count = 15;
</script>

<Counter {count} />
```

## Data binding

Já que agora nós podemos passar `count` como prop, imagine que queremos mostrar esse valor fora do `Counter`, algo parecido com isso:

<p class="file-title">App.svelte</p>

```svelte
<script>
  let count = 0;
</script>

<Counter {count} />
O valor de count é: {count}
```

A primeiro momento, o código parece funcionar, mas você logo perceberá que quando o valor de `count` é atualizado dentro do componente, a valor da variável original se mantém o mesmo:

<p align="center">
  <img src="/img/svelte-overview-data-binding-fail.gif" />
</p>

Isso por que o dado flui do componente pai para o componente filho. Para corrigir isso, precisamos realizar o processo de **data binding** (ou também chamado de **two-way binding**) para o valor poder fluir também para o outro lado, do componente filho para o pai.

Em Svelte, podemos fazer isso simplesmente usando o prefixo `bind:` no nosso atributo, dessa maneira:

<p class="file-title">App.svelte</p>

```svelte
<script>
  let count = 0;
</script>

<Counter bind:count={count} />
O valor de count é: {count}
```

E da mesma maneira que fizemos com atributos e variáveis de mesmo nome, podemos encurtar esse código para apenas:

```svelte
<Counter bind:count />
```

Podemos agora voltar ao [REPL](https://svelte.dev/repl/d6619bfec97b4f2fb01e071cf5c390f7?version=3.55.1) e ver que nosso código agora funciona perfeitamente, com os dados atualizados no componente filho, também atualizados no pai:

<p align="center">
  <img src="/img/svelte-overview-data-binding.gif" />
</p>

## Recaptulando

Até o momento aprendemos os seguintes conceitos:

* Como usar o REPL
* A estrutura de um componente Svelte
* Básico da sintaxe de marcação do Svelte
* Componentes com slot e props
* Diretivas `on:click` e `bind:`

Agora que você já conhece o básico do Svelte, esse é um bom momento para iniciar nosso primeiro projeto na nossa máquina e conhecer melhor a sua estrutura.

## Criando projeto Svelte

Existem algumas maneiras de criar um novo projeto Svelte, a mais comum é usando o passo-a-passo do [Vite](https://vitejs.dev), ferramenta de *build* e *bundle*. Você também pode usar o [SvelteKit](https://kit.svelte.dev/), que usa o Vite por debaixo dos panos para fornecer uma experiência de desenvolvimento mais completa.

> 💡 Outra alternativa é usar o StackBlitz para ter a mesma experiência com uma IDE completa no seu navegador. Para isso, acesse o link: https://vite.new/svelte

Para simplificar nosso aprendizado, vamos limitar o nosso escopo ao Svelte com Vite. Então, para criar um projeto use os seguintes comandos:

1. Inicie o projeto com Vite e escolha Svelte com JavaScript
  ```bash
  $ npm create vite@latest meu-app
  ```
2. Depois, acesse a pasta com o seu novo projeto
  ```bash
  $ cd meu-app
  ```
3. Instale as dependências
  ```bash
  $ npm install
  ```
4. Por fim, inicie o ambiente de desenvolvimento:
  ```bash
  $ npm run dev
  ```

O processo é similar a esse:

<p>
  <video autoplay loop controls>
    <source src="/video/svelte-overview-scaffold.mp4" type="video/mp4">
  </video>
</p>

Com o ambiente de desenvolvimento aberto, qualquer mudança que fizermos no nosso projeto será aplicada em tempo real no navegador. O link para visualizar sua aplicação é mostrada no terminal, fique à vontade para abrir esse link no seu navegador de preferência. Você verá uma tela parecida com essa:

![](/img/svelte-overview-hello-vite.jpg)

Antes de nos aprofundarmos no código, recomendo que instale as extensões [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) e [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense), caso esteja usando o VS Code.

## Estrutura do projeto

Com o projeto inicializado, se abrirmos a paste que o Vite criou podemos notar três arquivos interessantes:

### main.js

Esse é o ponto de entrada do seu projeto, é o arquivo em que o Svelte será inicializado. Nós geralmente não precisamos mexer muito aqui, mas é importante entender o que está acontecendo nele.

<p class="file-title">main.js</p>

```js
import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
})

export default app
```

Com base nesse arquivo podemos entender alguns pontos importantes:

* O arquivo "app.css" está sendo importado e aplicará estilos globais na nossa aplicação
* O componente `<App />` está sendo usado como o ponto de entrada e englobará toda nossa aplicação
* Nossa aplicação Svelte será renderizada dentro de um elemento `#app` no arquivo "index.html"

### src/App.svelte

Esse é o componente de entrada. Nele podemos ver que está sendo importado outro componente chamado `<Counter />` além de adicionar algumas marcações e estilos adicionais. Sempre que quisermos adicionar um novo componente à nossa aplicação, podemos voltar aqui, assim como fazíamos no REPL.

### src/lib/Counter.svelte

O projeto que o Vite gera também inclui um componente `<Counter />`, muito similar ao que criamos anteriormente. O mais importante aqui é entender que podemos guardar nossos componentes nessa pasta **"src/lib"**.

## Iterando arrays com #each

Agora vamos imaginar que queremos mostrar uma lista de usuários. Para isso, vamos criar um componente `<UserCard />` e importá-lo na nossa aplicação, dessa forma:

<p class="file-title">src/lib/UserCard.svelte</p>

```svelte
<script>
  export let name;
  export let email;
</script>

<div class="user">
  <img
    class="avatar"
    src="https://avatars.dicebear.com/api/adventurer-neutral/{name}.svg"
    alt="Avatar de {name}"
  />
  <p class="nickname">{name}</p>
  <p class="email">{email}</p>
</div>

<style>
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
    padding: 2rem 1rem;
    border: 1px solid #f1f2f3;
    border-radius: 1rem;
    box-shadow: rgba(149, 157, 165, .2) 0 8px 24px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  .nickname {
    font-size: 16px;
    font-weight: bold;
  }

  .email {
    font-size: 14px;
  }
  
  .nickname,
  .email {
    margin: 0;
  }
</style>
```

Analisando esse componente, podemos entender que se trata de um cartão com os dados de um usuário, dados esses que devem ser passados através dos props `name` e `email`. Podemos usar esse novo componente dessa forma:

<p class="file-title">src/App.svelte</p>

```svelte
<script>
  import UserCard from './lib/UserCard.svelte';
</script>

<UserCard name="DoceAzedo" email="me@doceazedo.com" />
```

Ao abrir o navegador, você deve ver algo parecido com isso:

<p align="center">
  <img src="/img/svelte-overview-user-card.png" style="height:238px" />
</p>

> 💡 Se seu layout estiver muito diferente ou inconsistente, talvez você precise remover os estilos globais em "src/app.css" ou redefinir os estilos do seu layout usando algo como o [minireset.css](https://jgthms.com/minireset.css).

Imagine agora que nós queremos renderizar vários cartões de usuário. Para isso, vamos primeiro criar um componente `<UsersGrid />` e lá dentro vamos criar uma array com os dados de todos os usuários.

<p class="file-title">src/lib/UsersGrid.svelte</p>

```svelte
<script>
  import UserCard from './UserCard.svelte';

  const users = [
    {
      name: 'DoceAzedo',
      email: 'me@doceazedo.com',
      isAdmin: true
    },
    {
      name: 'John Doe',
      email: 'johndoe@example.com'
    },
  ];
</script>

<div class="grid">
  <!-- ... -->
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    padding: 1rem;
  }
</style>
```

Para renderizar um cartão para cada usuário, podemos fazer um loop nessa array dentro da nossa marcação, usando o bloco de lógico `{#each}`, similar ao `.map()` do JavaScript, dessa forma:

```svelte
<div class="grid">
  {#each users as user}
    <UserCard name={user.name} email={user.email} />
  {/each}
</div>
```

Agora podemos atualizar nossa aplicação para mostrar o novo `<UsersGrid />`:

<p class="file-title">src/App.svelte</p>

```svelte
<script>
  import UsersGrid from './lib/UsersGrid.svelte';
</script>

<UsersGrid />
```

E por fim nossa aplicação ficará se parecendo com isso:

<p align="center">
  <img src="/img/svelte-overview-users-grid.png" style="height:222px" />
</p>

## Renderização condicional com #if

Você notou que alguns usuários tem a propriedade `isAdmin`? Vamos atualizar nosso componente `<UserCard />` para receber um prop de mesmo nome:

<p class="file-title">src/lib/UserCard.svelte</p>

```diff
  export let name;
  export let email;
+ export let isAdmin = false;
```

> 💡 Quando definimos o valor de um prop, o mesmo se torna opcional e o valor inicial será usado caso nenhum outro seja informado.

<p class="file-title">src/lib/UsersGrid.svelte</p>

```diff
- <UserCard name={user.name} email={user.email} />
+ <UserCard name={user.name} email={user.email} isAdmin={user.isAdmin} />
```

Agora, em `<UserCard />` podemos usar um bloco de lógica `{#if}` para renderizar outro componente, marcação ou texto apenas para administradores, por exemplo:

<p class="file-title">src/lib/UserCard.svelte</p>

```svelte
<p class="nickname">
  {name}
  {#if isAdmin}
    🌟
  {/if}
</p>
```

> 💡 Assim como um `if` no JavaScript, esse bloco de lógica também pode ter um `{:else}` ou ainda `{:else if}` dentro dele. Veja mais sobre esse e outros blocos de lógica na [documentação](https://svelte.dev/docs#template-syntax-if).

## Classes dinâmicas

Podemos ainda adicionar uma classe dinâmica que será usada apenas caso `isAdmin` seja `true`, dessa maneira:

<p class="file-title">src/lib/UserCard.svelte</p>

```svelte
<div class="user" class:admin={isAdmin}>
  <!-- ... -->
</div>

<style>
  /* ... */

  .admin {
    border-color: #ffe08a;
    background-color: #fff8e5;
  }
</style>
```

Por fim, nossa aplicação deve se parecer com isso:

<p align="center">
  <img src="/img/svelte-overview-users-grid-admin.png" style="height:257px" />
</p>

## Ciclo de vida

Todo componente tem um ciclo de vida que começa quando ele é **montado** e terminado quando ele é **destruído**. Para realizar ações que acontecem somente uma vez, por exemplo, quando o componente é montado, podemos usar a função `onMount()` do Svelte.

Por exemplo, podemos usar a [API do JSONPlaceholder](https://jsonplaceholder.typicode.com) para puxar uma lista de usuários quando o componente `<UsersGrid />` for montado, dessa maneira:

<p class="file-title">src/lib/UsersGrid.svelte</p>

```svelte
<script>
  import { onMount } from 'svelte';
  import UserCard from './UserCard.svelte';

  let users = [];
  onMount(async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await resp.json();
  });
</script>

<div class="grid">
  {#each users as user}
    <UserCard name={user.name} email={user.email} />
  {/each}
</div>
```

Perceba que `onMount()` recebe como primeiro parâmetro uma função que será chamada assim que o componente for montado. A mesma pode ser assíncrona, como é nesse caso.

Agora sua aplicação deve se parecer com isso:

<p align="center">
  <img src="/img/svelte-overview-fetch.png" />
</p>

## Conclusão e próximos passos

Parabéns, agora você já entende os conceitos básicos para criar sua própria aplicação Svelte! 🎉 Se precisar, o projeto final está disponível nesse [REPL](https://svelte.dev/repl/b36fcdceed6f43028793d585e305ee50?version=3.55.1). O que você ainda pode fazer com esse projeto:

* Personalizar com seus próprios estilos e mudar o que quiser
* Inicializar um repositório e publicar no seu GitHub
* Hospedar sua aplicação em uma plataforma gratuita como a [Vercel](https://vercel.com)

Agora você pode se aprofundar em conceitos mais avançados e estudar ainda mais sobre Svelte. Essas são minhas recomendações do que estudar agora:

* [Stores](https://svelte.dev/docs#run-time-svelte-store): variáveis reativas globais
* [Demais diretivas](https://svelte.dev/docs#template-syntax-element-directives-on-eventname): existem outras diretivas além de `on:click` e `bind:`, tente ver sobre algumas
* [Transições](https://svelte.dev/docs#run-time-svelte-transition): você pode adicionar transições aos seus componentes sem bibliotecas adicionais
* [Slots](https://svelte.dev/docs#template-syntax-slot): às vezes são necessários múltiplos `<slots />` e você pode fazer isso nomeando cada um
* [Elementos especiais](https://svelte.dev/docs#template-syntax-svelte-component): existem alguns elementos para lidar com o `window` e componentes dinâmicos
* [Context](https://svelte.dev/docs#run-time-svelte-setcontext): você pode definir valores disponíveis apenas e para todos num contexto específico
* [SvelteKit](https://kit.svelte.dev) 🌟: framework fullstack para desenvolver apps Svelte completos

Você encontrará muitos recursos valiosos no próprio site do Svelte, infelizmente, no momento, todos em inglês. Esses recursos incluem:

* [Documentação](https://svelte.dev/docs)
* [Tutorial oficial](https://svelte.dev/tutorial)
* [Tutorial oficial (novo, em desenvolvimento)](https://learn.svelte.dev)

Espero que esse post tenha te ajudado a esclarecer conceitos básicos sobre Svelte! Fique à vontade para deixar dúvidas, sugestões e suas criações nos comentários. Publicarei mais tutorias em breve™!