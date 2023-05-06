import { redirect } from '@sveltejs/kit';

const MASTODON_URL = 'https://svelte.gay/@doceazedo';

export const GET = async () => {
  throw redirect(302, MASTODON_URL);
};
