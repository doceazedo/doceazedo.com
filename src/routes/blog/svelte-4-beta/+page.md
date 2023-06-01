---
title: 'O que esperar do Svelte 4'
description: 'Svelte 4 entrou em beta, o que será que vem aí?'
date: '2023-06-01 04:41'
tags: ['svelte']
icon: 'svelte'
---

A quarta versão do Svelte está em beta! A primeira *pre-release* do Svelte 4 já está entre nós e finalmente podemos dar uma espiada no que o futuro aguarda para a próxima versão do framework. 👀

Se você esteve presente no anúncio do Svelte 3 e já está tendo um surto de estresse pós-traumático, relaxa, as mudanças são mínimas e, até o momento, você não deve precisar migrar muita coisa. Ainda assim, vale lembrar que essa é apenas a primeira versão do beta e muita coisa ainda está por vir.

## Um pouco de contexto

Toda a base de código do Svelte está sendo reestruturada para o lançamento do Svelte 4, com a intenção de fornecer um alicerce para mudanças mais significativas no Svelte 5.

Isso significa que as novidades do Svelte 4 são focadas em prover uma base sólida, gerar códigos menores e mais rapidos e deixar algumas funcionalidades que atrasam o desenvolvimento para trás. Por isso, não espere grandes mudanças na API.

No futuro, o Svelte 5 terá uma fundação para implementar funcionalidades, algumas inclusive muito aguardadas.

## O que mudou até agora

<center>
  <img src="/img/gremio.webp" />
</center>

### Reidratação otimizada

No SvelteKit, as páginas são **hidratadas** por padrão. Isso significa que componentes renderizados no servidor, são "reanimados" no navegador, permitindo que eles fiquem interativos e mantenham seu estado.

No Svelte 4, nós podemos adicionar o atributo `data-svelte-h` a um componentes para que ele não sejam rehidratados e continuem estáticos, otimizando o tamanho do código e tempo de execução desse processo.

### Iterar Sets e Maps

Se você trabalha com `Set` e/ou `Map`, já deve ter notado que o `{#each}` não funciona com eles. Atualmente é necessário transformá-los em array usando, por exemplo, *spread operator*:

```svelte
<script>
	const emojis = new Set(['🔮', '✨', '🎩']);
</script>

{#each [...emojis] as emoji}
	{emoji}
{/each}
```

Isso muda com a chegada do Svelte 4, já que agora o `{#each}` consegue iterar ambos, `Set` e `Map`:

```diff
- {#each [...emojis] as emoji}
+ {#each emojis as emoji}
  	{emoji}
  {/each}

```

### Acessibilidade

Duas novas regras de ESLint relacionadas a acessibilidade foram adicionadas até agora. A primeira, desaconselha que elementos que não deveriam ser interativos como, por exemplo, `<p>` e `<img>`, lidem com eventos do mouse e teclado.

A segunda, enforça que elementos considerados estáticos como, por exemplo, `<div>`, `<span>` e `<a>`, não lidem com interações, à menos que um atributo `role` seja informado, veja:

```svelte
<div
  on:click={handleClick}
  on:keypress={handleKeyPress}
  role="button"
>
  Salvar
</div>
```

No geral, o ideal é que você use os elementos com suas devidas camadas de acessibilidade sem precisar usar o atributo `role` num outro elemento.

## O que tem pra consertar

A maioria das mudanças que vão quebrar seu código são relacionadas a tipagem mais estrita, o que significa que se você não usa TypeScript provavelmente não vai sentir muita diferença.

No máximo, você agora vai ver erros e avisos em partes do código que você não via antes, afim de evitar um problema maior em tempo de execução.

### Transições locais

Atualmente, se um componente em uma página do SvelteKit tem uma transição ao ser desmontado, a página só vai mudar depois que a transição terminar. Você pode corrigir isso definindo a transição como `local`:

```svelte
<div transition:fade|local={{ duration: 200 }}>
  🤠
</div>
```

Porém, no Svelte 4, todas as transições são locais por padrão. Se você fez isso manulmente, poderá remover o `|local`. Se você quer que suas transições voltem a ser globais, poderá adicionar `|global` no lugar.

### Peripécias do onMount

É comum que o `onMount()` de alguns componentes recebam uma única função, por exemplo, para buscar alguns dados numa API:

```svelte
<script>
  import { onMount } from "svelte";

  const fetchData = async () => {
    // ...
  }

  onMount(() => fetchData());
</script>
```

