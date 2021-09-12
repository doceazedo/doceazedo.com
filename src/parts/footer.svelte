<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { GithubIcon, LinkedinIcon, TwitchIcon, MailIcon } from 'svelte-feather-icons';
  import LastFmIcon from '../components/lastfm-icon.svelte';
  import LiftIcon from '../components/lift-icon.svelte';
  import Hotel from '../assets/audio/Toby Fox - Hotel.mp3';
  import Chime from '../assets/audio/chime.mp3';

  let liveStats = {};
  let scroll = 0;
  let isAtBottom = false;

  let song, chime;

  $: {
    isAtBottom = false;
    if (browser && window.innerHeight + scroll >= document.body.offsetHeight) {
      isAtBottom = true;
    }
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - 4);
      // window.scrollTo(0, c < 250 ? c - c / 100 : c - 5);
      // window.scrollTo(0, c - c / 100);
    } else {
      song.pause();
      song.currentTime = 0;
      chime.play();
    }
  };

  const callLift = () => {
    song = new Audio(Hotel);
    song.play();

    chime = new Audio(Chime);
    chime.currentTime = 0;
    chime.volume = .5;

    scrollToTop();
  }

  onMount(async () => {
		const res = await fetch('/api/live');
		liveStats = await res.json();
	});
</script>

<svelte:window bind:scrollY={scroll}/>

<footer>
  <p>
    Proudly built with Svelte.<br>
    Designed and coded by Lucas Fernandes.
  </p>
  <div>
    {#if liveStats.nowPlaying}
      <a class="now-playing live" href="https://www.last.fm/user/pxlucasf" target="_blank">
        <img src={liveStats.nowPlaying.cover} alt="">
        <div>
          <h1>{liveStats.nowPlaying.title}</h1>
          <h2>{liveStats.nowPlaying.artist}</h2>
        </div>
      </a>
    {/if}

    <a class="social" href="https://github.com/doceazedo" target="_blank">
      <GithubIcon size="24" />
    </a>
    <a class="social" href="https://linkedin.com/in/imlucas" target="_blank">
      <LinkedinIcon size="24" />
    </a>
    <a class="social" class:live={liveStats.isLive} href="https://twitch.tv/doceazedo911" target="_blank">
      <TwitchIcon size="24" />
    </a>
    {#if !liveStats.nowPlaying}
      <a class="social" href="https://www.last.fm/user/pxlucasf" target="_blank">
        <LastFmIcon/>
      </a>
    {/if}
    <a class="social" href="mailto:me@lucasfernandes.com.br" target="_blank">
      <MailIcon size="24" />
    </a>
  </div>
</footer>

<div class="lift" class:active={isAtBottom} on:click={callLift}>
  <LiftIcon/>
</div>

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  footer
    display: flex
    justify-content: space-between
    align-items: center
    padding: 4rem 0

    >div
      display: flex

      .now-playing,
      .social
        display: flex
        height: 4rem
        background-color: rgba(255, 255, 255, .05)
        color: $whiteish
        text-decoration: none
        transition: all .2s ease

        &:hover
          transform: translateY(-.25rem)

        &:not(:last-child)
          margin-right: 1rem

        &.live
          position: relative

          &::before
            content: ''
            position: absolute
            top: -.25rem
            right: -.25rem
            height: .75rem
            width: .75rem
            background-color: #ff0000
            border-radius: 50%
            box-shadow: 0 0 .5rem 0 rgba(255, 0, 0, .75)
            animation: pulse 2s infinite

      .social
        justify-content: center
        align-items: center
        width: 4rem

      .now-playing
        img
          pointer-events: none

        div
          display: flex
          flex-direction: column
          justify-content: center
          // padding-left: .75rem
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

  .lift
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

  @keyframes pulse
    0%
      transform: scale(0.95)
      box-shadow: 0 0 0 0 rgba(255, 0, 0, .5)

    70%
      transform: scale(1)
      box-shadow: 0 0 0 .75rem rgba(255, 0, 0, 0)

    100%
      transform: scale(0.95)
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0)
</style>