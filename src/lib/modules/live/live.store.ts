import { writable } from 'svelte/store';
import { getLiveData } from './live.client';
import type { LiveResponse } from './live.types';

export const LIVE_DATA = writable<LiveResponse>(null, () => {
  getLiveData();
  setInterval(getLiveData, 10000);
});
