import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { TALKS } from '$lib/modules/talks';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const talks = get(TALKS);
  const talk = talks.find((talk) => talk.slug == params.slug);
  if (!talk) throw error(404);

  return {
    talk
  };
};

export const prerender = 'auto';
