import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => ({
  status: 301,
  headers: {
    location: '/live#icons'
  }
});
