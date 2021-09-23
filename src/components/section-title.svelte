<script>
  export let title, paragraph;
</script>

<h1>{title}</h1>
{#if paragraph}
  <p>
    {#each paragraph as line}
      {line} <br>
    {/each}
  </p>
{/if}

<style type="text/sass">
  @import '../assets/sass/vars.sass'

  h1,
  p
    text-align: center

  h1
    font-size: 2.25rem
    font-weight: 700
    margin-bottom: 4rem

  p
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
    margin-top: -3rem
    margin-bottom: 4rem

  @media screen and (max-width: 768px)
    h1
      font-size: 2rem

    br
      display: none
</style>