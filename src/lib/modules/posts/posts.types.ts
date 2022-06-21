export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned?: boolean;
};
