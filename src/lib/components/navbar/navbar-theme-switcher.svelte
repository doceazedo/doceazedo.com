<script lang="ts">
  import { SunIcon, MoonIcon } from '$lib/components/icons';
  import { THEME } from '$lib/stores';

  const switchTheme = () => ($THEME = $THEME == 'dark' ? 'light' : 'dark');
</script>

<button class="theme-switcher" on:click={switchTheme}>
  <SunIcon />
  <MoonIcon />
</button>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'
  
  .theme-switcher
    @include icon-button
    justify-content: flex-start
    padding: 0
    width: 1.75rem
    overflow: hidden

    :global(svg)
      margin: .25rem
      flex-shrink: 0
      transition: color .2s ease, margin .4s ease
      
      &:first-child
        margin-left: -1.5rem

  :global([data-theme="light"])
    .theme-switcher
      color: $blackish

      :global(svg:first-child)
        margin-left: 0
</style>
