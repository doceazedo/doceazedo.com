import type { SvelteComponent } from 'svelte';

export type NavbarLink = {
  slug: string;
  icon: typeof SvelteComponent;
};
