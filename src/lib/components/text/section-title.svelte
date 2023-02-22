<script lang="ts">
  import { ArrowRightIcon } from '$lib/components/icons';

  export let title: string,
    paragraph: string[] = null,
    actionLabel: string = null,
    actionHref: string = null;
</script>

<h1>
  {title}
  {#if actionLabel && actionHref}
    <a href={actionHref}>{actionLabel} <ArrowRightIcon /></a>
  {/if}
</h1>

{#if paragraph}
  <p>
    {paragraph.join(' ')}
  </p>
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  h1
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 1.75rem
    font-weight: 600
    padding-bottom: .25rem
    margin-bottom: 1.75rem
    border-bottom: $hr

    a
      display: flex
      align-items: center
      gap: .25rem
      font-size: 1rem
      font-weight: 400
      color: $whiteish
      transition: all .2s ease

      &:hover
        color: #fff
        transform: translateY(-2px)

      :global(svg)
        height: 1.25rem
        width: 1.25rem
        color: $primary

  p
    font-family: $font-secondary
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
    margin-top: -1rem
    margin-bottom: 3rem

  :global([data-theme="light"])
    h1
      border-bottom: $hr-light

    h1 a,
    p
      color: $blackish

  @media screen and (max-width: 768px)
    h1
      font-size: 1.5rem
      gap: 1rem

      a
        flex-shrink: 0
</style>
