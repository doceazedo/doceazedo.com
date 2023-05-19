<script lang="ts">
  import Topbar from './Topbar.svelte';
  import _ from '$lib/lang';

  $: content = $_.topbar.content.split('%s');

  export let ref: string | null;
</script>

{#if ref == 'lucasfernandes'}
  <Topbar>
    {content[0]}
    <b>{$_.topbar.highlight}</b>{content[1]}
    <a href="/blog/who-is-doceazedo">{$_.topbar.readMore}</a>
  </Topbar>
{/if}
