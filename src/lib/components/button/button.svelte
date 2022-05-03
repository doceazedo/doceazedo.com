<script lang="ts">
  export let outline = false,
    href: string = null,
    target: string = null,
    center = false;
</script>

{#if href}
  <a {href} {target} class="button" class:outline class:center>
    <slot />
  </a>
{:else}
  <button class="button" on:click class:outline class:center>
    <slot />
  </button>
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars'

  .button
    display: flex
    gap: .5rem
    border: none
    padding: 1rem 1.75rem
    font-size: 1.25rem
    text-decoration: none
    color: #fff
    background-color: $primary
    box-shadow: 0 0 .5rem .25rem rgba($primary, .25)
    border-radius: .5rem
    cursor: pointer
    transition: all .2s ease

    &:hover
      transform: translateY(-.25rem)

    &.outline
      color: $primary-light
      background-color: rgba($primary-light, .1)
      box-shadow: 0 0 .5rem .25rem rgba($primary, .25), inset 0 0 0 1px $primary

    :global(svg)
      height: 1.5rem
      width: 1.5rem

    &.center
      margin: auto
      margin-top: 4rem

  a
    width: fit-content
</style>
