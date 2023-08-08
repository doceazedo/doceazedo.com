<div class="wrapper">
  <div>
    <slot />
  </div>
  <slot name="aside" />
</div>

<style lang="sass">
  .wrapper,
  div
    display: flex
    width: 100%

  .wrapper
    justify-content: center
    
    div
      flex-direction: column
      max-width: 900px
</style>
