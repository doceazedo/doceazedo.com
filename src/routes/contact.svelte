<script lang="ts">
  import { LANG } from '$lib/stores';
  import { Buttons, Button, MailIcon, PageTitle, SendIcon } from '$lib/components';
  import { SEO } from '$lib/modules';
</script>

<svelte:head>
  <SEO path="/contact" />
</svelte:head>

<div class="contact">
  <PageTitle title={$LANG.contact.title} paragraph={$LANG.contact.paragraph} />

  <Buttons>
    <Button href="mailto:{$LANG.email}" outline>
      <MailIcon />
      {$LANG.email}
    </Button>
    <Button href="https://t.me/eightavocados" outline>
      <SendIcon />
      {$LANG.contact.telegramButton}
    </Button>
  </Buttons>
</div>

<style lang="sass">
  .contact
    display: flex
    flex-direction: column
    align-items: center
    margin: 4rem 0 8rem

  @media screen and (max-width: 768px)
    .contact
      text-align: center
      margin: 0 0 4rem
</style>
