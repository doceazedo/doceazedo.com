<script lang="ts">
  export let outline = false,
    href: string = null,
    target: string = null,
    type: string = null,
    disabled = false,
    light = false,
    center = false,
    small = false,
    medium = false;
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {target}
  {type}
  {disabled}
  class="button"
  class:is-link={!!href}
  class:outline
  class:light
  class:center
  class:small
  class:medium
  on:click
  on:keypress
>
  <slot />
</svelte:element>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .button
    display: flex
    justify-content: center
    gap: .5rem
    border: none
    padding: 1rem 1.75rem
    font-family: $font-primary
    font-size: 1.25rem
    text-decoration: none
    color: #fff
    background-color: $primary
    box-shadow: 0 0 .5rem .25rem rgba($primary, .25)
    border-radius: .5rem
    transition: all .2s ease

    &:not(:disabled):hover
      transform: translateY(-.25rem)
      cursor: pointer

    &:disabled
      opacity: .5

    &.outline
      color: $primary-light
      background-color: rgba($primary-light, .1)
      box-shadow: 0 0 .5rem .25rem rgba($primary, .25), inset 0 0 0 1px $primary

    &.light
      background-color: #fff
      color: $primary

    :global(svg)
      height: 1.5rem
      width: 1.5rem

    &.center
      margin: auto
      margin-top: 4rem

    &.is-link
      width: fit-content

    &.small
      font-size: 1rem
      padding: 0.5rem 1rem

      &:hover
        transform: translateY(-2px)

    &.medium
      font-size: 1.1rem
      padding: 1rem 1.6rem
</style>
