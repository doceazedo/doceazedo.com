<script lang="ts">
  import { shortcuts } from './navbar-data';
</script>

<div class="navbar-shortcuts">
  {#each shortcuts as shortcut}
    <!-- TODO: add alt text to icons (<a title="">) -->
    <a href={shortcut.href} target={shortcut.target} class="icon">
      <svelte:component this={shortcut.icon} />
    </a>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-shortcuts
    display: flex
    
    .icon
      position: relative
      display: flex
      justify-content: center
      align-items: center
      padding: .25rem
      color: $whiteish
      font-size: 1.25rem
      background: none
      border: none
      cursor: pointer
      transition: all .2s ease

      :global(svg)
        width: 1.25rem
        height: 1.25rem
        transition: all .2s ease

      &:hover :global(svg)
        color: $primary-light
        text-shadow: 0 0 .25rem $primary-light

  @media screen and (max-width: 768px)
    .navbar-shortcuts
      margin-left: auto
</style>
