<script lang="ts">
  import { LANG } from '$lib/stores';
  import {
    ElevatorIcon,
    FooterSocialButton,
    GitHubIcon,
    LastfmIcon,
    LinkedInIcon,
    MailIcon,
    TwitchIcon
  } from '$lib/components';
  import type { LiveStatsApiResponse } from '$lib/modules';

  type Socials = {
    github: string;
    lastfm: string;
    linkedin: string;
    twitch: string;
  };

  export let liveStats: LiveStatsApiResponse = null,
    socials: Socials,
    showElevator = false,
    callElevator: () => void;
</script>

<footer class:has-now-playing={liveStats?.nowPlaying}>
  <p>
    <slot />
  </p>
  <div class="socials">
    {#if liveStats?.nowPlaying}
      <a class="now-playing is-live" href={socials.lastfm} target="_blank">
        <img src={liveStats.nowPlaying.cover} alt="" />
        <div>
          <h1>{liveStats.nowPlaying.title}</h1>
          <h2>{liveStats.nowPlaying.artist}</h2>
        </div>
      </a>
    {/if}

    <FooterSocialButton href={socials.github}>
      <GitHubIcon />
    </FooterSocialButton>

    <FooterSocialButton href={socials.linkedin}>
      <LinkedInIcon />
    </FooterSocialButton>

    <FooterSocialButton href={socials.twitch} isLive={liveStats?.isLive}>
      <TwitchIcon />
    </FooterSocialButton>

    {#if !liveStats?.nowPlaying}
      <FooterSocialButton href={socials.lastfm}>
        <LastfmIcon />
      </FooterSocialButton>
    {/if}

    <FooterSocialButton href="mailto:{$LANG.email}">
      <MailIcon />
    </FooterSocialButton>
  </div>
</footer>

<div class="elevator" class:active={showElevator} on:click={callElevator}>
  <ElevatorIcon />
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'
  @import '../../../assets/sass/mixins.sass'

  footer
    display: flex
    justify-content: space-between
    align-items: center
    padding: 4rem 0

    .socials
      display: flex
      gap: 1rem

      .now-playing      
        position: relative
        display: flex
        height: 4rem
        background-color: rgba(255, 255, 255, .05)
        color: $whiteish
        text-decoration: none
        transition: all .2s ease

        &:hover
          transform: translateY(-.25rem)

        &.is-live::before
          @include live-badge

        img
          height: 4rem
          width: 4rem
          pointer-events: none
          transition: all .2s ease

        div
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 1rem

          h1,
          h2
            max-width: 300px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis

          h1
            font-weight: 700

          h2
            font-weight: 300

  .elevator
    position: fixed
    right: 1rem
    bottom: 1rem
    display: flex
    justify-content: center
    align-items: center
    height: 3rem
    width: 3rem
    cursor: pointer
    transition: all .2s ease

    &:not(:hover)
      opacity: .5

    &:not(.active)
      bottom: -3rem

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
        width: 19rem
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

    .elevator
      height: 1.5rem
      width: 1.5rem
</style>
