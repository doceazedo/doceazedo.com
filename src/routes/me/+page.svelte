<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata, PageTitle } from '$lib/components';
  import meAtParis from '../../assets/img/me-paris.webp';
  import thatsAllFolks from '../../assets/img/thats-all-folks.gif';

  const songIDs = ['7AZzCQ6S8HXLFBXsqH2HWE', '4SBTecHxEs2ayXLiqs7Kmz', '78Jpy7RTri3JulwgQ9sNEP'];
</script>

<Metadata title={$LANG.navbar.me} />
<PageTitle title={$LANG.navbar.me} />

<div class="content">
  <h2>TL;DR</h2>
  <ul>
    <li><span>{$LANG.about.tldr.online.key}:</span> {$LANG.about.tldr.online.value}</li>
    <li><span>{$LANG.about.tldr.legally.key}:</span> {$LANG.about.tldr.legally.value}</li>
    <li><span>{$LANG.about.tldr.physically.key}:</span> {$LANG.about.tldr.physically.value}</li>
    <li>
      <span>{$LANG.about.tldr.professionally.key}:</span>
      {@html $LANG.about.tldr.professionally.value.replace(
        '%s',
        '<a href="https://datawrapper.de" target="_blank" rel="noreferrer">Datawrapper</a>'
      )}
    </li>
    <li><span>{$LANG.about.tldr.casually.key}:</span> {$LANG.about.tldr.casually.value}</li>
    <li><span>{$LANG.about.tldr.pronouns.key}:</span> {$LANG.about.tldr.pronouns.value}</li>
  </ul>
  <p>
    {@html $LANG.about.contact
      .replace('%email%', '<a href="mailto:me@doceazedo.com">me@doceazedo.com</a>')
      .replace('%twitter%', '<a href="https://twitter.com/doceazedo911">Twitter</a>')
      .replace('%discord%', '<a href="https://discord.gg/vEGRe2kq8B">Discord</a>')}
  </p>

  <h2>{$LANG.about.me.title}</h2>
  <img src={meAtParis} alt="Foto de mim com a Torre Eiffel ao fundo" />
  <p>
    {$LANG.about.me.intro}
  </p>
  <p>
    {@html $LANG.about.me.interests
      .replace('%twitch%', '<a href="https://twitch.tv/doceazedo911">Twitch</a>')
      .replace('%svelte%', '<a href="https://svelte.dev">Svelte</a>')}
  </p>
  <p>
    {@html $LANG.about.me.music.replace(
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

  <h2>{$LANG.about.trivia.title}</h2>
  <ul>
    {#each $LANG.about.trivia.items as item}
      <li>{@html item}</li>
    {/each}
  </ul>

  <div class="wrap-up">
    <img src={thatsAllFolks} alt="" />
    <p>{$LANG.about.wrapup}</p>
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
