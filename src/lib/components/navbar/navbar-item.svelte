<script lang="ts">
  export let href: string,
    active = false,
    live = false;
</script>

<a {href} class="navbar-item" class:active class:live>
  <slot />
</a>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'

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

    &.live
      padding-right: 1.5rem

      &::after
        @include live-badge
        top: calc(50% - 3px)
        right: .5rem
        height: .5rem
        width: .5rem
        border: none

  :global([data-theme="light"])
    .navbar-item
      color: $blackish

      &::before
        box-shadow: 0 0 .75rem .25rem rgba($primary, .25)
        
      &:hover,
      &.active
        color: $primary-light
        text-shadow: 0 0 .25rem rgba($primary-light, .25)

  @media screen and (max-width: 768px)
    .navbar-item
      height: 4rem
      background-color: #11052c
      transition: all .2s ease
</style>
