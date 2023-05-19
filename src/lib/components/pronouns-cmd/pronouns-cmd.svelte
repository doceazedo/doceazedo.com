<script>
  import toast from 'svelte-french-toast';
  import { browser } from '$app/environment';
  import _ from '$lib/lang';
  import { toastTheme } from '$lib/utils/toast';
  import { Button } from '$lib/components/button';
  import { Select } from '$lib/components/input';
  import { ClipboardIcon } from '$lib/components/icons';

  const pronouns = ['ela', 'ele', 'elu'];
  const primaryPronounsMap = new Map(pronouns.map((x) => [x, x]));
  const secondaryPronounsMap = new Map(pronouns.map((x) => [`d${x}`, `d${x}`]));

  let primaryPronouns = 'ela';
  $: secondaryPronouns = `d${primaryPronouns}`;

  const copyCommand = () => {
    if (!browser) return;
    navigator.clipboard.writeText(`!pronomes ${primaryPronouns}/${secondaryPronouns}`);
    toast.success($_.streams.icons.copied, toastTheme);
  };
</script>

<div class="pronouns-wrapper">
  <div class="pronouns-cmd">
    <span>!{$_.streams.pronouns.command}</span>
    <Select small bind:value={primaryPronouns} options={primaryPronounsMap} />
    <span>/</span>
    <Select small bind:value={secondaryPronouns} options={secondaryPronounsMap} />
  </div>
  <Button medium on:click={copyCommand}>
    <ClipboardIcon />
    {$_.streams.pronouns.copy}
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
    border-radius: .5rem
    padding: .75rem 1.25rem

  @media screen and (max-width: 768px)
    .pronouns-wrapper
      flex-direction: column
      width: fit-content
</style>