O problema é que se a função que o `onMount()` recebe (nesse caso, uma *arrow function*) retornar outra função (`fetchData()`), essa função será chamada quando o componente for desmontado — [saiba mais](https://svelte.dev/docs#run-time-svelte-onmount).

Porém, isso só funciona se essa função **não** for assíncrona, por isso, o Svelte 4 não permite mais que isso aconteça. Nesse caso, teriamos que mudar nosso código para não retornar a função:

```diff
- onMount(() => fetchData());
+ onMount(() => { fetchData() });
```

### Argumentos de on:event e use:action

Se você já criou seus próprios eventos com `createEventDispatcher` ou suas próprias diretivas (ou ações), você deve ter reparado que você pode definir argumentos para eles.

Atualmente, você pode definir que um evento ou ação precisa de um argumento e não passar nenhum (e vice-versa). No Svelte 4, isso não é mais possível. Se você depende desse comportamento, vai precisar alterar a tipagem dos argumentos.

### Tipo de componentes com props específicos

Atualmente, usando TypeScript, você pode exportar um *prop* que recebe um componente Svelte da seguinte maneira:

```ts
import { SvelteComponent } from "svelte";

export let icon: typeof SvelteComponent;
```

Se você precisar de um componente com props, eventos ou slots específicos, você pode então fazer o seguinte:

```ts
import { SvelteComponentTyped } from "svelte";

export let icon: typeof SvelteComponentTyped<{size: number}>;
```

No Svelte 4, apenas `SvelteComponent` dá conta do recado para ambos os casos, enquanto `SvelteComponentTyped` será descontinuado.

## O que está por vir

Ainda no Svelte 4, podemos esperar que já não seja mais possível criar atributos que pareçam diretivas. O próprio SvelteKit implementava `sveltekit:prefetch` antigamente, o que não seria mais possível. Você ainda pode criar *data attributes* e `use:actions` normalmente.

Essa limitação serve para garantir que nenhuma nova diretiva que o Svelte adicione interfira com o código de outras pessoas. Assim podendo adicionar novas funcionalidades mais rapidamente, sem precisar esperar por outro grande lançamento como esse.

Sabemos também que, no futuro, o Svelte 5 trará grandes mudanças nos seus mecanismos internos e no compilador. Essas mudanças devem afetar inclusive toda a [API de transições e animações](https://github.com/sveltejs/svelte/pull/7932#issuecomment-1450165389).

Lendo issues, pull requests e discussões no repositório do Svelte, podemos esperar que algumas outras funcionalidades sejam implementadas entre as versões 4 e 5.

> 🚨 **Atenção:** Daqui pra frente estamos falando de palpites disciplinados, que no fim não passam de **especulações**!

### Condicional #display

É possível que vejamos um novo bloco de renderização condicional chamado `{#display}` ou `{#show}`. A intenção é ser parecido com o `{#if}`, porém alternando a propriedade `display` do CSS para renderizar o conteúdo ao invés de construir e destruir os elementos:

```svelte
{#show isOpen}
  <p>Eu sempre existirei na DOM, mesmo que não me veja! 😎</p>
{/show}
```

O [pull request](https://github.com/sveltejs/svelte/pull/7932) dessa funcionalidade já está aberto, e deve chegar somente no Svelte 5 com a nova API de transições. Considerando ainda que o Vue já possui algo parecido, o [v-show](https://br.vuejs.org/v2/guide/conditional.html#v-show), logo o Svelte também deve adotar essa funcionalidade.


### Slots condicionais

Atualmente, slots devem ser posicionados diretamente abaixo de um componente. Entre outros problemas, isso faz com que slots condicionais fiquem desajeitados e causem efeitos colaterais indesejados:

```svelte
{#if 1 + 1 == 2}
  <Example>
    <svelte:fragment slot="foo">
      Sou um slot condicional 😢
    </svelte:fragment>
  </Example>
{:else}
  <Example />
{/if}
```

Já é certo que [veremos isso corrigido](https://github.com/sveltejs/svelte/pull/8304#issuecomment-1522935096) em breve, porém só no Svelte 5. Logo mais poderemos escrever slots condicionais de forma intuitiva como pretendido inicialmente:

```svelte
<Example>
  {#if 1 + 1 == 2}
    <svelte:fragment slot="foo">
      Sou um slot condicional 🤠
    </svelte:fragment>
  {/if}
</Example>
```

### Condicionais #switch e #case

Finalmente devemos ver os blocos `{#switch}` e `{#case}` no Svelte, ainda mais considerando que o [pull request](https://github.com/sveltejs/svelte/pull/7655) já está sendo esboçado e foi recentemente marcado para chegar nas próximas versões. A sintaxe deve se parecer com isso:

```svelte
{#switch foo}
	<ExampleDefault />
{:case "bar"}
	<ExampleBar />
{:case "baz"}
	<ExampleBaz />
{/switch}
```

Vale lembrar que já é possível chegar nesse mesmo resultado desse exemplo usando `{#if}` ou, ainda melhor, com `<svelte:component>`:

```svelte
<script>
  let foo = 'bar';

  const options = {
    bar: ExampleBar,
    baz: ExampleBaz,
    default: ExampleDefault,
  }
</script>

<svelte:component this={options[foo]} />
```

### Classes no svelte:body

Atualmente o elemento `<svelte:body>` não recebe a diretiva `class`. Para isso acontecer hoje, existem algumas dificuldades se tratando de SSR, mas isso pode mudar com as mudanças estruturais do Svelte 4.

No melhor dos casos, [em breve](https://github.com/sveltejs/svelte/pull/6928) nós poderemos mudar as classes do `<svelte:body>` como qualquer outro elemento, com a diferença que essas classes provavelmente deverão ser globais:

```svelte
<script>
  let darkmode = false;
</script>

<button on:click={() => darkmode = !darkmode}>
  Ativar/desativar modo escuro
</button>

<svelte:body class:darkmode />

<style>
  :global(.darkmode) {
    background-color #000;
  }
</style>
```

## Conclusão

Por fim, fica claro que o Svelte 4 é um esforço para construir um grande alicerce para a maioria das funcionalidades e ganhos que só chegarão no futuro com o Svelte 5. No mais, resta aguardar as atualizações do beta e acompanhar as novidades.

Já é possível instalar a [pre-release](https://github.com/sveltejs/svelte/releases) do Svelte 4 no seu projeto para testar as mudanças e se preparar para o que está por vir. Recomendo também que leia a [changelog](https://github.com/sveltejs/svelte/blob/version-4/packages/svelte/CHANGELOG.md) para conferir a lista completa de alterações.

E se esse é o seu primeiro contato com Svelte, recomendo [meu tutorial](/blog/primeiros-passos-svelte) para você aprender o que é possível construir hoje com essa ferramenta.