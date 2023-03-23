import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () =>
  new Response(null, {
    status: 301,
    headers: {
      location: '/live#tts'
    }
  });
