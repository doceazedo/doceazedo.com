<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let icon: typeof SvelteComponent;
</script>

<h2>
  <span class="icon">
    <svelte:component this={icon} />
  </span>
  <slot />
</h2>

<style lang="sass">
  h2
    display: flex
    align-items: center
    gap: .5rem

    .icon
      display: flex
      justify-content: center
      align-items: center
      width: 2.25rem
      height: 2.25rem
      background-color: rgba(var(--primary-rgb), .1)
      border: 1px solid var(--primary)
      border-radius: .5rem
      transition: all .4s ease

      :global(svg)
        width: 1.25rem
        height: 1.25rem

  :global([data-theme="light"])
    h2 .icon
      background-color: var(--primary)
      color: #fff
</style>
