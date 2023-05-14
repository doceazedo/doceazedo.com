<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let active = false;
  export let iconOff: typeof SvelteComponent | string | null = null;
  export let iconOn: typeof SvelteComponent | string | null = null;
</script>

<button class="switch" on:click={() => (active = !active)} on:click class:is-active={active}>
  <div class="icon">
    {#if typeof iconOn === 'string'}
      {iconOn}
    {:else}
      <svelte:component this={iconOn} />
    {/if}
  </div>

  <div class="icon">
    {#if typeof iconOff === 'string'}
      {iconOff}
    {:else}
      <svelte:component this={iconOff} />
    {/if}
  </div>
</button>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .switch
    position: relative
    display: flex
    align-items: center
    width: 3.5rem
    height: 1.75rem
    padding: 0 .25rem
    background-color: rgba($primary, .1)
    box-shadow: 0 0 0 1px $primary
    border-radius: 1rem
    border: none
    cursor: pointer
    transition: all .2s ease

    &::before
      content: ''
      position: absolute
      top: 2px
      left: 2px
      width: 1.5rem
      height: 1.5rem
      background-color: $primary
      border-radius: 50%
      transition: all .2s ease

    &.is-active
      background-color: $primary

      &::before
        left: 30px
        background-color: #fff

    .icon
      display: flex
      justify-content: center
      width: 50%
      color: $whiteish

      :global(svg)
        width: 1.25rem
        height: 1.25rem
</style>
