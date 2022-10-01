<script lang="ts">
  import { browser } from '$app/environment';
  import { Footer } from '$lib/components';
  import { LIVE_DATA } from '$lib/modules/live';
  import ElevatorAudio from '../../../assets/audio/Toby Fox - Hotel.mp3';
  import ChimeAudio from '../../../assets/audio/chime.mp3';

  let scrollY = 0;
  let song: HTMLAudioElement;
  let chime: HTMLAudioElement;

  if (browser) {
    song = new Audio(ElevatorAudio);
    song.loop = true;
    chime = new Audio(ChimeAudio);
  }

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
</script>

<svelte:window bind:scrollY />

<Footer liveStats={$LIVE_DATA} {callElevator} />
