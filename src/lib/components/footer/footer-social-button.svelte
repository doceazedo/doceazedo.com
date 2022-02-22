<script lang="ts">
  export let href: string,
    isLive = false;
</script>

<a {href} target="_blank" class="social" class:is-live={isLive}>
  <slot />
</a>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'
  @import '../../../assets/sass/mixins.sass'

  .social
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 4rem
    height: 4rem
    background-color: rgba(255, 255, 255, .05)
    color: $whiteish
    text-decoration: none
    transition: all .2s ease

    &:hover
      transform: translateY(-.25rem)

    &.is-live::before
      @include live-badge
</style>
