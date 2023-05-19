<script lang="ts">
  import { LANG } from '$lib/stores';
  import type { Talk } from '.';

  export let talk: Talk;
</script>

<p class="pretitle">{$LANG.talks.resourcesPretitle}</p>
<div class="title">
  {talk.title}
</div>
<div class="content">
  <ul>
    {#each talk.resources as resource}
      <li>
        {#if !!resource.link}
          <a href={resource.link.url} target="_blank">{resource.link.label}</a>
        {:else if !!resource.html}
          {@html resource.html}
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="sass">
  @import '../../../assets/sass/vars'

  .title
    font-size: 2rem
    margin-bottom: 4rem
    font-weight: 700

  .pretitle
    margin: 4rem 0 .5rem 0
    font-size: 1.25rem
    font-weight: 400
    color: $whiteish

  @media screen and (max-width: 768px)
    .title
      font-size: 1.5rem

  :global([data-dyslexia-mode="true"])
    .title
      line-height: 1.75
</style>
