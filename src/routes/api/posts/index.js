import { fetchPosts } from '../../../utils/fetch-posts';

export async function get() {
  const posts = await fetchPosts();

  return {
    body: {
      posts
    }
  }
}