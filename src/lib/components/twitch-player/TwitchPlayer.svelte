<script lang="ts">
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime.js';
  import 'dayjs/locale/pt-br.js';
  import { browser } from '$app/environment';
  import _ from '$lib/lang';
  import { LIVE_DATA } from '$lib/stores/live-data';

  type VOD = {
    id: string;
    stream_id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    title: string;
    description: string;
    created_at: Date;
    published_at: Date;
    url: string;
    thumbnail_url: string;
    viewable: string;
    view_count: number;
    language: string;
    type: string;
    duration: string;
    muted_segments: null;
  };

  let allVods: VOD[] = [];
  let vods: VOD[] = [];
  let videoUrl: string | null = null;

  const channel = 'doceazedo911';
  const parents = '?parent=localhost&parent=doceazedo.com&parent=pbe.doceazedo.com';
  const baseUrl = `https://player.twitch.tv/${parents}`;
  const chatboxUrl = `https://twitch.tv/embed/${channel}/chat${parents}&darkpopout`;

  onMount(async () => {
    try {
      const resp = await fetch('/api/vods');
      allVods = await resp.json();
      updateVideos();
    } catch (error) {
      console.error('Could not fetch VODs');
    }
  });

  const updateVideos = () => {
    vods = $LIVE_DATA?.isLive ? allVods.slice(0, 3) : allVods.slice(1);
    if ($LIVE_DATA?.isLive) {
      videoUrl = `${baseUrl}&channel=${channel}`;
    } else if (allVods?.[0]) {
      videoUrl = `${baseUrl}&video=${allVods?.[0]?.id}`;
    }
  };

  LIVE_DATA.subscribe(updateVideos);

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
      {#if videoUrl}
        <iframe src={videoUrl} title="" allowfullscreen />
      {/if}
    </div>

    <div class="twitch-player-vods">
      {#each vods.length ? vods : Array(3).fill(null) as vod}
        <a
          href={vod?.url || '#'}
          target="_blank"
          class="vod"
          style="background-image:url({vod?.thumbnail_url})"
        >
          {#if vod?.created_at}
            <span class="date">{getDate(vod.created_at, $_.code)}</span>
          {/if}
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
    &-chat,
    .vod
      background-color: rgba(#fff, .1)
      animation: skeleton 2s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate

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

  @keyframes skeleton
    from
      background-color: rgba(#fff, .1)

    to
      background-color: rgba(#fff, .2)
</style>
