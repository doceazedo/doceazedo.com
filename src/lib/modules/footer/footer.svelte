<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { LANG } from '$lib/stores';
  import { Footer } from '$lib/components';
  import ElevatorAudio from '../../../assets/audio/Toby Fox - Hotel.mp3';
  import ChimeAudio from '../../../assets/audio/chime.mp3';
  import type { LiveStatsApiResponse } from '$lib/modules';

  const socials = {
    github: 'https://github.com/doceazedo',
    lastfm: 'https://last.fm/user/doceazedo911',
    linkedin: 'https://linkedin.com/in/imlucas',
    twitch: 'https://twitch.tv/doceazedo911'
  };
  let scrollY = 0;
  let showElevator = false;
  let liveStats: LiveStatsApiResponse = null;
  let song: HTMLAudioElement;
  let chime: HTMLAudioElement;

  if (browser) {
    song = new Audio(ElevatorAudio);
    song.loop = true;
    chime = new Audio(ChimeAudio);
  }

  $: scrollY, handleScrollY();

  const handleScrollY = () =>
    (showElevator = browser && window.innerHeight + scrollY >= document.body.offsetHeight);

  const updateLiveStats = async () => (liveStats = await (await fetch('/api/live')).json());

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - 4);
    } else {
      song.pause();
      song.currentTime = 0;
      chime.play();
    }
  };

  const callElevator = () => {
    song.play();
    chime.currentTime = 0;
    chime.volume = 0.5;
    scrollToTop();
  };

  onMount(() => {
    updateLiveStats();
    setInterval(updateLiveStats, 10000);
  });
</script>

<svelte:window bind:scrollY />

<Footer {liveStats} {socials} {showElevator} {callElevator} />
