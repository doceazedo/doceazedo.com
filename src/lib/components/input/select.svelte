<script lang="ts">
  export let name: string;
  export let options: Map<string, string>;
  export let value: string;
  export let disabled = false;
</script>

<select {name} bind:value on:change {disabled}>
  {#each [...options] as option}
    <option value={option[0]}>{option[1]}</option>
  {/each}
</select>

<style lang="sass">
  @import '../../../assets/sass/vars'

  select
    width: 8rem
    padding: .25rem
    background-color: rgba($primary, .1)
    box-shadow: 0 0 0 1px $primary
    border-radius: .5rem
    border: none

    &:disabled
      opacity: .5
      cursor: not-allowed
</style>