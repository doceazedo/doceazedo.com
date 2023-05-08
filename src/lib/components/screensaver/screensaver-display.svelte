<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { BrandDoceAzedo } from '$lib/components';

  const speed = 2;

  let x = 0;
  let y = 0;
  let dirX = 1;
  let dirY = 1;
  let logoEl: HTMLDivElement;

  const pallete = ['#6930C3', '#FBB454', '#F637EC', '#FAEA48', '#3EC70B', '#00D7FF', '#FF1700'];
  let color = pallete[0];
  let prevColorIndex = 0;

  onMount(() => {
    if (!browser) return;

    const animate = () => {
      const logoWidth = logoEl.clientWidth;
      const logoHeight = logoEl.clientHeight;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      if (y + logoHeight >= screenHeight || y < 0) {
        dirY *= -1;
        color = getRandomColor();
      }
      if (x + logoWidth >= screenWidth || x < 0) {
        dirX *= -1;
        color = getRandomColor();
      }
      x += dirX * speed;
      y += dirY * speed;
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  });

  const getRandomColor = () => {
    const currentPallete = [...pallete];
    currentPallete.splice(prevColorIndex, 1);
    const colorIndex = Math.floor(Math.random() * currentPallete.length);
    prevColorIndex = colorIndex < prevColorIndex ? colorIndex : colorIndex + 1;
    return currentPallete[colorIndex];
  };
</script>

<div class="screensaver" transition:fade={{ duration: 200 }} on:mousemove>
  <div class="logo" bind:this={logoEl} style="left:{x}px;top:{y}px;--color:{color}">
    <BrandDoceAzedo enableTransitions={false} {color} />
  </div>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .screensaver
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 10
    background-color: rgba($background, .75)
    backdrop-filter: blur(8rem)
    -webkit-backdrop-filter: blur(8rem)

    .logo
      position: fixed

      :global(svg)
        height: 5rem

      &::before
        content: ''
        position: absolute
        width: 100%
        height: 100%
        background-color: var(--color)
        opacity: .1
        border-radius: 50%
        filter: blur(1rem)
        transform: scaleX(1.25) scaleY(1.5)
        pointer-events: none
</style>
