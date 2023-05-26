<script lang="ts">
  export let title: string;
  export let subtitle = '';
</script>

<h1>{title}</h1>
{#if $$slots.default || subtitle}
  <p class="content">
    <slot>
      <span>{@html subtitle}</span>
    </slot>
  </p>
{/if}

<style lang="sass">
  @import '../../../assets/sass/vars.sass'

  h1
    font-size: 2.25rem
    font-weight: 700
    margin-top: 4rem
    margin-bottom: 1rem

  p
    font-family: var(--font-secondary)
    font-size: 1.25rem
    line-height: 1.25
    color: $whiteish
    margin-bottom: 4rem

  @media screen and (max-width: 768px)
    h1
      font-size: 2rem
      margin-top: 2.5rem

    p
      margin-bottom: 2.5rem

  :global([data-dyslexia-mode="true"])
    p
      line-height: 1.5
</style>
