<script>
  export let outline, href, target, center;
</script>

{#if href}
  <a svelte:prefetch {href} {target} class="button" class:outline class:center>
    <slot />
  </a>
{:else}
  <button class="button" class:outline class:center>
    <slot />
  </button>
{/if}

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  .button
    display: flex
    border: none
    padding: 1rem 2rem
    font-size: 1.25rem
    text-decoration: none
    color: #fff
    background-color: $primary
    box-shadow: 0 0 .5rem .25rem rgba($primary, .25)
    cursor: pointer
    transition: all .2s ease

    &:hover
      transform: translateY(-.25rem)

    &.outline
      color: $primary
      background-color: rgba($primary, .1)
      box-shadow: 0 0 .5rem .25rem rgba($primary, .25), inset 0 0 0 1px $primary

      &:hover
        // background-color: rgba($primary, .25)

    :global(.feather)
      margin-right: .5rem

    &.center
      margin: auto
      margin-top: 4rem

  a
    width: fit-content
</style>