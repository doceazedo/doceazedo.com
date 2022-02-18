/** @type {import('@sveltejs/kit').Config} */

import sveltePreprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

const config = {
  preprocess: sveltePreprocess(),
	kit: {
    adapter: vercel(),
	},
};

export default config;
