<div class="buttons">
  <slot />
</div>

<style lang="sass">
  .buttons
    display: flex
    gap: 1rem

  @media screen and (max-width: 768px)
    .buttons
      justify-content: center
</style>
