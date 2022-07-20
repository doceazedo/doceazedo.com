/* eslint-disable no-useless-escape */
import type { Post } from '$lib/modules/posts';

type BlogPostFile = {
  default: Record<string, unknown>;
  metadata: Post;
};

export const getPosts = async (qty?: number) => {
  const files = import.meta.glob<BlogPostFile>('../../routes/blog/*.md');
  const posts = Object.entries(files);
  const size = qty || posts.length;

  const allPosts = await Promise.all(
    posts.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)[0];
      const post = {
        slug,
        ...metadata
      };

      return post;
    })
  );

  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, size);

  return {
    body: {
      posts: sortedPosts
    }
  };
};
