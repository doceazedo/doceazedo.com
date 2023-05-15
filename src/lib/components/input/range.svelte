<script lang="ts">
  export let value = 0;
  export let name: string;
  export let label: string;
  export let max: number;
</script>

<div class="range">
  <label for={name}>{label}</label>
  <input type="range" {name} min={0} {max} bind:value />
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .range
    display: flex
    flex-direction: column
    align-items: center
    gap: .75rem

  input
    -webkit-appearance: none
    width: 8rem
    height: .25rem
    background-color: rgba(#fff, .1)
    border-radius: 5px

    &::-webkit-slider-thumb
      -webkit-appearance: none
      height: 1rem
      width: 1rem
      border-radius: 50%
      background: var(--primary)
      cursor: ew-resize
      box-shadow: 0 0 2px 0 #555
      transition: background .3s ease-in-out

    &::-webkit-slider-runnable-track
      -webkit-appearance: none
      box-shadow: none
      border: none
      background: none

  :global([data-theme="light"])
    input::-webkit-slider-thumb
      background-color: #fff
</style>
