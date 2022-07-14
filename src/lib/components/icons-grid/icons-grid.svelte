<script lang="ts">
  import { Input } from '$lib/components/input';
  import { SearchIcon, VomitingEmoji } from '$lib/components/icons';
  import type { SimpleIcon } from 'simple-icons';

  export let icons: SimpleIcon[] = [],
    search: (q: string) => void,
    copy: (slug: string) => void;

  const createRipple = (event: MouseEvent) => {
    const button = event.currentTarget as HTMLElement;
    const btnRect = button.getBoundingClientRect();

    const circle = document.createElement('span');
    const diameter = Math.max(btnRect.width, btnRect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  let query = '';

  $: query, search(query);
</script>

<div class="search">
  <Input bind:value={query} placeholder="Pesquisa..." />
  <SearchIcon />
</div>

<ul class="icons-grid" id="icons">
  {#each icons as icon}
    <li style="--color:#{icon.hex}" on:click={createRipple} on:click={() => copy(icon.slug)}>
      {#if icon.slug == 'react'}
        <VomitingEmoji />
      {:else}
        {@html icon.svg}
      {/if}
      <span>{icon.slug}</span>
    </li>
  {/each}
</ul>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .search
    position: relative
    margin: 2rem 0

    :global(svg)
      position: absolute
      top: .75rem
      right: .75rem
      width: 1.5rem
      height: 1.5rem
      pointer-events: none
      transition: all .2s ease

    &:focus-within :global(svg)
      color: $primary-light

  .icons-grid
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-column-gap: 1rem
    grid-row-gap: 1rem
    grid-auto-rows: min-content
    max-height: 29rem
    padding-right: 1rem
    overflow: auto

    li
      position: relative
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      gap: .5rem
      width: 100%
      height: 5rem
      background-color: rgba(#fff, .1)
      padding: .5rem
      border-radius: .75rem
      cursor: pointer
      overflow: hidden
      transition: all .2s ease

      &:hover
        background-color: var(--color)

      :global(.ripple)
        position: absolute
        border-radius: 50%
        transform: scale(0)
        animation: ripple .6s linear
        background-color: rgba(#fff, .2)

      span
        width: 100%
        text-align: center
        text-overflow: ellipsis
        overflow: hidden

      :global(svg)
        flex-shrink: 0
        height: 1.5rem
        fill: #fff

    &::-webkit-scrollbar
      width: .5rem

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb
      background-color: rgba(#fff, .1)
      border-radius: 25px

    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(#fff, .2)

  @keyframes ripple
    to
      transform: scale(4)
      opacity: 0
</style>
