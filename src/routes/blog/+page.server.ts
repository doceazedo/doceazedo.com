import { getPosts } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => await getPosts();
