<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { navigating } from '$app/stores';

  $: changed = $navigating?.from != $navigating?.to;
</script>

{#key changed}
  <main
    id="main"
    in:fly={{ duration: 300, y: 32, opacity: 0, easing: quintOut, delay: 500 }}
    out:fly={{ duration: 300, y: 32, opacity: 0, easing: quintOut }}
  >
    <slot />
  </main>
{/key}

<style lang="sass">
  #main
    max-width: 900px
    margin: auto
    
  @media screen and (max-width: 768px)
    #main
      padding: 77px 1rem 0
</style>
