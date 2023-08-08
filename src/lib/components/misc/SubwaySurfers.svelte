<script lang="ts">
  import { ADHD_MODE, IS_ADHD_MODE_AVAILABLE } from '$lib/stores';
  import { quintOut } from 'svelte/easing';
  import { fade, slide } from 'svelte/transition';

  let screenWidth: number;
  let muted = false;

  $: screenWidth, ($IS_ADHD_MODE_AVAILABLE = screenWidth >= 900 + 384 + 48);

  const toggleMute = () => (muted = !muted);
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
      <!-- svelte-ignore a11y-media-has-caption -->
      <video class="video" src="/video/subway-surfers.mp4" autoplay loop bind:muted />
    </button>
  </aside>
{/if}

<style lang="sass">
  aside,
  .video
    width: 24rem

  .video-wrapper
    display: flex
    margin: 0
    padding: 0
    border: none

  .video
    position: fixed
    left: calc(50% + 450px - 12rem + 1.5rem)
    top: calc(50% - 341px)
    aspect-ratio: 9 / 16
    border-radius: 1rem
    overflow: hidden
</style>
