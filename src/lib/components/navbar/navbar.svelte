<script lang="ts">
  import { LANG } from '$lib/stores';
  import { BrandLogo, HamburgerIcon } from '$lib/components';

  export let toggleMobileMenu: () => void, onClickBrand: (e: Event) => void;
</script>

<navbar class="navbar">
  <div class="navbar-hamburger" on:click={toggleMobileMenu}>
    <HamburgerIcon />
  </div>

  <a class="navbar-brand" href="/" on:click={onClickBrand} aria-label={$LANG.navbar.home}>
    <BrandLogo />
  </a>

  <slot />
</navbar>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar
    position: relative
    display: flex
    align-items: center
    border-bottom: $hr

    &-brand
      display: flex
      transition: all .8s ease

      &::before
        content: ''
        position: absolute
        height: 4rem
        width: 4rem
        background-color: rgba($primary, .25)
        border-radius: 50%
        filter: blur(.5rem)
        pointer-events: none

      :global(svg)
        width: 4rem
        height: 4rem
        pointer-events: none
        user-select: none

    &-hamburger
      display: none

  @media screen and (max-width: 768px)
    .navbar
      &-brand :global(svg),
      &-brand::before
        width: 3rem
        height: 3rem

      &-hamburger
        display: block
        padding: 1.5rem
</style>
