<script>
  import toast from 'svelte-french-toast';
  import { browser } from '$app/environment';
  import { LANG } from '$lib/stores';
  import { toastTheme } from '$lib/utils/toast';
  import { Button } from '$lib/components/button';
  import { ClipboardIcon } from '$lib/components/icons';

  const pronouns = ['ela', 'ele', 'elu'];
  let hasPickedSecondaryPronouns = false;
  let primaryPronouns = 'ela';
  $: secondaryPronouns = !hasPickedSecondaryPronouns ? primaryPronouns : 'ela';

  const copyCommand = () => {
    if (!browser) return;
    navigator.clipboard.writeText(`!pronomes ${primaryPronouns}/d${secondaryPronouns}`);
    toast.success($LANG.streams.icons.copied, toastTheme);
  };
</script>

<div class="pronouns-wrapper">
  <div class="pronouns-cmd">
    <span>!{$LANG.streams.pronouns.command}</span>
    <select bind:value={primaryPronouns}>
      {#each pronouns as pronoun}
        <option value={pronoun}>{pronoun}</option>
      {/each}
    </select>
    <span>/</span>
    <select bind:value={secondaryPronouns} on:change={() => (hasPickedSecondaryPronouns = true)}>
      {#each pronouns as pronoun}
        <option value={pronoun}>d{pronoun}</option>
      {/each}
    </select>
  </div>
  <Button medium on:click={copyCommand}>
    <ClipboardIcon />
    {$LANG.streams.pronouns.copy}
  </Button>
</div>

<style lang="sass">
  .pronouns-wrapper
    display: flex
    gap: 1rem
    margin-top: 1rem

  .pronouns-cmd
    display: flex
    align-items: center
    gap: .5rem
    width: fit-content
    background-color: rgba(#fff, .1)
    border-radius: .75rem
    padding: .75rem 1.25rem

    select
      background-color: transparent
      color: #fff
      border: 1px solid var(--primary)
      padding: .25rem
      border-radius: .5rem
</style>
