<script lang="ts">
  import Icon from '@iconify/svelte';
  import { slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let show = true;
</script>

{#if show}
  <div class="topbar" out:slide={{ duration: 300, easing: quintOut }}>
    <div class="topbar-content">
      <slot />
    </div>
    <button
      class="topbar-close"
      on:click={() => (show = false)}
      out:scale={{ duration: 200, opacity: 0, start: 0.25, easing: quintOut }}
    >
      <Icon icon="ri:close-line" />
    </button>
  </div>
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .topbar
    display: flex
    width: 100%
    margin-bottom: .5rem
    background-color: $primary

    &-content
      max-width: 900px
      margin: 0 auto
      padding: 1rem 0
      line-height: 1.5rem
      color: #fff

      :global(a)
        background-color: #fff
        color: $primary
        font-weight: 700
        padding: 0 .25rem
        border-radius: .25rem

    &-close
      position: absolute
      top: .5rem
      right: .5rem
      display: flex
      justify-content: center
      align-items: center
      width: 1.25rem
      height: 1.25rem
      margin: 0
      padding: 0
      background-color: rgba(#000, .25)
      border: none
      border-radius: 50%
      cursor: pointer
</style>
