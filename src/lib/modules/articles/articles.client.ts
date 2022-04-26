import type { WordPressApiResponse } from '.';

const baseUrl = 'https://wp.lucasfernandes.com.br/wp-json/wp/v2';

export const getArticles = async (qty?: number) => {
  try {
    const perPage = qty != null ? `?per_page=${qty}` : '';
    const resp = await fetch(`${baseUrl}/posts${perPage}`);
    const data: WordPressApiResponse[] = await resp.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const resp = await fetch(`${baseUrl}/posts?slug=${slug}`);
    const data: WordPressApiResponse[] = await resp.json();
    return data;
  } catch (error) {
    return [];
  }
};
