/* eslint-disable no-useless-escape */

type BlogPostFile = {
  default: Record<string, unknown>;
  metadata: {
    title: string;
    date: string;
    tags: string[];
    icon: string;
  };
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
