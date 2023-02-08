<script lang="ts">
  import { browser } from '$app/environment';
  import { ElevatorIcon } from '$lib/components';
  import elevatorAudio from '../../../assets/audio/Toby Fox - Hotel.mp3';
  import chimeAudio from '../../../assets/audio/chime.mp3';

  let scrollY = 0;
  let song: HTMLAudioElement;
  let chime: HTMLAudioElement;

  if (browser) {
    song = new Audio(elevatorAudio);
    chime = new Audio(chimeAudio);
    song.loop = true;
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
