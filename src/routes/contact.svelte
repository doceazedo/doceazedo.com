<script>
  import { lang } from '../stores';
  import PageTitle from '../components/page-title.svelte';
  import Button from '../components/button.svelte';
  import SEO from '../components/seo.svelte';
  import { MailIcon, SendIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
  <SEO path="/contact" />
</svelte:head>

<div class="contact">
  <PageTitle
    title={$lang.contact.title}
    paragraph={$lang.contact.paragraph} />

  <div class="buttons">
    <Button href="mailto:{$lang.email}" outline><MailIcon size="24" fill="#fff" /> {$lang.email}</Button>
    <Button href="https://t.me/eightavocados" outline><SendIcon size="24" fill="#fff" /> {$lang.contact.telegramButton}</Button>
  </div>
</div>

<style type="text/sass">
  .contact
    display: flex
    flex-direction: column
    align-items: center
    margin: 4rem 0 8rem

  @media screen and (max-width: 768px)
    .contact
      text-align: center
      margin: 0 0 4rem

    .buttons
      flex-direction: column
      align-items: center

      :global(.button:not(:last-child))
        margin-right: 0
        margin-bottom: 1rem
</style>