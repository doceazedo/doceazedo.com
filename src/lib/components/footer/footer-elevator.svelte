<script lang="ts">
  import { browser } from '$app/environment';
  import { ElevatorIcon } from '$lib/components';
  import { IS_ELEVATOR_FAST } from '$lib/stores';
  import regularElevatorMusic from '../../../assets/audio/Toby Fox - Hotel.mp3';
  import altElevatorMusic from "../../../assets/audio/Toby Fox - Can You Really Call This A Hotel, I Didn't Receive A Mint On My Pillow Or Anything.mp3";
  import chimeAudio from '../../../assets/audio/chime.mp3';

  let scrollY = 0;
  let regularSong: HTMLAudioElement;
  let altSong: HTMLAudioElement;
  let chime: HTMLAudioElement;
  $: speed = $IS_ELEVATOR_FAST ? 3 : 1;

  if (browser) {
    regularSong = new Audio(regularElevatorMusic);
    altSong = new Audio(altElevatorMusic);
    chime = new Audio(chimeAudio);
    regularSong.loop = true;
    altSong.loop = true;
  }

  const scrollToTop = () => {
    chime.pause();
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - 4 * speed);
    } else {
      regularSong.pause();
      regularSong.currentTime = 0;
      altSong.pause();
      altSong.currentTime = 0;
      chime.play();
    }
  };

  const callElevator = () => {
    if ($IS_ELEVATOR_FAST) {
      altSong.play();
    } else {
      regularSong.play();
    }
    chime.currentTime = 0;
    chime.volume = 0.5;
    scrollToTop();
  };
</script>

<svelte:window bind:scrollY />

<button class="elevator" on:click={callElevator}>
  <ElevatorIcon />
</button>

<style lang="sass">
  .elevator
    position: absolute
    right: 1rem
    bottom: 1rem
    display: flex
    justify-content: center
    align-items: center
    background-color: transparent
    border: none
    cursor: pointer
    transition: all .2s ease

    :global(svg)
      height: 3rem

    &:not(:hover)
      opacity: .5
</style>
