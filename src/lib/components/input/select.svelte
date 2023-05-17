<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ExpandIcon } from '$lib/components/icons';
  import { clickOutside } from '$lib/utils';
  import { COLOR_THEMES } from '$lib/stores';

  export let options: Map<string, string>;
  export let value: string;
  export let hasColorPreview = false;
  export let small = false;

  let isOpen = false;

  const toggleOptions = () => (isOpen = !isOpen);

  const pick = (newValue: string) => {
    value = newValue;
    isOpen = false;
  };
</script>

<div class="select" use:clickOutside={() => (isOpen = false)} class:small>
  <button class="select-toggle" on:click={toggleOptions}>
    <span class="value">
      {#if hasColorPreview}
        <span class="color" />
      {/if}
      <span class="label">{options.get(value)}</span>
    </span>
    <span class="expand">
      <ExpandIcon />
    </span>
  </button>

  {#if isOpen}
    <div class="options" transition:fly={{ duration: 200, y: -8, easing: quintOut }}>
      {#each [...options] as option}
        <button class="option" on:click={() => pick(option[0])}>
          {#if hasColorPreview}
            <span class="color" style="background-color:#{$COLOR_THEMES[option[0]].primary}" />
          {/if}
          <span class="label">{option[1]}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .select
    position: relative

    &.small
      .select-toggle,
      .options
        width: 4rem

  .select-toggle
    display: flex
    align-items: center
    justify-content: space-between
    width: 8rem
    padding: .25rem .25rem .25rem .375rem
    background-color: rgba(var(--primary-rgb), .1)
    border-radius: .5rem
    border: 1px solid var(--primary)
    cursor: pointer
    transition: all .2s ease

    .value
      display: flex
      align-items: center
      gap: .25rem

      .color
        width: 1rem
        height: 1rem
        background-color: var(--primary)
        border-radius: .2rem
        transition: all .2s ease

    .expand
      display: flex
      width: .75rem
      height: .75rem
      color: $whiteish

  .options
    position: absolute
    display: flex
    flex-direction: column
    gap: .25rem
    width: 8rem
    top: 2.25rem
    left: 0
    padding: .14rem
    border-radius: .5rem
    background-color: var(--background)
    border: 1px solid var(--primary)
    z-index: 10
    transition: all .2s ease

    .option
      display: flex
      align-items: center
      gap: .25rem
      width: 100%
      padding: .25rem
      background: none
      border: none
      border-radius: .3rem
      cursor: pointer
      transition: color .2s ease

      .color
        width: 1rem
        height: 1rem
        border-radius: .2rem
        transition: all .2s ease

      &:hover
        background-color: rgba(#fff, .1)

  :global([data-theme="light"])
    .select-toggle
      background-color: #fff
      color: #000
      border-color: rgba(#fff, .1)

      .expand
        color: rgba(#000, .5)

    .options
      background-color: #fff

      .option
        color: #000

        &:hover
          background-color: rgba(var(--background-rgb), .1)

  :global([data-dyslexia-mode="true"])
    .select-toggle,
    .options
      width: 9rem

    .options
      top: 3rem

    .label
      margin-top: -.25rem

  @media screen and (max-width: 768px)
    .select-toggle,
    .options
      width: 9rem

      .color
        width: 1.25rem !important
        height: 1.25rem !important

    .select-toggle,
    .option
      gap: .375rem !important
      padding: .375rem !important

    .options
      gap: 0
      padding: .14rem 0
      top: 2.5rem

      .option:hover
        background: none
</style>
