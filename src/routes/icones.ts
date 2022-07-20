import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => ({
  status: 301,
  headers: {
    location: '/live#icons'
  }
});
