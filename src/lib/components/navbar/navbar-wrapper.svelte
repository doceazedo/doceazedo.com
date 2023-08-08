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
      background-color: rgba(var(--background-rgb), .75)
      backdrop-filter: blur(.5rem)
      -webkit-backdrop-filter: blur(.5rem)
      z-index: 20
      transition: all .4s ease
  
    :global([data-theme="light"])
      .navbar
        background-color: rgba(var(--primary-rgb), .25)
        border-bottom-color: var(--primary)
</style>
