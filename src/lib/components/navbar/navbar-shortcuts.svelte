<script lang="ts">
  import { NavbarSettings } from '.';
  import { shortcuts } from './navbar-data';
</script>

<div class="navbar-shortcuts">
  <NavbarSettings />
  {#each shortcuts as shortcut}
    <!-- TODO: add alt text to icons (<a title="">) -->
    <a href={shortcut.href} target={shortcut.target} class="icon">
      <svelte:component this={shortcut.icon} />
    </a>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'

  .navbar-shortcuts
    display: flex
    
    .icon
      @include icon-button

  :global([data-theme="light"])
    .icon
      color: $blackish

  @media screen and (max-width: 768px)
    .navbar-shortcuts
      margin-left: auto
</style>
