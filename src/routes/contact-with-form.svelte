<script lang="ts">
  import PageTitle from '../components/page-title.svelte';
  import Button from '../components/button.svelte';
  import { MailIcon, SendIcon } from 'svelte-feather-icons';
</script>

<div class="contact">
  <div>
    <PageTitle
      title="Get in touch"
      paragraph="If you want to hire me, talk about a project or just chat with no commitment, let's do it!"
    />
    <Button href="mailto:me@lucasfernandes.com.br" outline
      ><MailIcon size="24" /> me@lucasfernandes.com.br</Button
    >
    <Button href="https://t.me/eightavocados" outline
      ><SendIcon size="24" /> @eightavocados on Telegram</Button
    >
  </div>
  <div>cool form!</div>
</div>

<style lang="sass">
  .contact
    display: flex
    margin-top: 4rem

    div
      width: 50%

      &:first-child
        margin-right: 2rem
        margin-bottom: 4rem

        :global(.button:not(:last-child))
          margin-bottom: 2rem

      &:last-child
        padding: 2rem
        background-color:  rgba(255, 255, 255, .05)
</style>
