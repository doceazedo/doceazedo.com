<script>
  import PageTitle from '../components/page-title.svelte';
  import Button from '../components/button.svelte';
  import { MailIcon, SendIcon } from 'svelte-feather-icons';
</script>

<div class="contact">
  <PageTitle
    title="Get in touch"
    paragraph="If you want to hire me, talk about a project or just chat with no commitment, let's do it!" />

  <div class="buttons">
    <Button href="mailto:me@lucasfernandes.com.br" outline><MailIcon size="24" fill="#fff" /> me@lucasfernandes.com.br</Button>
    <Button href="https://t.me/eightavocados" outline><SendIcon size="24" fill="#fff" /> @eightavocados on Telegram</Button>
  </div>
</div>

<svelte:head>
  <title>Lucas Fernandes</title>
</svelte:head>

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