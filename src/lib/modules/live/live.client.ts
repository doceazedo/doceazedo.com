import { LIVE_DATA } from './live.store';
import type { LiveResponse } from './live.types';

const baseUrl = '/api/live';

export const getLiveData = async () => {
  try {
    const resp = await fetch(baseUrl);
    const data: LiveResponse = await resp.json();
    LIVE_DATA.set(data);
  } catch (error) {
    return null;
  }
};
