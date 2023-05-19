import { writable } from 'svelte/store';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned?: boolean;
};

export const POSTS = writable<Post[]>([]);
