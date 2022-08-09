<script lang="ts">
  import { Topbar } from '$lib/components';
  import { LANG } from '$lib/stores';

  $: content = $LANG.topbar.content.split('%s');

  export let ref: string;
</script>

{#if ref == 'lucasfernandes'}
  <Topbar>
    {content[0]}
    <b>{$LANG.topbar.highlight}</b>{content[1]}
    <a href="/blog/who-is-doceazedo">{$LANG.topbar.readMore}</a>
  </Topbar>
{/if}
