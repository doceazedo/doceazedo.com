<script lang="ts">
  export let href: string,
    rel: string,
    isLarge = false;
</script>

<a {href} target="_blank" {rel} class="button-icon" class:xl={isLarge}>
  <slot />
</a>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .button-icon
    display: flex
    justify-content: center
    align-items: center
    width: 1.5rem
    height: 1.5rem
    color: var(--primary-light)
    transition: all .2s ease

    &.xl
      width: 1.75rem
      height: 1.75rem

    &:hover
      transform: translateY(-2px)

    :global(svg)
      width: 100%
      height: 100%
</style>
