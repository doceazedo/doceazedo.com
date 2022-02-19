<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error: status,
        message: error.message
      }
    };
  }
</script>

<script lang="ts">
  export let error: number, message: string;
  console.error(`Error ${error}: ${message}`);
</script>

<h1>{error}</h1>
<h2>
  {#if error == 404}
    This was probably a mistake.
  {:else}
    Something went wrong. <a
      href="https://github.com/doceazedo/lucasfernandes.com.br/issues"
      target="_blank">Open an issue?</a
    >
  {/if}
</h2>

<style lang="sass">
  @import '../assets/sass/vars.sass'
  
  h1
    font-size: 3rem
    font-weight: 700
    margin-top: 8rem
    margin-bottom: .5rem

  h2
    font-size: 1.5rem
    padding-bottom: 8rem
    border-bottom: $hr
    color: $whiteish

  a
    color: $primary
    text-decoration: none
    text-shadow: 0 0 .25rem $primary
</style>
