import { getPosts } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => await getPosts();
