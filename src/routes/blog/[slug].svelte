<script context="module">
  export async function load({ page, fetch }) {
    const post = await(await fetch(`/api/posts/${page.params.slug}`)).json();

    if (post) {
      return {
        props: {
          post: post
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Couldn't find the requested post`)
    };
  }
</script>

<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { lang } from '../../stores';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/base16/tomorrow-night.css';
  import Button from '../../components/button.svelte';

  export let post = {};

  let readableDate = '';
  if (browser) {
    dayjs.extend(dayjs_plugin_relativeTime);
    readableDate = dayjs(post.createdAt).locale($lang.code == 'pt' ? 'pt-br' : 'en-us').fromNow();
  }

  let hasMounted = false;

  onMount(() => {
    document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
    document.querySelectorAll('p + pre').forEach(el => {
      if (el.previousElementSibling.innerHTML.length) el.previousElementSibling.classList.add('file-title')
    });
    hasMounted = true;
  });

  $: {
    if (browser) readableDate = dayjs(post.createdAt).locale($lang.code == 'pt' ? 'pt-br' : 'en-us').fromNow();
  }
</script>

<svelte:head>
  <title>{post.title} - Lucas Fernandes</title>
</svelte:head>

<header>
  <div>
    <h1>{post.title}</h1>
    <h2>{$lang.posted} {readableDate}</h2>
    <ul>
      {#each post.categories as category}
        <li>{category}</li>
      {/each}
    </ul>
  </div>
  <div>
    <img src="/blog-icons/{post.icon}.svg" alt="">
  </div>
</header>

{#if $lang.code == 'en' && post.devto}
  <div class="alert" transition:slide={{duration: 200, easing: quintOut }}>
    <Button href={post.devto} target="_blank">
      <b>Click here</b> to read this article in English on dev.to
    </Button>
  </div>
{/if}

<article class="content">
  {@html post.content}
</article>

<div class="giscus"></div>
{#if hasMounted}
  <script src="https://giscus.app/client.js"
          data-repo="doceazedo/lucasfernandes.com.br"
          data-repo-id="MDEwOlJlcG9zaXRvcnk0MDU3NzE4NDk="
          data-category="Comments"
          data-category-id="DIC_kwDOGC-WSc4B_Ku7"
          data-mapping="pathname"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-theme="dark"
          crossorigin="anonymous"
          async>
  </script>
{/if}

<style type="text/sass">
  @import '../../assets/sass/vars.sass'

  header
    display: flex
    justify-content: space-between
    padding: 4rem 0
    margin-bottom: 4rem
    border-bottom: $hr

    >div:last-child
      flex-shrink: 0
      margin-left: 1rem

    h1
      font-size: 2rem
      font-weight: 700

    h2
      font-size: 1.25rem
      color: $whiteish

    ul
      display: flex
      margin-top: 1rem

      li
        padding: .5rem .75rem
        background-color: $primary
        box-shadow: 0 0 .5rem .25rem rgba($primary, .25)

        &:not(:last-child)
          margin-right: .5rem

    img
      height: 6rem

  .alert
    display: flex
    justify-content: center
    margin-bottom: 4rem

    :global(.button)
      display: block !important

  @media screen and (max-width: 768px)
    header
      flex-direction: column-reverse

      div:first-child h1
        font-size: 1.5rem

      div:last-child
        margin: 0
        margin-bottom: 1rem

        img
          height: 4rem
</style>