<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  type Languages = {
    [code: string]: {
      code: string;
      title: string;
      icon: typeof SvelteComponent;
    };
  };

  export let languages: Languages, activeLanguage: string, changeLanguage: (code: string) => void;

  $: otherCode = activeLanguage == 'en' ? 'pt' : 'en';
</script>

<div on:click={() => changeLanguage(otherCode)} class="navbar-lang">
  <svelte:component this={languages[activeLanguage].icon} />
</div>

<style lang="sass">
  .navbar-lang
    display: flex
    cursor: pointer
    margin-left: 1rem

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
