<script lang="ts">
  import { browser } from '$app/environment';

  import { LANG } from '$lib/stores';
  import { ProjectButtons } from '.';
  import type { Project } from './projects.types';

  export let items: Project[];

  let fade = true;
  const handleScroll = (e) =>
    (fade = browser && e.target.scrollLeft + document.body.offsetWidth < e.target.scrollWidth - 16);
</script>

<div class="projects-wrapper">
  <ul class="projects" on:scroll={handleScroll} class:fade>
    {#each items as item}
      <li class="item">
        <h1>{item.title}</h1>
        <img src="/img/projects/{item.id}.{item.imageFormat || 'webp'}" alt="" />
        <ProjectButtons {item} />
        <p>{$LANG.projects.details?.[item.id]}</p>
      </li>
    {/each}
  </ul>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  .projects
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-template-rows: auto
    grid-column-gap: 1rem
    grid-row-gap: 1rem

    .item
      display: flex
      flex-direction: column
      align-items: center
      gap: 1rem
      padding: 1rem
      border-radius: 1rem
      background-color: rgba(#fff, .1)
      box-shadow: inset 0 0 0 1px rgba(#fff, .1)

      h1
        font-size: 1.5rem
        font-weight: 600

      p
        text-align: center
        color: $whiteish

      img
        height: 6rem

  @media screen and (max-width: 768px)
    .projects-wrapper
      position: relative
      margin-left: -1rem
      width: calc(100% + 2rem)

    .projects
      display: flex
      gap: 1rem
      width: 100%
      padding: 0 1rem
      overflow-x: scroll

      &::before
        position: absolute
        top: 0
        right: 0
        content: ''
        width: 5rem
        height: 100%
        background-image: linear-gradient(to right, rgba($background, 0) , $background)
        transition: all .2s ease
        pointer-events: none

      &:not(.fade)::before
        opacity: 0

      &::-webkit-scrollbar
        height: 0

      .item
        width: 17.5rem
        flex-shrink: 0
</style>
