<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { AchievementIcon } from '$lib/components';

  const hideAfter = 8000;
  let show = true;

  onMount(() => setTimeout(() => (show = false), hideAfter));
</script>

{#if show}
  <div class="achievement" transition:fly={{ duration: 800, y: -80, opacity: 1, easing: quintOut }}>
    <AchievementIcon />
  </div>
{/if}

<style lang="sass">
  .achievement
    position: fixed
    top: 1rem
    right: 1rem
    width: 20rem
    height: 4rem
    z-index: 999

    @media screen and (max-width: 768px)
      width: 16rem
      height: 3.2rem
</style>
