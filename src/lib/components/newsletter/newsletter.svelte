<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import LANG from '$lib/lang';
  import { THEME } from '$lib/stores';
  import { Button } from '$lib/components';
  import { subscribeToNewsletter } from '$lib/modules/newsletter';

  let email = '';
  let loading = false;
  let success = false;
  let showMessage = false;

  const handleSubmit = async () => {
    if (loading) return;

    loading = true;
    showMessage = false;

    try {
      await subscribeToNewsletter(email, $LANG.code);
      success = true;
    } catch (error) {
      success = false;
    }

    loading = false;
    showMessage = true;
  };
</script>

<section class="newsletter">
  <div class="newsletter-content">
    <h1 class="title">{$LANG.newsletter.title}</h1>
    <p class="subtitle">{$LANG.newsletter.paragraph}</p>
    <form class="form" class:disabled={loading} on:submit|preventDefault={handleSubmit}>
      <input
        type="email"
        bind:value={email}
        disabled={loading}
        placeholder={$LANG.newsletter.placeholder}
      />
      <Button type="submit" disabled={loading} light={$THEME == 'light'}>
        {$LANG.newsletter.subscribe}
      </Button>
    </form>
    {#if showMessage}
      <p
        class="message"
        class:success
        class:error={!success}
        transition:slide={{ duration: 200, easing: quintOut }}
      >
        {#if success}
          {$LANG.newsletter.messages.success}
        {:else}
          {@html $LANG.newsletter.messages.error.replace(
            '%s',
            `<a href="https://github.com/doceazedo/doceazedo.com/issues" target="_blank">${$LANG.newsletter.messages.openIssue}</a>`
          )}
        {/if}
      </p>
    {/if}
  </div>
</section>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .newsletter
    display: flex
    justify-content: center
    text-align: center
    padding: 3rem
    background-color: rgba(var(--primary-rgb), .1)
    border: 1px solid var(--primary)
    border-radius: 1rem

    &-content
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      max-width: 600px
      font-family: var(--font-secondary)
      font-size: 1.25rem
      line-height: 1.25
      color: $whiteish

      .title
        font-family: var(--font-primary)
        font-size: 1.75rem
        font-weight: 600
        color: #fff
        margin-bottom: .75rem

      .subtitle
        margin-bottom: 2rem

      .message 
        margin-top: 1rem
        font-size: 1rem

        &.success
          color: #4ade80

        &.error
          color: #ef4444

        :global(a)
          text-decoration: underline

  form
    display: flex
    gap: 1rem
    width: 100%
    max-width: 450px
    
    input
      flex-grow: 1
      height: 3.5rem
      padding: 0 1rem
      background-color: rgba(#fff, .1)
      border-radius: .5rem
      border: none
      outline: none
      transition: all .2s ease

      &::placeholder
        color: rgba(#fff, .5)

      &:focus
        background-color: rgba(#fff, .08)
        box-shadow: 0 0 0 1px var(--primary), 0 0 0 .25rem rgba(var(--primary-rgb), .25)

      &:disabled
        opacity: .5

  :global([data-theme="light"])
    .newsletter
      background-color: var(--primary)

  @media screen and (max-width: 768px)
    .newsletter
      padding: 2rem

      form
        flex-direction: column
</style>
