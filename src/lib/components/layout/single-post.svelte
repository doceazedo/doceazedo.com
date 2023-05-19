<script>
  // @ts-nocheck
  // 🚨 mdsvex does not understand typescript nor sass

  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime.js';
  import 'dayjs/locale/pt-br.js';
  import Giscus from '@giscus/svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { LANG, THEME } from '$lib/stores';
  import { Metadata, Newsletter } from '$lib/components';

  export let title;
  export let description;
  export let date;
  export let tags;
  export let icon;

  const slug = $page.url.pathname.split('/')[2];
  const thumbnail = `/img/thumbnails/${slug}.jpg`;
  const iconSrc = `/img/icons/${icon}.svg`;

  let readableDate = '';
  let fullDate = '';

  if (browser) {
    dayjs.extend(relativeTime);
    readableDate = dayjs(date)
      .locale($LANG.code == 'pt' ? 'pt-br' : 'en-us')
      .fromNow();
    fullDate = dayjs(date).format('DD/MM/YYYY à[s] HH:mm');
  }

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

<article class="content">
  <slot />
</article>

<Newsletter />

<Giscus
  id="comments"
  repo="doceazedo/doceazedo.com"
  repoId="MDEwOlJlcG9zaXRvcnk0MDU3NzE4NDk="
  category="Comments"
  categoryId="DIC_kwDOGC-WSc4B_Ku7"
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  theme={$THEME}
  lang={$LANG.code}
  loading="lazy"
/>

<style>
  header,
  .content {
    max-width: var(--readingMaxWidth);
    margin: 0 auto;
    transition: all 0.2s ease;
  }

  .content,
  :global(.newsletter) {
    margin-bottom: 4rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    padding: 4rem 0;
  }
  header > div:last-child {
    flex-shrink: 0;
    margin-left: 1rem;
  }
  header h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  header p {
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--whiteish);
    transition: color 0.4s ease;
  }
  header ul {
    display: flex;
    margin-top: 1rem;
  }
  header ul li {
    border-radius: 0.25rem;
    background-color: var(--primary);
    box-shadow: 0 0 0.5rem 0.25rem rgba(var(--primary-rgb), 0.25);
    color: #fff;
  }
  header ul li:not(:last-child) {
    margin-right: 0.5rem;
  }
  header ul li a {
    display: flex;
    padding: 0.375rem 0.5rem;
  }
  header ul li span {
    opacity: 0.75;
  }
  header img {
    height: 6rem;
  }

  hr {
    border: none;
    border-bottom: var(--hr);
    margin-bottom: 4rem;
  }

  :global([data-theme='light']) header p {
    color: var(--blackish);
  }

  :global([data-theme='light']) hr {
    border-bottom: var(--hr-light);
  }

  @media screen and (max-width: 768px) {
    header {
      flex-direction: column-reverse;
      padding: 2.5rem 0;
    }
    header div:first-child h1 {
      font-size: 1.5rem;
    }
    header div:last-child {
      margin: 0;
      margin-bottom: 1rem;
    }
    header div:last-child img {
      height: 4rem;
    }
    hr,
    .content {
      margin-bottom: 2.5rem;
    }
  }

  :global([data-dyslexia-mode='true']) header h1 {
    line-height: 1.75;
  }

  :global([data-dyslexia-mode='true']) header ul li a {
    padding: 0.1rem 0.5rem 0.375rem;
  }
</style>
