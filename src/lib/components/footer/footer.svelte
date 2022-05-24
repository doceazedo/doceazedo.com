<script lang="ts">
  import { LANG } from '$lib/stores';
  import { ElevatorIcon } from '$lib/components';
  import type { LiveStatsApiResponse } from '$lib/modules';

  const lastfmUrl = 'https://last.fm/user/doceazedo911';

  export let liveStats: LiveStatsApiResponse = null,
    callElevator: () => void;
</script>

<footer class:has-now-playing={liveStats?.nowPlaying}>
  <p class="copyleft">
    <span>{$LANG.footer[0]}</span>
    <span>
      {$LANG.footer[1]}
      <a
        href="https://gnu.org/licenses/copyleft.html"
        target="_blank"
        aria-label={$LANG.alt.copyleft}
      >
        <span class="flip">&copy;</span>
        {new Date().getFullYear()}
      </a>
    </span>
  </p>

  {#if liveStats?.nowPlaying}
    <a
      class="now-playing is-live"
      href={lastfmUrl}
      target="_blank"
      aria-label={`${$LANG.alt.listeningTo} ${liveStats.nowPlaying.artist} - ${liveStats.nowPlaying.title}. ${$LANG.alt.lastfm}`}
    >
      <div class="song-cover">
        <img src={liveStats.nowPlaying.cover} alt="" />
      </div>
      <div class="song-info">
        <img src={liveStats.nowPlaying.cover} alt="" />
        <div class="song-info-meta">
          <h1>{liveStats.nowPlaying.title}</h1>
          <h2>{liveStats.nowPlaying.artist}</h2>
        </div>
      </div>
    </a>
  {/if}
</footer>

<div class="elevator" on:click={callElevator}>
  <ElevatorIcon />
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'
  @import '../../../assets/sass/mixins.sass'

  footer
    display: flex
    justify-content: space-between
    align-items: center
    max-width: 900px
    margin: 4rem auto 0
    padding: 3rem 0
    border-top: $hr

    .copyleft
      display: flex
      flex-direction: column

      .flip
        display: inline-block
        transform: scaleX(-1)

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

  .elevator
    position: absolute
    right: 1rem
    bottom: 1rem
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: all .2s ease

    :global(svg)
      height: 3rem

    &:not(:hover)
      opacity: .5

  @media screen and (max-width: 768px)
    footer
      position: relative
      flex-direction: column

      &.has-now-playing
        padding-bottom: 9rem

      p
        margin-bottom: 2rem
        text-align: center

      .now-playing
        position: absolute !important
        bottom: 4rem
        width: 18rem
        margin-right: 0 !important

        h1,
        h2
          max-width: 12rem !important

      &:not(.has-now-playing) :global(.social)
        height: 3rem !important
        width: 3rem !important

        :global(svg)
          height: 1.25rem
          width: 1.25rem
</style>
