<script lang="ts">
  import { slide, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { CloseIcon } from '$lib/components/icons';
</script>

<div class="topbar" out:slide={{ duration: 300, easing: quintOut }}>
  <div class="topbar-content">
    <slot />
  </div>
  <a
    href={$page.url.pathname}
    class="topbar-close"
    out:scale={{ duration: 200, opacity: 0, start: 0.25, easing: quintOut }}
  >
    <CloseIcon />
  </a>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .topbar
    position: relative
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

      :global(svg)
        height: 1rem
        width: 1rem

  @media screen and (max-width: 768px)
    .topbar
      margin-top: 77px
      margin-bottom: -77px

      &-content
        padding: 1rem

      &-close
        top: .25rem
        right: .25rem
</style>
