<script lang="ts">
  import _ from '$lib/lang';
  import { LIVE_DATA } from '$lib/modules/live';

  const lastfmUrl = 'https://last.fm/user/doceazedo911';
</script>

{#if $LIVE_DATA?.nowPlaying}
  <a
    class="now-playing is-live"
    href={lastfmUrl}
    target="_blank"
    rel="noreferrer"
    aria-label={`${$_.alt.listeningTo} ${$LIVE_DATA.nowPlaying.artist} - ${$LIVE_DATA.nowPlaying.title}. ${$_.alt.lastfm}`}
  >
    <div class="song-cover">
      <img src={$LIVE_DATA.nowPlaying.cover} alt="" />
    </div>
    <div class="song-info">
      <img src={$LIVE_DATA.nowPlaying.cover} alt="" />
      <div class="song-info-meta">
        <h1>{$LIVE_DATA.nowPlaying.title}</h1>
        <h2>{$LIVE_DATA.nowPlaying.artist}</h2>
      </div>
    </div>
  </a>
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars.sass'
  @import '../../../assets/sass/mixins.sass'

  .now-playing
    position: relative
    display: flex
    height: 5rem
    background-color: rgba(255, 255, 255, .05)
    color: $whiteish
    border-radius: 1rem
    text-decoration: none
    transition: all .2s ease

    &::before
      @include live-badge

    &:hover
      transform: translateY(-.25rem)

    .song-cover
      position: absolute
      display: flex
      align-items: center
      width: 100%
      height: 5rem
      border-radius: 1rem
      opacity: .1
      overflow: hidden

      img
        width: 100%
        filter: blur(.25rem)

    .song-info
      display: flex
      padding: .5rem
      z-index: 1

      img
        height: 4rem
        width: 4rem
        border-radius: 1rem
        pointer-events: none
        transition: all .2s ease
      
      &-meta
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 .75rem

        h1,
        h2
          max-width: 16rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis

        h1
          font-size: 1.25rem
          font-weight: 700

        h2
          font-weight: 300

  :global([data-theme="light"])
    .now-playing
      color: $blackish
      
      &::before
        border-color: #fff

  @media screen and (max-width: 768px)
    .now-playing
      max-width: 18rem

      h1,
      h2
        max-width: 12rem !important
</style>
