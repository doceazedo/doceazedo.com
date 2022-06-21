import { writable } from 'svelte/store';
import type { Post } from '.';

export const POSTS = writable<Post[]>([]);
