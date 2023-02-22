<script lang="ts">
  import { SunIcon, MoonIcon } from '$lib/components/icons';
  import { THEME } from '$lib/stores';

  const switchTheme = () => ($THEME = $THEME == 'dark' ? 'light' : 'dark');
</script>

<button class="theme-switcher" on:click={switchTheme}>
  {#if $THEME == 'dark'}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
</button>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'
  
  .theme-switcher
    @include icon-button

  :global([data-theme="light"])
    .theme-switcher
      color: $blackish
</style>
