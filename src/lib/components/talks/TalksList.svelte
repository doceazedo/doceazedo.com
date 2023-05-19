<script lang="ts">
  import dayjs from 'dayjs';
  import { Buttons, Button } from '$lib/components';
  import _ from '$lib/lang';
  import { TALKS } from '.';

  const getFullDate = (date: Date) => dayjs(date).format('DD/MM/YYYY');
</script>

<div class="talks">
  {#each $TALKS as talk}
    <div class="talk">
      <div class="thumbnail">
        <figure
          class="preview"
          style="background-image:url(/img/talks/thumbnails/{talk.slug}.jpg)"
        />
        <a class="promoter" href={talk.organizer.url} target="_blank" rel="noreferrer">
          <figure style="background-image:url(/img/talks/promoters/{talk.organizer.slug}.jpg)" />
        </a>
      </div>
      <div class="details">
        <h1 class="title">{talk.title}</h1>
        <p class="promoter">{getFullDate(talk.date)} {$_.talks.at} {talk.organizer.name}</p>
        <Buttons small>
          <Button small href={talk.replay} target="_blank">{$_.talks.watch}</Button>
          <Button small outline href="/talks/{talk.slug}">{$_.talks.resources}</Button>
        </Buttons>
      </div>
    </div>
  {/each}
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .talks
    display: flex
    flex-direction: column
    gap: 3rem

  .talk
    display: flex
    gap: 1.75rem
    border-radius: .5rem

    .thumbnail
      position: relative
      margin: 0 1.25rem 1rem 0

      .preview
        width: 18rem
        aspect-ratio: 16 / 9
        border-radius: 1rem
        background-position: center
        background-repeat: no-repeat
        background-size: cover

      .promoter
        position: absolute
        bottom: -1.5rem
        right: -1.5rem
        display: flex
        width: 4rem
        height: 4rem
        border: .25rem solid #070212
        border-radius: 1rem
        overflow: hidden
        transition: transform .2s ease, border .6s ease

        &:hover
          transform: translateY(-.25rem)

        figure
          width: 100%
          height: 100%
          background-position: center
          background-repeat: no-repeat
          background-size: cover

    .details
      display: flex
      flex-direction: column
      gap: .75rem

      .title
        font-size: 1.5rem
        font-weight: 600

      .promoter
        font-family: var(--font-secondary)
        font-size: 1.25rem
        color: $whiteish

  :global([data-theme="light"])
    .talk .thumbnail .promoter
      border-color: #fff

  @media screen and (max-width: 768px)
    .talk
      flex-direction: column
      align-items: center

      &:hover
        background-color: transparent
        box-shadow: none

      .preview
        width: 16rem

      .details
        text-align: center

      :global(.buttons)
        justify-content: center

  :global([data-dyslexia-mode="true"])
    .talk .title
      line-height: 1.5
</style>
