<script lang="ts">
  import _ from '$lib/lang';
</script>

<a href="#main">{$_.skipToContent}</a>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  a
    position: absolute
    left: 0
    top: 2rem
    padding: .5rem 1rem .5rem .5rem
    border-top-right-radius: 1rem
    border-bottom-right-radius: 1rem
    background-color: var(--primary)
    transition: all .2s ease

    &:not(:focus)
      opacity: 0
      pointer-events: none
      transform: translateX(-.5rem)
</style>
