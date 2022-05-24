<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error: status,
        message: error.message
      }
    };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { randomInRange } from '$lib/utils';
  import { Metadata } from '$lib/components';
  import PenguinImg from '../assets/img/club-penguin-cleaning.gif';
  import MarioDanceImg from '../assets/img/mario-dance.gif';
  import AmogusDanceImg from '../assets/img/amogus-dance.gif';
  import WalterWhiteImg from '../assets/img/walter-white.gif';
  import PolarBearImg from '../assets/img/polar-bear-cry.gif';
  import GmodErrorImg from '../assets/img/gmod-error.gif';

  export let error: number, message: string;

  const images = [
    PenguinImg,
    MarioDanceImg,
    AmogusDanceImg,
    WalterWhiteImg,
    PolarBearImg,
    GmodErrorImg
  ];
  let image: string;

  onMount(() => {
    console.error(`Error ${error}: ${message}`);
    const n = randomInRange(0, images.length);
    image = images[n];
  });
</script>

<Metadata />
<div class="container">
  <div class="info">
    <h1>{error}</h1>
    <h2 class="content">
      {#if error == 4044}
        This was probably a mistake.
      {:else}
        Something went wrong.
        <a href="https://github.com/doceazedo/lucasfernandes.com.br/issues" target="_blank">
          Open an issue?
        </a>
      {/if}
    </h2>
  </div>
  <img class="image" src={image} alt="" />
</div>

<style lang="sass">
  @import '../assets/sass/vars.sass'

  :global(html, body)
    height: 100%

  .container
    display: flex
    justify-content: space-between
    align-items: center
    margin: 8rem 0
  
    h1
      font-size: 3rem
      font-weight: 700

    h2
      font-size: 1.5rem

    img
      height: 8rem

  @media screen and (max-width: 768px)
    .container
      flex-direction: column
      gap: 2rem
      text-align: center
  
      h1
        font-size: 2rem

      h2
        font-size: 1rem

      img
        height: 6rem
</style>
