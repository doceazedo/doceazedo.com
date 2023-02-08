<script lang="ts">
  import { browser } from '$app/environment';
  import { VomitingEmoji } from '$lib/components/icons';
  import type { SimpleIcon } from 'simple-icons';

  export let icon: SimpleIcon;

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

  const copyIcon = (icon: string) => {
    if (!browser) return;
    navigator.clipboard.writeText(`!icone ${icon}`);
  };
</script>

{#if icon}
  <li
    class="icon-item"
    style="--color:#{icon.hex}"
    on:click={createRipple}
    on:click={() => copyIcon(icon.slug)}
    on:click
    on:keyup
    on:keydown
  >
    {#if icon.slug == 'react'}
      <VomitingEmoji />
    {:else}
      {@html icon.svg}
    {/if}
    <span>{icon.slug}</span>
  </li>
{/if}

<style lang="sass">
  .icon-item
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

  @keyframes ripple
    to
      transform: scale(4)
      opacity: 0
</style>
