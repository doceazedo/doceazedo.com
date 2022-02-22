export type WordPressApiResponse = {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: Content;
  excerpt: Excerpt;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: string[];
  categories: number[];
  tags: string[];
  acf: Acf;
  _links: Links;
};

type Guid = {
  rendered: string;
};

type Title = {
  rendered: string;
};

type Content = {
  rendered: string;
  protected: boolean;
};

type Excerpt = {
  rendered: string;
  protected: boolean;
};

type Acf = {
  icon: string;
  categories: string;
};

type Links = {
  self: Self[];
  collection: Collection[];
  about: About[];
  author: Author[];
  replies: Reply[];
  'version-history': VersionHistory[];
  'predecessor-version': PredecessorVersion[];
  'wp:featuredmedia': Featuredmedum[];
  'wp:attachment': WpAttachment[];
  'wp:term': WpTerm[];
  curies: Cury[];
};

type Self = {
  href: string;
};

type Collection = {
  href: string;
};

type About = {
  href: string;
};

type Author = {
  embeddable: boolean;
  href: string;
};

type Reply = {
  embeddable: boolean;
  href: string;
};

type VersionHistory = {
  count: number;
  href: string;
};

type PredecessorVersion = {
  id: number;
  href: string;
};

type Featuredmedum = {
  embeddable: boolean;
  href: string;
};

type WpAttachment = {
  href: string;
};

type WpTerm = {
  taxonomy: string;
  embeddable: boolean;
  href: string;
};

type Cury = {
  name: string;
  href: string;
  templated: boolean;
};

export { default as Articles } from './articles.svelte';
