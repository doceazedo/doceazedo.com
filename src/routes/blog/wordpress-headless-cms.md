---
title: 'Old school: usando o WordPress como um headless CMS'
date: '2022-01-11 18:10 GMT-3'
tags: ['wordpress', 'meta']
icon: 'wordpress'
---

Antes de tudo, deixa eu avisar que esse é um post daqueles mais avacalhados onde a gente vai mais conversar do que seguir um tutorial. Então, se você quiser pular toda a conversa fiada, [clique aqui](#tutorial).

Mês passado eu fui escrever um novo post pro blog, que até aquele momento estava sendo movido pelo Contentful. Como ainda era o terceiro post do blog, eu fui tentar fazer uma coisa bem básica pela primeira vez: adicionar uma imagem. Eu não consegui.

A verdade é que o editor de texto do Contentful é uma porcaria generalizada e super limitado. Escrever blocos de código (algo meio que essencial pra um blog de programação) é uma experiência horrenda. E me esgueirando entre pequenos aborrecimentos, todo o trampo que seria subir uma imagem e fazer o site reconhecer ela foi o estopim para eu decidir que iria mudar de CMS. Mas qual?

## Ideia 1: Arquivos Markdown

Quando esse site aqui ainda estava no campo das ideias, o conceito original para esse blog era simplesmente salvar uns arquivos em Markdown e deixar o SvelteKit gerar as páginas a partir deles. Parece a solução perfeita pra mim. Eu gosto de Markdown, eu poderia colocar todos os posts num [submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) e eu não ficaria limitado a um editor específico. Mas parece que a Vercel não é muito fã dessa ideia.

Depois de muito tentar fazer a Vercel permitir que eu usasse o `fs` para ler os arquivos no momento da build, então eu entendi que não rola de fazer isso. Agora, se você conhece alguma maneira de fazer isso, por favor me avisa nos comentários que eu faço a terceira versão desse blog imediatamente. Afinal, você já viu algum blog de programação com conteúdo de verdade? Claro que não! Devs só refazem o próprio blog várias vezes e registram o processo (vide esse post).

## Ideia 2: Outro headless CMS

As opções de headless CMS são muitas, e eu realmente não tava afim de ter que testar um por um só pra descobrir que não ia me agradar e refazer tudo com o próximo. Ou pior, só descobrir que não serve pra mim quando eu fosse escrever o próximo post meses depois!

_Nota do autor: revisando o texto, percebi que esse parágrafo implica que eu só vou escrever o próximo post daqui alguns meses, o que indica a falta de consideração com meu próprio blog e a minha consciência disso._

Até considerei testar o Strapi, pois sempre ouço falar bastante dele, mas pra hospedar de graça eu teria que colocar num Heroku da vida e eu não queria ver meu blog dormindo. 😪💤

## Ideia 3: Back to WordPress

Eu já usei WordPress por muitos anos. Eu conheço e amo esse miserável melhor do que eu gostaria e apesar das inúmeras desvantagens que ele traz como um CMS completo, ele fornece uma API _out of the box_ que me permitiria usar ele como um ✨ _headless CMS_ ✨ muito facilmente.

<p align="center">
  <img src="/img/embrace-wp.webp">
</p>

Mas quanto a hospedagem? Bom, mesmo sem ter nenhum projeto ativo na Hostinger, eu já alugo uma hospedagem compartilhada com eles há muitos anos que está sempre me salva quando eu preciso subir um arquivo via FTP ou rodar um script PHP. E também é lá que ficam todos os meus e-mails e imagine ter que migrar todos eles 🥶 Não paro de pagar meu plano lá tão cedo.

Então tá decidido! Abri o painel fofo da Hostinger, usei o auto instalador e literalmente num minuto eu já tinha um site em WordPress rodando.

<h2 id="tutorial">Transformando o WordPress num headless CMS</h2>

A real é que como o WordPress já fornece a API logo na instalação, sem precisar configurar nada, já seria possível consumi-la de imediato, mas eu quis fazer algumas pequenas personalizações para adaptar melhor às minhas necessidades.

Primeiro, eu abri o “index.php” na raíz do site e desativei a opção `WP_USE_THEMES`, fazendo com que o WordPres nem se preocupe em carregar o front-end do site, já que nós só vamos usar a API:

```php
define('WP_USE_THEMES', false);
```

Aproveitei o arquivo aberto e no final dele eu já adicionei um redirecionamento para o front-end do meu site, caso alguém tente acessar o endereço do WordPress por qualquer que seja o motivo:

```php
header('location: https://lucasfernandes.com.br');
```

## Campos personalizados

Em um headless CMS propriamente dito, a gente pode criar nossos próprios tipos de conteúdo e quais campos eles levam. No WordPress, tudo é considerado post (posts, páginas, comentários) e existem vários plugins que nos ajudam a criar diferentes tipos de posts e extender os existentes. Como a gente está fazendo um blog, nós só vamos adicionar umas coisinhas a mais no post. E é nessa hora que eu reencontro um antigo amor: [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields) 💖

<p align="center">
  <img src="/img/its-all-posts.webp">
</p>

O ACF permite criar campos personalizados para os nossos posts. No meu caso, eu precisei criar um campo para subir um ícone (que eu deixo ao lado do título) e um outro que serve de lista de hashtags. Eu até poderia usar as categorias que o próprio WordPress fornece, mas não é do jeitinho que eu queria, e essa é a graça do rolê, é muito fácil fazer o que eu bem entender com WordPress + ACF! 😍

Aqui pro meu blog, a versão gratuita do ACF já me atende super bem, mas eu já usei a versão PRO em outros projetos para fazer listas, tabelas, galerias e outras coisas mais avançadas e eu serei sempre o primeiro a recomendar a compra desse plugin.

Depois eu precisei instalar também o [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/), que expõe esses campos personalizados na API já existente sem nenhuma configuração adicional.

## Outros plugins úteis

Um plugin que pra mim é essencial é o [Editor clássico](https://wordpress.org/plugins/classic-editor/). É só comparar as avaliações do plugin do Editor clássico com as do o editor atual Gutenberg (🤮) para você enteder o motivo.

Outro plugin que acabei precisando foi o [Enable SVG, WebP, and ICO Upload](https://wordpress.org/plugins/enable-svg-webp-ico-upload/), já que por padrão o WordPress não aceita subir SVGs como imagens e esse é o formato que eu uso para os ícones. Esse plugin resolve esse problema.

Esconder a versão do WordPress e outros detalhes inernos evita que pessoas mal intencionadas abusem de possíveis vulnerabilidades. O plugin [Hide My WP Ghost](https://wordpress.org/plugins/hide-my-wp) pode ajudar com isso e, de quebra, mudar a rota horrorosa que é o “/wp-admin” pra algo que você prefira como “/painel”.

Um plugin de captcha como o [WP Captcha](https://wordpress.org/plugins/wp-captcha) também pode ser útil se você quiser acrescentar uma camada de proteção ao painel.

Falando no painel, um plugin que eu gosto muito é o [Custom Login Page Customizer by Colorlib](https://wordpress.org/plugins/colorlib-login-customizer), que permite personalizar facilmente a aparência da página de login. Esse é totalmente cosmético.

## Agora é só integrar e ser feliz!

Com o painel configurados e a API pronta para uso, é só escrever seus posts e integrar com seu front-end de acordo com a [documentação super ajeitadinha do WordPress](https://developer.wordpress.org/rest-api/reference/posts). Acho que essa é uma boa oportunidade para eu aproveitar e demonstrar como fazer isso com React e Svelte.

A lógica será a mesma, buscar os posts na API e mostrar todos eles usando a [tag details](https://w3schools.com/tags/tag_details.asp). O WordPress nos retorna o conteúdo do post já formatado em HTML, então será necessário inseri-lo sem sanitizar, e como nesse caso sou eu mesmo que escrevo os posts, em teoria eu posso confiar em mim mesmo e nesse conteúdo.

Com React, nós vamos usar o `useState` para guardar nossos posts e o `useEffect` para puxar os dados da API. Depois nós usamos o `map` para fazer o loop nos posts. Para mostrar o HTML, eu precisei adicionar uma `<div>` e passar on conteúdo através da propriedade `dangerouslySetInnerHTML`:

<p class="file-title">App.jsx</p>

```jsx
import { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch('https://example.com/wp-json/wp/v2/posts')).json();
      setPosts(data);
    };

    fetchData();
  }, [setPosts]);

  return (
    <>
      <h1>Meu blog</h1>
      {posts.map((post) => (
        <details>
          <summary>{post.title.rendered}</summary>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </details>
      ))}
    </>
  );
};

export default Blog;
```

[Rodar código no CodeSandbox](https://codesandbox.io/s/wp-json-wecic)

Agora com Svelte, é questão de criar uma variável para os posts e puxar os dados quando o componente for criado, dentro do `onMount`. Depois nós usamos `{#each}` para fazer o loop e passamos o conteúdo com o prefixo `@html` (sem necessidade da `<div>`):

<p class="file-title">Blog.svelte</p>

```svelte
<script>
  import { onMount } from 'svelte';

  let posts = [];

  onMount(async () => {
    posts = await (await fetch('https://example.com/wp-json/wp/v2/posts')).json();
  });
</script>

<h1>Meu blog</h1>

{#each posts as post}
  <details>
    <summary>{post.title.rendered}</summary>
    {@html post.content.rendered}
  </details>
{/each}
```

[Rodar código no Svelte REPL](https://svelte.dev/repl/2c61148c988b4ceb80c0bc4e1efbcb8a)

<p align="center">
  <img src="/img/svelte-aclamado.webp">
</p>

Lembrando que se você quiser puxar um post específico, você pode passar o parâmetro `slug` nesse mesmo endpoint, por exemplo:

```js
await (await fetch(`https://example.com/wp-json/wp/v2/posts?slug=${slug}`)).json();
```

Por fim, se você quiser um exemplo mais prático, você pode dar uma olhada em [como eu faço isso nesse site](https://github.com/doceazedo/lucasfernandes.com.br/blob/main/src/routes/blog/index.svelte), usando SvelteKit e renderizando tudo no momento de build.
