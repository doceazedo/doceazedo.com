<script lang="ts">
  import { PageTitle } from '$lib/components';
  import { LANG } from '$lib/stores';

  type BookmarkItem = {
    title: string;
    href: string;
  };

  type BookmarkCategory = {
    title: string;
    items: BookmarkItem[];
  };

  const bookmarks: BookmarkCategory[] = [
    {
      title: 'devUtils',
      items: [
        {
          title: 'PX to REM converter',
          href: 'https://nekocalc.com/px-to-rem-converter'
        },
        {
          title: 'CSS Grid Generator',
          href: 'https://cssgrid-generator.netlify.app'
        }
      ]
    },
    {
      title: 'design',
      items: [
        {
          title: 'Bulk Resize Photos',
          href: 'https://bulkresizephotos.com'
        }
      ]
    },
    {
      title: 'resources',
      items: [
        {
          title: 'Iconês',
          href: 'https://icones.js.org'
        }
      ]
    },
    {
      title: 'subreddits',
      items: [
        {
          title: 'TronScript',
          href: 'https://reddit.com/r/TronScript'
        },
        {
          title: 'GenP',
          href: 'https://reddit.com/r/GenP'
        }
      ]
    },
    {
      title: 'english',
      items: [
        {
          title: 'Linguee - Contextual translations',
          href: 'https://linguee.com.br'
        },
        {
          title: 'Reverso - Grammar and spell checker',
          href: 'https://reverso.net/spell-checker/english-spelling-grammar'
        }
      ]
    },
    {
      title: 'miscellaneous',
      items: [
        {
          title: 'Emojityper',
          href: 'https://emojityper.com'
        }
      ]
    }
  ];
</script>

<PageTitle title={$LANG.bookmarks.title} paragraph={$LANG.bookmarks.paragraph} />

<div class="content">
  {#each bookmarks as category}
    <h2>{$LANG.bookmarks[category.title]}</h2>
    <ul>
      {#each category.items as item}
        <li>
          <a href={item.href}>{item.title}</a>
        </li>
      {/each}
    </ul>
  {/each}
</div>
