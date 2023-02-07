<script lang="ts">
  import { BlurbInfo, BlurbSelfie } from '.';
</script>

<header class="blurb">
  <BlurbInfo />
  <BlurbSelfie />
</header>

<style lang="sass">
  .blurb
    display: flex
    justify-content: space-between
    align-items: center
    padding: 4rem 0

  @media screen and (max-width: 768px)
    .blurb
      flex-direction: column-reverse
      gap: 2rem
      padding: 3rem 0

      :global(&-info),
      :global(&-selfie)
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        width: 100%
</style>
