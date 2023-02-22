<nav class="navbar">
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
  
  :global([data-theme="light"])
    .navbar
      border-bottom: $hr-light

  @media screen and (max-width: 768px)
    .navbar
      position: fixed
      top: 0
      left: 0
      width: 100%
      background-color: rgba($background, .75)
      backdrop-filter: blur(.5rem)
      -webkit-backdrop-filter: blur(.5rem)
      z-index: 20
</style>
