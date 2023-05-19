<script lang="ts">
  import _ from '$lib/lang';
  import { languages } from './navbar-data';

  const switchLanguage = () => {
    const code = $_.code == 'en' ? 'pt' : 'en';
    _.change(code);
  };
</script>

<button on:click={switchLanguage} class="navbar-lang">
  <svelte:component this={languages[$_.code].icon} />
</button>

<style lang="sass">
  .navbar-lang
    display: flex
    padding: 0
    margin-left: 1rem
    background: none
    border: none
    cursor: pointer

    :global(svg)
      width: 1.5rem
      height: 1.5rem

  @media screen and (max-width: 768px)
    .navbar-lang
      margin: 0 1.5rem 0 .75rem

      :global(svg)
        width: 1.75rem
        height: 1.75rem
</style>
