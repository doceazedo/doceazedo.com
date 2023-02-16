<script lang="ts">
  import {
    NavbarBrand,
    NavbarHamburger,
    NavbarLang,
    NavbarMobile,
    NavbarItems,
    NavbarShortcuts,
    NavbarWrapper
  } from '$lib/components';

  let showMobileMenu = false;
  let hamburgerEl: HTMLButtonElement;

  const toggleMobileMenu = () => (showMobileMenu = !showMobileMenu);
</script>

<NavbarWrapper>
  <NavbarHamburger {toggleMobileMenu} {showMobileMenu} bind:ref={hamburgerEl} />
  <NavbarBrand />
  <NavbarItems />
  <NavbarShortcuts />
  <NavbarLang />
</NavbarWrapper>

{#if showMobileMenu}
  <NavbarMobile {toggleMobileMenu} {hamburgerEl} />
{/if}
