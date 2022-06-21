<script lang="ts">
  import { LANG } from '$lib/stores';
  import { BrandDoceAzedo, HamburgerIcon } from '$lib/components';

  export let toggleMobileMenu: () => void,
    onClickBrand: (e: Event) => void,
    hamburgerEl: HTMLElement,
    isMobileMenusOpen = false;
</script>

<nav class="navbar">
  <div class="navbar-hamburger" on:click={toggleMobileMenu} bind:this={hamburgerEl}>
    <HamburgerIcon isCross={isMobileMenusOpen} />
  </div>

  <a class="navbar-brand" href="/" on:click={onClickBrand} aria-label={$LANG.alt.home}>
    <BrandDoceAzedo />
  </a>

  <slot />
</nav>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar
    position: relative
    display: flex
    align-items: center
    max-width: 900px
    margin: 0 auto
    border-bottom: $hr

    &-brand
      position: relative
      display: flex
      transition: all .8s ease

      :global(svg)
        height: 3rem
        pointer-events: none
        user-select: none

      &::before
        content: ''
        position: absolute
        width: 100%
        height: 100%
        background-color: rgba($primary, .25)
        border-radius: 50%
        filter: blur(1rem)
        transform: scale(1.25)
        pointer-events: none
        transition: all .2s ease

    &-hamburger
      display: none
      color: $whiteish

  @media screen and (max-width: 768px)
    .navbar
      position: fixed
      top: 0
      left: 0
      width: 100%
      background-color: rgba($background, .75)
      backdrop-filter: blur(.5rem)
      z-index: 20

      &-brand :global(svg),
      &-brand::before
        height: 2.5rem

      &-hamburger
        display: block
        padding: 1.5rem
</style>
