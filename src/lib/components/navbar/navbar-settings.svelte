<script lang="ts">
  import toast from 'svelte-french-toast';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import _ from '$lib/lang';
  import { MoonIcon, SettingsIcon, SunIcon } from '$lib/components/icons';
  import { Button } from '$lib/components/button';
  import { Range, Select, Switch } from '$lib/components/input';
  import {
    COLOR_THEMES,
    COLOR_THEME,
    IS_ELEVATOR_FAST,
    READING_FONT_SIZE,
    READING_LINE_HEIGHT,
    READING_MAX_WIDTH,
    THEME,
    USE_DYSLEXIA_FONT,
    unlockTheme
  } from '$lib/stores';
  import { clickOutside } from '$lib/utils';
  import { toastTheme } from '$lib/utils/toast';

  let isOpen = false;
  let toggleEl: HTMLElement;

  const togglePanel = () => (isOpen = !isOpen);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      isOpen = false;
      toggleEl.focus();
    }
  };

  const switchTheme = () => ($THEME = $THEME == 'dark' ? 'light' : 'dark');

  const readingWidths = ['600px', '700px', '800px', '900px'];

  $: colorThemes = new Map(
    Object.keys($COLOR_THEMES).map((theme) => [theme, $_.settings.themes[theme] || theme])
  );

  const originalColorThemesLength = Object.keys($COLOR_THEMES).length;
  const pickedColorThemes = new Set<string>();
  COLOR_THEME.subscribe((theme) => {
    pickedColorThemes.add(theme);
    if (pickedColorThemes.size >= originalColorThemesLength) {
      unlockTheme('pink');
    }
    if ($COLOR_THEMES[theme].isDarkOnly) {
      $THEME = 'dark';
    }
  });

  THEME.subscribe((theme) => {
    if (theme == 'dark') return;
    if ($COLOR_THEMES[$COLOR_THEME].isDarkOnly) {
      $THEME = 'dark';
      toast.error($_.settings.noLightMode, {
        ...toastTheme,
        duration: 3500
      });
    }
  });

  const reset = () => {
    $COLOR_THEME = 'purple';
    $READING_FONT_SIZE = 1;
    $READING_MAX_WIDTH = 1;
    $READING_LINE_HEIGHT = 1;
    $USE_DYSLEXIA_FONT = false;
    $IS_ELEVATOR_FAST = false;
  };
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="settings" use:clickOutside={() => (isOpen = false)}>
  <button class="settings-toggle" on:click={togglePanel} bind:this={toggleEl}>
    <SettingsIcon />
  </button>
  {#if isOpen}
    <div class="settings-panel" transition:fly={{ duration: 200, y: -8, easing: quintOut }}>
      <svg class="tail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.77 3.94">
        <path d="M.35,3.94L3.44,.85C4.24,.05,5.53,.05,6.32,.85l3.08,3.08H.35Z" />
        <path
          d="M.35,3.94L3.44,.85c.4-.4,.92-.6,1.44-.6s1.04,.2,1.44,.6l3.08,3.08H.35s9.41,0,9.41,0l-.18-.18L6.5,.67c-.43-.43-1.01-.67-1.62-.67s-1.19,.24-1.62,.67L.18,3.76l-.18,.18H.35Z"
          fill="rgba(255, 255, 255, .1)"
        />
      </svg>
      <ul>
        <h1 class="title">{$_.settings.title}</h1>
        <li>
          {$_.settings.theme}
          <Switch
            on:click={switchTheme}
            active={$THEME === 'light'}
            iconOff={MoonIcon}
            iconOn={SunIcon}
          />
        </li>
        <li>
          {$_.settings.colorTheme}
          <Select bind:value={$COLOR_THEME} options={colorThemes} hasColorPreview />
        </li>
        <li>
          {$_.settings.fontSize}
          <Range
            name="font-size"
            bind:value={$READING_FONT_SIZE}
            label={$_.settings.fontSizes[$READING_FONT_SIZE]}
            max={$_.settings.fontSizes.length - 1}
          />
        </li>
        <li class="is-desktop-only">
          {$_.settings.readingWidth}
          <Range
            name="max-width"
            bind:value={$READING_MAX_WIDTH}
            label={readingWidths[$READING_MAX_WIDTH]}
            max={readingWidths.length - 1}
          />
        </li>
        <li>
          {$_.settings.lineHeight}
          <Range
            name="line-height"
            bind:value={$READING_LINE_HEIGHT}
            label={$_.settings.lineHeights[$READING_LINE_HEIGHT]}
            max={$_.settings.lineHeights.length - 1}
          />
        </li>
        <li>
          {$_.settings.dyslexiaFont}
          <Switch bind:active={$USE_DYSLEXIA_FONT} iconOff="Aa" iconOn="Aa" />
        </li>
        <li>
          {$_.settings.elevatorSpeed}
          <Switch bind:active={$IS_ELEVATOR_FAST} iconOff="🐌" iconOn="⚡" />
        </li>
        <li>
          {$_.settings.resetLabel}
          <Button small light={$THEME == 'light'} on:click={reset}>
            {$_.settings.resetButton}
          </Button>
        </li>
      </ul>
    </div>
  {/if}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'
  @import '../../../assets/sass/mixins'
  
  .settings
    position: relative

  .settings-toggle
    @include icon-button

  .settings-panel
    position: absolute
    top: 2.25rem
    left: -19.5rem
    width: 22rem
    padding: 1rem
    background-color: var(--background)
    color: $whiteish
    box-shadow: 0 0 0 1px rgba(#fff, .1), .25rem .25rem .5rem 0 rgba(var(--primary-rgb), .1)
    border-radius: .5rem
    z-index: 20
    transition: all .4s ease

    .title
      color: #fff
      font-size: 1.25rem
      font-weight: 600

    ul > *
      &:not(:first-child)
        padding-top: 1rem

      &:not(:last-child)
        padding-bottom: 1rem
        border-bottom: 1px solid rgba(#fff, .1)

    ul li
      display: flex
      justify-content: space-between
      align-items: center

    .tail
      position: absolute
      top: -9px
      right: 14px
      width: 1.5rem
      fill: var(--background)
      transition: all .4s ease

  :global([data-theme="light"])
    .settings-toggle
      color: $blackish

    .settings-panel
      background-color: var(--primary)

      .tail
        fill: var(--primary)

  :global([data-dyslexia-mode="true"])
    .settings-panel
      width: 24rem
      left: -21.5rem

  @media screen and (max-width: 768px)
    .settings-panel,
    :global([data-dyslexia-mode="true"]) .settings-panel
      position: fixed
      left: 1rem
      top: 4rem
      width: calc(100% - 2rem)

      .tail
        right: 6.7rem

    .is-desktop-only
      display: none !important
</style>
