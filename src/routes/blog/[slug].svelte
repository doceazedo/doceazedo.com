<script lang="ts" context="module">
  export async function load({ params, fetch }) {
    const posts = await(await fetch(`https://wp.lucasfernandes.com.br/wp-json/wp/v2/posts?slug=${params.slug}`)).json();

    if (posts.length) {
      const featuredMedias = posts[0]['_links']['wp:featuredmedia'];
      let thumbnail = 'https://lucasfernandes.com.br/thumbnail.jpg';
      if (featuredMedias) {
        const media = await(await fetch(featuredMedias[0].href)).json();
        thumbnail = media.guid.rendered;
      }

      return {
        props: {
          post: posts[0],
          thumbnail
        }
      };
    }

    return {
      status: 404,
      error: new Error(`Couldn't find the requested post`)
    };
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/pt-br';
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { lang } from '../../stores';
  import SEO from '../../components/seo.svelte';
  import hljs from 'highlight.js';
  import hljs_svelte from 'highlightjs-svelte';
  import 'highlight.js/styles/base16/tomorrow-night.css';

  export let post = null, thumbnail = '';

  let readableDate = '';
  let fullDate = '';
  if (browser) {
    dayjs.extend(relativeTime);
    readableDate = dayjs(post.date).locale($lang.code == 'pt' ? 'pt-br' : 'en-us').fromNow();
    fullDate = dayjs(post.date).format('DD/MM/YYYY à[s] HH:mm');
    console.log(fullDate); 
    console.log(post); 
  }

  let hasMounted = false;

  onMount(() => {
    document.querySelectorAll('p + pre').forEach(el => {
      const lastEl = el.previousElementSibling as HTMLElement;
      
      if (lastEl.innerHTML.length) {
        if (lastEl.innerHTML.includes('&nbsp;'))
          return lastEl.innerHTML = '';

        lastEl.classList.add('file-title');
        const lang = lastEl.innerText.split('.');
        if (lastEl.innerText.trim().charAt(0) != '.') el.querySelector('code').classList.add(`language-${lang[lang.length - 1]}`);
      }
    });

    hljs_svelte(hljs);
    document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el as HTMLElement));
    hasMounted = true;
  });

  $: {
    if (browser) readableDate = dayjs(post.date).locale($lang.code == 'pt' ? 'pt-br' : 'en-us').fromNow();
  }
</script>

<svelte:head>
  <SEO path="/blog/{post.slug}" title="{post.title.rendered} - Lucas Fernandes" {thumbnail} />
</svelte:head>

<header>
  <div>
    <h1>{post.title.rendered}</h1>
    <h2 title={fullDate}>{$lang.posted} {readableDate}</h2>
    <ul>
      {#each post?.acf?.categories?.split(',') || Array() as category}
        <li><span>#</span>{category}</li>
      {/each}
    </ul>
  </div>
  <div>
    <img src="{post?.acf?.icon}" alt="">
  </div>
</header>

{#if $lang.code == 'en'}
  <div class="alert" transition:slide={{duration: 200, easing: quintOut }}>
    This blog articles are only available in Portuguese for now. English translations for every post are yet to come.
  </div>
{/if}

<article class="content">
  {@html post.content.rendered}
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

<style lang="sass">
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

        span
          opacity: .75

    img
      height: 6rem

  .alert
    text-align: center
    font-style: italic
    margin-bottom: 4rem
    color: $whiteish

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

    .alert
      text-align: left
</style>