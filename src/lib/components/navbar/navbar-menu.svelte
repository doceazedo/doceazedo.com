<script lang="ts">
  export let toggleMobileMenu: () => void, showMobileMenu: boolean;
</script>

<div class="navbar-menu" class:show={showMobileMenu} on:click={toggleMobileMenu}>
  <slot />
</div>

<style lang="sass">
  .navbar-menu
    display: flex
    margin-left: auto

  @media screen and (max-width: 768px)
    .navbar-menu
      position: fixed
      top: 0
      left: 0
      height: 100%
      width: 100%
      z-index: 999
      flex-direction: column
      background-color: rgba(#000, .5)
      backdrop-filter: blur(.25rem)
      transition: all .2s ease

      &:not(.show)
        pointer-events: none
        opacity: 0

        >:global(*)
          transform: translateY(-4rem)
</style>
