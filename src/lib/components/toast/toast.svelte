<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
</script>

<div class="toast" transition:fly={{ duration: 300, x: -16, opacity: 0, easing: quintInOut }}>
  <slot />
</div>

<style lang="sass">
  .toast
    position: fixed
    bottom: 1rem
    left: 1rem
    display: flex
    align-items: center
    gap: .5rem
    padding: .5rem 1rem
    border-radius: .5rem
    background-color: #198754
    cursor: default
</style>
