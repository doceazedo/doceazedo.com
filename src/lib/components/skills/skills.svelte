<script lang="ts">
  import { SectionTitle, Section } from '$lib/components';

  type Skills = {
    icon: any;
    name: string;
  };

  export let skills: Skills[][], title: string, paragraph: string[];
</script>

<Section>
  <SectionTitle {title} {paragraph} />

  {#each skills as row}
    <ul>
      {#each row as skill}
        <li>
          <svelte:component this={skill.icon} />
          <p>{@html skill.name}</p>
        </li>
      {/each}
    </ul>
  {/each}
</Section>

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  ul
    display: flex
    justify-content: center

    li
      display: flex
      flex-direction: column
      align-items: center
      width: 16.666%
      cursor: default

      :global(svg),
      p
        transition: all .2s ease

      :global(svg)
        height: 4rem
        width: 4rem
        user-select: none
        opacity: .5
        pointer-events: none

      p
        opacity: 0

      :global(small)
        opacity: .75

      &:hover
        :global(svg),
        p
          opacity: 1

        p
          transform: translateY(.75rem)

    + ul
      margin-top: 3rem

  @media screen and (max-width: 768px)
    ul
      + ul
        margin-top: 2rem !important

      :global(svg)
        height: 2rem !important
        width: 2rem !important

      p
        display: none !important
</style>
