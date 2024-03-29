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
    align-items: center
    gap: .5rem
    border: none
    padding: 1rem 1.75rem
    font-family: var(--font-primary)
    font-size: 1.25rem
    text-decoration: none
    color: #fff
    background-color: var(--primary)
    box-shadow: 0 0 .5rem .25rem rgba(var(--primary-rgb), .25)
    border-radius: .5rem
    transition: all .2s ease

    &:not(:disabled):hover
      transform: translateY(-.25rem)
      cursor: pointer

    &:disabled
      opacity: .5

    &.outline
      color: var(--primary-light)
      background-color: rgba(var(--primary-rgb), .1)
      box-shadow: 0 0 .5rem .25rem rgba(var(--primary-rgb), .25), inset 0 0 0 1px var(--primary)

    &.light
      background-color: #fff
      color: var(--primary)

    &.outline.light
      color: #fff
      background-color: rgba(#fff, .1)
      box-shadow: inset 0 0 0 1px #fff

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

      :global(svg)
        height: 1.25rem
        width: 1.25rem

  :global([data-theme="light"])
    .button.outline:not(.light)
      color: var(--primary)
      background-color: rgba(var(--primary-rgb), .1)
      box-shadow: 0 0 .75rem .25rem rgba(var(--primary-rgb), .2), inset 0 0 0 1px var(--primary)

  :global([data-dyslexia-mode="true"])
    .button
      padding: .5rem 1.75rem .75rem

      &.small
        padding: .25rem 1rem .5rem

      &.medium
        padding: .5rem 1.6rem .75rem
</style>
