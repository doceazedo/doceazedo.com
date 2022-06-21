<script lang="ts">
  import { Topbar } from '$lib/components';

  const content = `"I'm sorry, the old Lucas can't come to the phone right now. Why? Oh 'cause they're <b>dead</b>!" I've fully embraced my DoceAzedo nickname as a brand that can represent not only me personally but also my work. <a href="/blog/who-is-doceazedo">Learn more about it.</a>`;

  export let ref: string;
</script>

{#if ref == 'lucasfernandes'}
  <Topbar>
    {@html content}
  </Topbar>
{/if}
