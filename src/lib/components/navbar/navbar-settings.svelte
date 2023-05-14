<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { MoonIcon, SettingsIcon, SunIcon } from '$lib/components/icons';
  import { Button } from '$lib/components/button';
  import { Range, Select, Switch } from '$lib/components/input';
  import {
    COLOR_THEME,
    IS_ELEVATOR_FAST,
    LANG,
    READING_FONT_SIZE,
    READING_LINE_HEIGHT,
    READING_MAX_WIDTH,
    THEME,
    USE_DYSLEXIA_FONT
  } from '$lib/stores';
  import { clickOutside } from '$lib/utils';

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

  $: colorThemes = new Map([
    ['purple', $LANG.settings.themes['purple']],
    ['blue', $LANG.settings.themes['blue']],
    ['orange', $LANG.settings.themes['orange']],
    ['carmine', $LANG.settings.themes['carmine']],
    ['green', $LANG.settings.themes['green']]
  ]);

  const handleColorThemeChange = () => {
    console.log({ $COLOR_THEME });
  };

  const reset = () => {
    $THEME = 'dark';
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
      <svg class="tail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.05 3.72">
        <path d="M0 3.67 3.09.59a1.97 1.97 0 0 1 2.82 0l3.14 3.14L0 3.68Z" />
      </svg>
      <ul>
        <h1 class="title">{$LANG.settings.title}</h1>
        <li>
          {$LANG.settings.theme}
          <Switch
            on:click={switchTheme}
            active={$THEME === 'light'}
            iconOff={MoonIcon}
            iconOn={SunIcon}
          />
        </li>
        <li>
          {$LANG.settings.colorTheme}
          <Select
            bind:value={$COLOR_THEME}
            name="theme"
            options={colorThemes}
            on:change={handleColorThemeChange}
            disabled
          />
        </li>
        <li>
          {$LANG.settings.fontSize}
          <Range
            name="font-size"
            bind:value={$READING_FONT_SIZE}
            label={$LANG.settings.fontSizes[$READING_FONT_SIZE]}
            max={$LANG.settings.fontSizes.length - 1}
          />
        </li>
        <li>
          {$LANG.settings.readingWidth}
          <Range
            name="max-width"
            bind:value={$READING_MAX_WIDTH}
            label={readingWidths[$READING_MAX_WIDTH]}
            max={readingWidths.length - 1}
          />
        </li>
        <li>
          {$LANG.settings.lineHeight}
          <Range
            name="line-height"
            bind:value={$READING_LINE_HEIGHT}
            label={$LANG.settings.lineHeights[$READING_LINE_HEIGHT]}
            max={$LANG.settings.lineHeights.length - 1}
          />
        </li>
        <li>
          {$LANG.settings.dyslexiaFont}
          <Switch bind:active={$USE_DYSLEXIA_FONT} iconOff="Aa" iconOn="Aa" />
        </li>
        <li>
          {$LANG.settings.elevatorSpeed}
          <Switch bind:active={$IS_ELEVATOR_FAST} iconOff="🐌" iconOn="⚡" />
        </li>
        <li>
          {$LANG.settings.resetLabel}
          <Button small on:click={reset}>{$LANG.settings.resetButton}</Button>
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
    background-color: #150e2f
    color: $whiteish
    box-shadow: .25rem .25rem .5rem 0 rgba($primary, .2)
    border-radius: .5rem
    z-index: 20

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
      fill: #150e2f

  :global([data-theme="light"])
    .settings-toggle
      color: $blackish

  :global([data-dyslexia-mode="true"])
    .settings-panel
      width: 24rem
      left: -21.5rem
</style>
