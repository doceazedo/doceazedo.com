<script lang="ts" context="module">
  import { get } from 'svelte/store';
  import { TALKS } from '$lib/modules/talks';
  import type { Load } from '@sveltejs/kit';
  import type { Talk } from '$lib/modules/talks';

  export const load: Load = ({ params }) => {
    const talks = get(TALKS);
    const talk = talks.find((talk) => talk.slug == params.slug);
    if (!talk) return { status: 404 };

    return {
      props: {
        talk
      }
    };
  };

  export const prerender = true;
</script>

<script lang="ts">
  import { TalkDetails } from '$lib/components';

  export let talk: Talk;
</script>

<TalkDetails {talk} />
