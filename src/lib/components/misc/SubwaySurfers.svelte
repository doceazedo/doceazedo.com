<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fade, slide } from 'svelte/transition';
  import { ADHD_MODE, IS_ADHD_MODE_AVAILABLE } from '$lib/stores';
  import { SpinnerIcon } from '$lib/components/icons';

  let screenWidth: number;
  let muted = false;
  let playing = false;
  let currentTime = 0;

  $: screenWidth, ($IS_ADHD_MODE_AVAILABLE = screenWidth >= 1280);

  const toggleMute = () => (muted = !muted);

  const showVideo = () => {
    if (currentTime > 0 && playing == false) playing = true;
  };
  $: currentTime, showVideo();
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if $ADHD_MODE && $IS_ADHD_MODE_AVAILABLE}
  <aside transition:slide={{ duration: 800, easing: quintOut, axis: 'x' }}>
    <button
      class="video-wrapper"
      in:fade={{ duration: 800, easing: quintOut }}
      out:fade={{ duration: 800, easing: quintOut }}
      on:click={toggleMute}
    >
      <SpinnerIcon />
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        class="video"
        class:playing
        src="/video/subway-surfers.mp4"
        autoplay
        loop
        bind:muted
        bind:currentTime
      />
    </button>
  </aside>
{/if}

<style lang="sass">
  aside,
  .video-wrapper
    width: 16rem

  .video-wrapper
    position: fixed
    left: calc(50% + 450px - 8rem + 1.5rem)
    top: calc(50% - 228px)
    aspect-ratio: 9 / 16
    display: flex
    justify-content: center
    align-items: center
    margin: 0
    padding: 0
    border: none
    border-radius: 1rem
    overflow: hidden
    background-color: rgba(#fff, .1)

    :global(svg)
      width: 1.5rem
      height: 1.5rem

  .video
    width: 0

    &.playing
      width: 100%
      height: 100%
</style>
