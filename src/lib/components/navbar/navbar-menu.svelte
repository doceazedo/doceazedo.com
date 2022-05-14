<div class="navbar-menu">
  <slot />
</div>

<style lang="sass">
  .navbar-menu
    display: flex
    margin-left: auto

  @media screen and (max-width: 768px)
    .navbar-menu
      display: none
</style>
