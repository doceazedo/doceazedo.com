<script lang="ts">
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime.js';
  import 'dayjs/locale/pt-br.js';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { LANG } from '$lib/stores';
  import { Metadata } from '$lib/components';

  export let title: string,
    description: string,
    date: string,
    tags: string[] = [],
    icon: string;

  const slug = $page.url.pathname.split('/')[2];
  const thumbnail = `/img/thumbnails/${slug}.jpg`;
  const iconSrc = `/img/icons/${icon}.svg`;

  let readableDate = '';
  let fullDate = '';
  let showComments = false;

  if (browser) {
    dayjs.extend(relativeTime);
    readableDate = dayjs(date)
      .locale($LANG.code == 'pt' ? 'pt-br' : 'en-us')
      .fromNow();
    fullDate = dayjs(date).format('DD/MM/YYYY à[s] HH:mm');
  }

  onMount(() => (showComments = true));

  $: {
    if (browser)
      readableDate = dayjs(date)
        .locale($LANG.code == 'pt' ? 'pt-br' : 'en-us')
        .fromNow();
  }
</script>

<Metadata {title} {description} {thumbnail} />

<header>
  <div>
    <h1>{title}</h1>
    <p title={fullDate}>{$LANG.posted} {readableDate}</p>
    <ul>
      {#each tags as tag}
        <li>
          <a href="/blog?tags={encodeURIComponent(tag)}">
            <span>#</span>{tag}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <img src={iconSrc} alt="" />
  </div>
</header>

<hr />

{#if $LANG.code == 'en'}
  <div class="alert" transition:slide={{ duration: 200, easing: quintOut }}>
    This blog articles are only available in Portuguese for now. English translations for every post
    are yet to come.
  </div>
{/if}

<article class="content">
  <slot />
</article>

<div class="giscus" />
{#if showComments}
  <script
    src="https://giscus.app/client.js"
    data-repo="doceazedo/doceazedo.com"
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
  @import '../../../assets/sass/vars.sass'

  header,
  .content
    max-width: 900px
    margin: 0 auto

  .content
    margin-bottom: 4rem

  header
    display: flex
    justify-content: space-between
    padding: 4rem 0

    >div:last-child
      flex-shrink: 0
      margin-left: 1rem

    h1
      font-size: 2rem
      font-weight: 700
      margin-bottom: .5rem

    p
      font-size: 1.25rem
      font-weight: 400
      color: $whiteish

    ul
      display: flex
      margin-top: 1rem

      li
        border-radius: .25rem
        background-color: $primary
        box-shadow: 0 0 .5rem .25rem rgba($primary, .25)

        &:not(:last-child)
          margin-right: .5rem

        a
          display: flex
          padding: .375rem .5rem

        span
          opacity: .75

    img
      height: 6rem

  hr
    border: none
    border-bottom: $hr
    margin-bottom: 4rem

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
      padding: 2.5rem 0

      div:first-child h1
        font-size: 1.5rem

      div:last-child
        margin: 0
        margin-bottom: 1rem

        img
          height: 4rem

    hr,
    .content
      margin-bottom: 2.5rem

    .alert
      text-align: left
</style>
