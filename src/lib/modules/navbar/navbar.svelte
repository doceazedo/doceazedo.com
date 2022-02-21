<script lang="ts">
  import { page } from '$app/stores';
  import { NavbarAchievement, NavbarItem, NavbarLang, NavbarMenu, Navbar } from '$lib/components';
  import { lang } from '$lib/stores';
  import { lang as __oldLangPlsDeleteMeAfterFinishingRefactor } from '../../../stores';

  const navbarPageSlugs = ['', 'blog', 'about', 'contact'];
  const languages = [
    { code: 'pt', title: 'PT-BR' },
    { code: 'en', title: 'EN' }
  ];
  let activeLanguage = 'en';
  let showMobileMenu = false;
  let brandSpinDegrees = 0;
  let achievementGet = false;

  const changeLanguage = (code: string) => {
    lang.change(code);
    __oldLangPlsDeleteMeAfterFinishingRefactor.change(code);
    activeLanguage = code;
  };

  lang.subscribe((x) => (activeLanguage = x.code));

  const toggleMobileMenu = () => (showMobileMenu = !showMobileMenu);

  const onClickBrand = (event: Event) => {
    brandSpinDegrees += 360;
    const brand = event.target as HTMLElement;
    brand.style.transform = `rotate(${brandSpinDegrees}deg)`;

    if (brandSpinDegrees / 360 >= 10) {
      achievementGet = true;
      console.log('achievementGet');
    }
  };
</script>

<Navbar {toggleMobileMenu} {onClickBrand}>
  <NavbarMenu {toggleMobileMenu} {showMobileMenu}>
    {#each navbarPageSlugs as slug}
      <NavbarItem
        href="/{slug}"
        active={slug ? $page.url.pathname.startsWith(`/${slug}`) : $page.url.pathname == '/'}
      >
        {$lang.navbar[slug || 'home']}
      </NavbarItem>
    {/each}
  </NavbarMenu>

  <NavbarLang {languages} {changeLanguage} {activeLanguage} />

  {#if achievementGet}
    <NavbarAchievement />
  {/if}
</Navbar>
