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
      title: 'extensions',
      items: [
        {
          title: 'JSON Viewer',
          href: 'https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh'
        },
        {
          title: 'Clear Cache',
          href: 'https://chrome.google.com/webstore/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn'
        },
        {
          title: 'RSS Feed Reader',
          href: 'https://chrome.google.com/webstore/detail/pnjaodmkngahhkoihejjehlcdlnohgmp'
        },
        {
          title: 'Return YouTube Dislike',
          href: 'https://chrome.google.com/webstore/detail/return-youtube-dislike/gebbhagfogifgggkldgodflihgfeippi'
        },
        {
          title: 'Auto Quality for YouTube',
          href: 'https://chrome.google.com/webstore/detail/iaddfgegjgjelgkanamleadckkpnjpjc'
        },
        {
          title: 'WA Web Plus for WhatsApp',
          href: 'https://chrome.google.com/webstore/detail/wa-web-plus-for-whatsapp/ekcgkejcjdcmonfpmnljobemcbpnkamh'
        }
      ]
    },
    {
      title: 'accessibility',
      items: [
        {
          title: 'WAVE - Web Accessibility Evaluation Tool',
          href: 'https://wave.webaim.org'
        },
        {
          title: 'tota11y - An accessibility visualization toolkit',
          href: 'https://khan.github.io/tota11y'
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
