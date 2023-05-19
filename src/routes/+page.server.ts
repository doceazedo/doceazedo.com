import { getPosts } from '$lib/components/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await getPosts(5);
