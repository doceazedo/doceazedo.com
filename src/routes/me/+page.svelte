<script lang="ts">
  import _ from '$lib/lang';
  import { Metadata, PageTitle } from '$lib/components';
  import meAtParis from '../../assets/img/me-paris.webp';
  import thatsAllFolks from '../../assets/img/thats-all-folks.gif';

  const songIDs = ['7AZzCQ6S8HXLFBXsqH2HWE', '4SBTecHxEs2ayXLiqs7Kmz', '78Jpy7RTri3JulwgQ9sNEP'];
</script>

<Metadata title={$_.navbar.me} />
<PageTitle title={$_.navbar.me} />

<div class="content">
  <h2>TL;DR</h2>
  <ul>
    <li><span>{$_.about.tldr.online.key}:</span> {$_.about.tldr.online.value}</li>
    <li><span>{$_.about.tldr.physically.key}:</span> {$_.about.tldr.physically.value}</li>
    <li>
      <span>{$_.about.tldr.professionally.key}:</span>
      {@html $_.about.tldr.professionally.value.replace(
        '%s',
        '<a href="https://voolt.com" target="_blank" rel="noreferrer">Voolt</a>'
      )}
    </li>
    <li><span>{$_.about.tldr.casually.key}:</span> {$_.about.tldr.casually.value}</li>
    <li><span>{$_.about.tldr.pronouns.key}:</span> {$_.about.tldr.pronouns.value}</li>
  </ul>
  <p>
    {@html $_.about.contact
      .replace('%email%', '<a href="mailto:me@doceazedo.com">me@doceazedo.com</a>')
      .replace('%twitter%', '<a href="https://twitter.com/doceazedo911">Twitter</a>')
      .replace('%discord%', '<a href="https://discord.gg/vEGRe2kq8B">Discord</a>')}
  </p>

  <h2>{$_.about.me.title}</h2>

  <figure>
    <img src={meAtParis} alt={$_.about.me.photoCaption} />
    <figcaption>{$_.about.me.photoCaption} <span>👨‍🎨🥖🥐🇫🇷✨</span></figcaption>
  </figure>

  <p>
    {$_.about.me.intro}
  </p>
  <p>
    {@html $_.about.me.interests
      .replace('%twitch%', '<a href="https://twitch.tv/doceazedo911">Twitch</a>')
      .replace('%svelte%', '<a href="https://svelte.dev">Svelte</a>')}
  </p>
  <p>
    {@html $_.about.me.music.replace(
      '%s',
      '<a href="https://last.fm/user/doceazedo911">Last.fm</a>'
    )}
  </p>

  <p class="showcase is-spotify">
    {#each songIDs as songID}
      <iframe
        title="Song preview"
        src="https://open.spotify.com/embed/track/{songID}"
        height={80}
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    {/each}
  </p>

  <h2>{$_.about.trivia.title}</h2>
  <ul>
    {#each $_.about.trivia.items as item}
      <li>{@html item}</li>
    {/each}
  </ul>

  <div class="wrap-up">
    <img src={thatsAllFolks} alt="" />
    <p>{$_.about.wrapup}</p>
  </div>
</div>

<style lang="sass">
  ul
    :global(span)
      color: #fff
      transition: all .4s ease

  .wrap-up
    display: flex
    flex-direction: column
    align-items: center

  :global([data-theme="light"])
    ul :global(span)
      color: #000
      font-weight: 600

  @media screen and (max-width: 768px)
    .wrap-up
      align-items: flex-start
</style>
