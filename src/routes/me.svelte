<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Metadata, PageTitle } from '$lib/components';
  import meAtBeach from '../assets/img/me-beach.webp';
  import tattoo1 from '../assets/img/tattoo-1.webp';
  import tattoo2 from '../assets/img/tattoo-2.webp';
  import tattoo3 from '../assets/img/tattoo-3.webp';
</script>

<Metadata title={$LANG.navbar.me} />
<PageTitle title={$LANG.navbar.me} paragraph={$LANG.about.subtitle} />

<div class="content">
  <p>{@html $LANG.about.intro}</p>
  <img src={meAtBeach} alt="" />
  <p>{@html $LANG.about.factsIntro}</p>
  <ul>
    {#each $LANG.about.facts as fact}
      <li>{@html fact}</li>
    {/each}
  </ul>
  <h2>{@html $LANG.about.tattoosTitle}</h2>
  <div class="tattoos">
    <img src={tattoo1} alt="" />
    <img src={tattoo2} alt="" />
    <img src={tattoo3} alt="" />
  </div>
  {#each $LANG.about.tattoos as tattoo}
    <p>{@html tattoo}</p>
  {/each}
  <h2>{@html $LANG.about.keepInTouchTitle}</h2>
  <p>{@html $LANG.about.socialsIntro}</p>
  <ul>
    {#each $LANG.about.socials as social}
      <li>{@html social}</li>
    {/each}
  </ul>
  <p>{@html $LANG.about.livestream}</p>
  <p>{@html $LANG.about.nickname}</p>
  <h2>{@html $LANG.about.hardwareTitle}</h2>
  <ul>
    {#each $LANG.about.hardware as hardware}
      <li>{@html hardware}</li>
    {/each}
  </ul>
</div>

<style lang="sass">
  .tattoos
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 2rem
    margin-bottom: 2rem

    img
      margin-bottom: 0

  ul
    :global(span)
      color: #fff
    
    :global(small)
      font-size: .9rem

  @media screen and (max-width: 768px)
    .tattoos
      grid-column-gap: .5rem
      margin-bottom: 1.5rem
</style>
