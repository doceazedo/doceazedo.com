<script lang="ts">
  import Icon from '@iconify/svelte';
  import { LANG } from '$lib/stores';
  import { PushpinIcon } from '$lib/components/icons';
  import { readableDate } from '$lib/utils';
  import type { Post } from '$lib/modules/posts';

  export let posts: Post[] = [],
    regular = false;

  const background = (slug: string) =>
    `linear-gradient(to bottom, rgba(7, 2, 18, 0), rgba(7, 2, 18, .75)), url('/img/thumbnails/${slug}.jpg')`;
</script>

<div class="articles" class:regular>
  {#each posts as post}
    <a href="/blog/{post.slug}" class="article" style="background-image:{background(post.slug)}">
      <h1 class="title">{post.title}</h1>
      <div class="date">{$LANG.posted} {readableDate(post.date, $LANG.code)}</div>
      <div class="tags">
        {#if post.pinned}
          <div class="pin">
            <PushpinIcon />
          </div>
        {/if}
        {#each post.tags as tag}
          <a href="/blog/?category={tag}">#{tag}</a>
        {/each}
      </div>
    </a>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .articles
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-template-rows: 20rem 24rem
    grid-column-gap: 1.75rem
    grid-row-gap: 1.75rem
    width: 100%

    &.regular
      grid-auto-rows: 24rem
      grid-template-rows: none

      .article:first-child
        grid-area: unset

    .article
      display: flex
      flex-direction: column
      justify-content: flex-end
      gap: .75rem
      padding: 1.75rem
      border-radius: 1rem
      background-color: rgba(#fff, .1)
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      transition: all .2s ease

      &:first-child
        grid-area: 1 / 1 / 2 / 3

      &:hover
        transform: translateY(-.25rem)

      .title
        font-size: 1.5rem
        font-weight: 600

      .date
        color: $whiteish

      .tags
        display: flex
        gap: .5rem

        >*
          padding: .375rem
          background-color: rgba(#fff, .1)
          border-radius: .25rem
          color: $whiteish

        a
          transition: all .2s ease

          &:hover
            background-color: $primary
            transform: translateY(-2px)

        .pin
          display: flex
          justify-content: center
          align-items: center
          width: 2rem
          height: 2rem
          background-color: $primary

          :global(svg)
            height: 1.5rem
            width: 1.5rem

  @media screen and (max-width: 768px)
    .articles
      display: flex
      flex-direction: column

      .article
        gap: .5rem
        min-height: 14rem
        padding: 1rem

        .title
          font-size: 1.3rem
</style>
