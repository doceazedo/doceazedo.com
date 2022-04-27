<script lang="ts">
  import Icon from '@iconify/svelte';

  type NavbarIcon = {
    icon: string;
    href: string;
  };

  export let icons: NavbarIcon[];
</script>

<div class="navbar-icons">
  {#each icons as icon}
    <!-- FIXME: add alt text -->
    <a href={icon.href} alt="">
      <Icon icon={icon.icon} />
    </a>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .navbar-icons
    display: flex
    
    a
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
        transition: all .2s ease

      &:hover :global(svg)
        color: $primary-light
        text-shadow: 0 0 .25rem $primary-light
</style>
