import { writable } from 'svelte/store';
import type { SimpleIcon } from 'simple-icons';

export const ICONS = writable<SimpleIcon[]>([]);

export const FILTERED_ICONS = writable<SimpleIcon[]>([]);
