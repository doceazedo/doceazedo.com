<script lang="ts">
  import { LANG, THEME } from '$lib/stores';
  import { Button } from '$lib/components/button';
  import { PicPayIcon } from '$lib/components/icons';

  const picpayUrl = 'https://app.picpay.com/user/doceazedo911';
</script>

<div class="cta">
  <div class="cta-sub">
    <h1 class="title">{$LANG.streams.subscribe.title}</h1>
    <p>{$LANG.streams.subscribe.paragraph}</p>
    <div class="content">
      <ul>
        {#each $LANG.streams.subscribe.benefits as benefit}
          <li>{benefit}</li>
        {/each}
      </ul>
    </div>
    <div class="buttons">
      <Button href="/live/prime" medium light={$THEME == 'light'}
        >{$LANG.streams.subscribe.prime}</Button
      >
      <Button
        href="https://twitch.tv/subs/doceazedo911"
        target="_blank"
        medium
        outline
        light={$THEME == 'light'}
      >
        {$LANG.streams.subscribe.sub}
      </Button>
    </div>
  </div>
  <a href={picpayUrl} target="_blank" class="cta-donate">
    <div class="icon">
      <PicPayIcon />
    </div>
    <h1 class="title">{$LANG.streams.donate.title}</h1>
    <p>{$LANG.streams.donate.paragraph}</p>
  </a>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  $picpay: #11c76f
  
  .cta
    display: flex
    gap: 1rem

    &-sub,
    &-donate
      display: flex
      flex-direction: column
      gap: .75rem
      padding: 1rem
      border-radius: 1rem

    &-sub
      flex-grow: 1
      background-color: rgba(#fff, .1)
      
      p
        color: $whiteish

      ul
        margin-top: 0
        line-height: 1.25

      .buttons
        display: flex
        align-items: center
        gap: .75rem
        margin-top: auto

    &-donate
      justify-content: center
      align-items: center
      text-align: center
      height: 16rem
      aspect-ratio: 5 / 4
      background-color: rgba($picpay, .1)
      border: 1px solid $picpay
      transition: all .2s ease

      &:hover
        transform: translateY(-.25rem)

      .icon
        display: flex
        justify-content: center
        align-items: center
        padding: 1rem
        background-color: $picpay
        border-radius: 1rem

      :global(svg)
        width: 3rem
        height: 3rem
        color: #fff

      p
        color: $whiteish

  .title
    font-size: 1.5rem
    font-weight: 600

  :global([data-theme="light"])
    .cta-sub
      background-color: $primary
      color: #fff

      li
        color: $whiteish

      p,
      li::marker
        color: #fff

    .cta-donate
      h1
        color: #000

      p
        color: $blackish

  @media screen and (max-width: 768px)
    .cta
      flex-direction: column

      .buttons
        flex-direction: column
        align-items: flex-start
</style>
