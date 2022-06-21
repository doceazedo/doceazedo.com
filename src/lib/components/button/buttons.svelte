<script lang="ts">
  export let small = false;
</script>

<div class="buttons" class:small>
  <slot />
</div>

<style lang="sass">
  .buttons
    display: flex
    align-items: center
    gap: 1rem

    &.small
      gap: .5rem
</style>
