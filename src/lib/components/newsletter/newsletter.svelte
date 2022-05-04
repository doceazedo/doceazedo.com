<script lang="ts">
  import Icon from '@iconify/svelte';
  import { LANG } from '$lib/stores';
  import { SectionTitle, Button } from '$lib/components';
</script>

<section>
  <SectionTitle title={$LANG.newsletter.title} paragraph={[`${$LANG.newsletter.paragraph}`]} />

  <form class="form" on:submit|preventDefault>
    <Button href="/feed.xml" target="_blank" outline>
      <Icon icon="ri:rss-line" />
      {$LANG.newsletter.subscribeRSS}
    </Button>
    <span>{$LANG.newsletter.subscribeNewsletter}</span>
    <div class="newsletter" style="--soon:'{$LANG.newsletter.soon}'">
      <input disabled type="text" placeholder="youremail@example.com" />
      <Button>{$LANG.newsletter.subscribeButton}</Button>
    </div>
  </form>
</section>

<style lang="sass">
  @import '../../../assets/sass/vars'

  form
    display: flex
    align-items: center
    
    span
      margin: 0 1rem
      color: $whiteish

    .newsletter
      position: relative
      display: flex
      flex-grow: 1
      cursor: not-allowed

      &::before
        content: var(--soon)
        position: absolute
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        height: 100%
        font-size: 1.25rem
        font-weight: 600
        border-radius: .5rem
        opacity: 0
        transition: all .2s ease

      &:hover
        &::before
          opacity: 1

        input,
        input + :global(.button)
          opacity: .25

      input,
      input + :global(.button)
        cursor: not-allowed
        transition: all .2s ease

      input
        width: 100%
        height: 3.5rem
        padding: 0 1rem
        background-color: rgba(#fff, .1)
        border: 1px solid $primary
        border-right: none
        border-top-left-radius: .5rem
        border-bottom-left-radius: .5rem
        outline: none

        + :global(.button)
          border-top-left-radius: 0
          border-bottom-left-radius: 0
          transform: none
</style>
