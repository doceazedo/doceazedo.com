<script lang="ts">
  export let href: string,
    active = false;
</script>

<a {href} class="navbar-item" class:active>
  <slot />
</a>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-item
    position: relative
    display: flex
    justify-content: center
    align-items: center
    height: 5rem
    padding: 0 1rem
    text-decoration: none
    color: $whiteish
    transition: all .2s ease

    &::before
      content: ''
      position: absolute
      bottom: -1px
      left: 0
      z-index: 1
      width: 100%
      height: 1px
      background-color: $primary
      box-shadow: 0 0 .5rem .25rem rgba($primary, .25)
      opacity: 0
      transition: all .2s ease

    &:hover,
    &.active
      color: $primary-light
      text-shadow: 0 0 .25rem $primary-light

    &.active::before
      opacity: 1

  @media screen and (max-width: 768px)
    .navbar-item
      height: 4rem
      background-color: #11052c
      transition: all .2s ease
</style>
