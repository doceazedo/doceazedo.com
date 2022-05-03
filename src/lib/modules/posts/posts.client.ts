import type { Post } from '.';

const baseUrl = '/api/posts';

export const getPosts = async (size?: number) => {
  try {
    const query = size != null ? `?size=${size}` : '';
    const resp = await fetch(`${baseUrl}/${query}`);
    const data: Post[] = await resp.json();
    return data;
  } catch (error) {
    return [];
  }
};
