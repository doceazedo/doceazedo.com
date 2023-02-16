<script lang="ts">
  import { HamburgerIcon } from '$lib/components/icons';

  export let toggleMobileMenu: () => void;
  export let showMobileMenu: boolean;
  export let ref: HTMLButtonElement;
</script>

<button class="navbar-hamburger" on:click={toggleMobileMenu} bind:this={ref}>
  <HamburgerIcon isCross={showMobileMenu} />
</button>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-hamburger
    display: none
    color: $whiteish

  @media screen and (max-width: 768px)
    .navbar-hamburger
      display: block
      padding: 1.5rem
      background: none
      border: none
</style>
