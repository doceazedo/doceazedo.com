import { fetchSinglePost } from '../../../utils/fetch-posts';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { MARKS } from '@contentful/rich-text-types';

export async function get({ params }) {
  const post = await fetchSinglePost(params.slug);

  if (!post) {
    return {
      status: 404,
      error: new Error(`Could not find post with slug "${params.slug}"`),
    }
  }

  const RichTextOptions = {
    renderMark: {
      [MARKS.CODE]: text => text.includes('\n') ? `<pre><code>${text}</code></pre>` : `<code>${text}</code>`
    }
  }

  post.content = documentToHtmlString(post.content, RichTextOptions);

  return {
    body: { ...post }
  }
}