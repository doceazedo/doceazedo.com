<script lang="ts">
  import { page } from '$app/stores';
  import { NavbarAchievement, NavbarItem, NavbarLang, NavbarMenu, Navbar } from '$lib/components';
  import { LANG } from '$lib/stores';
  import { sleep } from '$lib/utils';

  const navbarPageSlugs = ['', 'blog', 'about', 'contact'];
  const languages = [
    { code: 'pt', title: 'PT-BR' },
    { code: 'en', title: 'EN' }
  ];
  let activeLanguage = 'en';
  let showMobileMenu = false;
  let brandClicks = 0;
  let brandAnimating = false;
  let achievementGet = false;

  const changeLanguage = (code: string) => {
    LANG.change(code);
    activeLanguage = code;
  };

  LANG.subscribe((x) => (activeLanguage = x.code));

  const toggleMobileMenu = () => (showMobileMenu = !showMobileMenu);

  const onClickBrand = async (event: Event) => {
    if (brandAnimating) return;
    brandAnimating = true;

    brandClicks++;
    if (brandClicks >= 5) achievementGet = true;

    const brand = event.target as HTMLElement;
    const brandParts = brand.getElementsByTagName('path');

    brandParts[0].classList.add('hide');
    await sleep(100);
    brandParts[1].classList.add('hide');
    await sleep(500);
    brandParts[0].classList.remove('hide');
    await sleep(100);
    brandParts[1].classList.remove('hide');

    brandAnimating = false;
  };
</script>

<Navbar {toggleMobileMenu} {onClickBrand}>
  <NavbarMenu {toggleMobileMenu} {showMobileMenu}>
    {#each navbarPageSlugs as slug}
      <NavbarItem
        href="/{slug}"
        active={slug ? $page.url.pathname.startsWith(`/${slug}`) : $page.url.pathname == '/'}
      >
        {$LANG.navbar[slug || 'home']}
      </NavbarItem>
    {/each}
  </NavbarMenu>

  <NavbarLang {languages} {changeLanguage} {activeLanguage} />

  {#if achievementGet}
    <NavbarAchievement />
  {/if}
</Navbar>
