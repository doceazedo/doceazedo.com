<script lang="ts">
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime.js';
  import 'dayjs/locale/pt-br.js';
  import { browser } from '$app/environment';
  import { LANG } from '$lib/stores';
  import type { VOD } from '$lib/modules/twitch-player';

  export let videoUrl: string,
    chatboxUrl: string,
    vods: VOD[] = [];

  const getDate = (date: Date, code: string) => {
    if (!browser) return;
    dayjs.extend(relativeTime);
    const readableDate = dayjs(date)
      .locale(code == 'pt' ? 'pt-br' : 'en-us')
      .fromNow();
    const dayMonth = dayjs(date).format(code == 'pt' ? 'DD/MM' : 'MM/DD');
    return `${readableDate}, ${dayMonth}`;
  };
</script>

<div class="twitch-player">
  <main class="twitch-player-main">
    <div class="twitch-player-embed">
      <iframe src={videoUrl} title="" allowfullscreen />
    </div>

    <div class="twitch-player-vods">
      {#each vods as vod}
        <a
          href={vod.url}
          target="_blank"
          class="vod"
          style="background-image:url({vod.thumbnail_url})"
        >
          <span class="date">{getDate(vod.created_at, $LANG.code)}</span>
        </a>
      {/each}
    </div>
  </main>
  <aside class="twitch-player-chat">
    <iframe src={chatboxUrl} title="" />
  </aside>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .twitch-player
    position: relative

    &::before
      content: ''
      position: absolute
      height: 100%
      width: 100%
      background-color: rgba(var(--primary-rgb), .1)
      border-radius: 50%
      filter: blur(2rem)
      pointer-events: none
      transform: scaleY(1.1)
      z-index: -1
    
    &,
    &-vods
      display: flex
      gap: 1rem

    &-embed,
    &-chat
      border-radius: 1rem
      overflow: hidden

      iframe
        width: 100%
        height: 100%

    &-embed
      height: 22rem
      aspect-ratio: 16 / 9

    &-chat
      flex-grow: 1
      z-index: 200

    &-main
      display: flex
      flex-direction: column
      gap: 1rem

    .vod
      display: flex
      justify-content: flex-end
      align-items: flex-end
      flex-grow: 1
      padding: .5rem
      aspect-ratio: 16 / 9
      background-color: rgba(#fff, .1)
      border-radius: 1rem
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      transition: all .2s ease

      &:hover
        transform: translateY(-.25rem)
      
      .date
        font-size: .8rem
        background-color: rgba(#000, .5)
        padding: .25rem .5rem
        border-radius: .5rem

  @media screen and (max-width: 768px)
    .twitch-player
      flex-direction: column

      &-embed
        height: auto

      &-vods .vod:last-child,
      &-chat
        display: none
</style>
