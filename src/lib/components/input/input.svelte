<script lang="ts">
  export let value = '',
    placeholder = '';
</script>

<input class="input" type="text" {placeholder} bind:value on:keyup />

<style lang="sass">
  @import '../../../assets/sass/vars'

  .input
    width: 100%
    padding: 1rem
    background-color: transparent
    border: none
    border-radius: 1rem
    background-color: rgba(#fff, .1)
    outline: none
    transition: all .2s ease

    &:focus
      background-color: rgba(var(--primary-rgb), .1)
      box-shadow: 0 0 .5rem .25rem rgba(var(--primary-rgb), .25), inset 0 0 0 1px var(--primary)

  :global([data-theme="light"])
    .input
      background-color: rgba(var(--primary-rgb), .1)
      box-shadow: 0 0 .5rem .25rem transparent, inset 0 0 0 1px var(--primary-light)
      color: #000

      &:focus
        background-color: rgba(var(--primary-rgb), .2)
        box-shadow: 0 0 .5rem .25rem rgba(var(--primary-rgb), .25), inset 0 0 0 1px var(--primary)
</style>
