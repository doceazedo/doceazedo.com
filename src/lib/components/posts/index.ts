import { writable } from 'svelte/store';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned?: boolean;
};

type BlogPostFile = {
  default: Record<string, unknown>;
  metadata: Post;
};

export const POSTS = writable<Post[]>([]);

export const getPosts = async (qty?: number) => {
  const files = import.meta.glob<BlogPostFile>('../../../routes/blog/*/+page.md');
  const posts = Object.entries(files);
  const size = qty || posts.length;

  const allPosts = await Promise.all(
    posts.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const slug = path.split('blog/')?.pop()?.split('/+page.md')[0] || '';
      const post = {
        ...metadata,
        slug
      };

      return post;
    })
  );

  const sortedPosts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, size);

  return {
    posts: sortedPosts
  };
};
