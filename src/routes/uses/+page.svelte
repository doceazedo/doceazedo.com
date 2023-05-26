<script lang="ts">
  import '../../assets/css/prism-material-dark.css';
  import _ from '$lib/lang';
  import { Metadata, PageTitle, SubtitleWithIcon } from '$lib/components';
  import {
    AttachmentIcon,
    ChatIcon,
    CodeIcon,
    ComputerIcon,
    GlobeIcon,
    LiveIcon,
    PencilRulerIcon,
    PuzzleIcon,
    SparklesIcon,
    ToolsIcon
  } from '$lib/components/icons';
  import UseList from './UseList.svelte';
  import setupImg from '../../assets/img/setup.webp';

  type Things = {
    [key: string]: string;
  };

  type ThingsWithLinks = {
    [key: string]: {
      name: string;
      url: string;
    };
  };

  type Links = {
    [name: string]: {
      url: string;
    };
  };

  const mainPC = 'M1 MacBook Pro 14" 2021';
  const gamingPC: Things = {
    cpu: 'AMD Ryzen 3600X',
    mobo: 'Gigabyte B450M DS3H',
    ram: '24GB (3x8) Crucial Ballistix 3000MHz',
    gpu: 'EVGA GTX 1660',
    psu: 'Corsair CV650',
    storage: '2TB NVMe + 480GB SATA + 500GB HDD',
    case: 'Corsair Spec Delta RGB'
  };
  const peripherals: Things = {
    display: 'Samsung UR550 28" 4K (👎)',
    keyboard: 'Logitech G512 (GX Brown)',
    mouse: 'Redragon Cobra',
    tablet: 'Wacom CTL472',
    headphone: 'AirPods Max',
    mic: 'HyperX QuadCast',
    webcam: 'iPhone 13 Pro Max / Logitech C922 Pro'
  };

  const generalApps: ThingsWithLinks = {
    browser: { name: 'Chrome', url: 'https://google.com/chrome' },
    music: { name: 'Spotify', url: 'https://spotify.com' },
    passwordManager: { name: 'Bitwarden', url: 'https://bitwarden.com' },
    docs: { name: 'Google Docs', url: 'https://docs.google.com' },
    slides: { name: 'PowerPoint', url: 'https://microsoft.com/pt-br/microsoft-365/powerpoint' },
    cloud: { name: 'MEGA', url: 'https://mega.nz' }
  };

  const productivityApps: ThingsWithLinks = {
    notes: { name: 'Obsidian', url: 'https://obsidian.md' },
    drafts: { name: 'Excalidraw+', url: 'https://excalidraw.com' },
    raycast: { name: 'Raycast', url: 'https://raycast.com' },
    screenshot: { name: 'CleanShot X', url: 'https://cleanshot.com' },
    videoEditing: { name: 'Filmora', url: 'https://filmora.wondershare.com.br' }
  };

  const codingApps: ThingsWithLinks = {
    ideKotlin: { name: 'IntelliJ IDEA', url: 'https://jetbrains.com/idea' },
    terminal: { name: 'Warp', url: 'https://warp.dev' }
  };
  const vscodeSettings: ThingsWithLinks | Links = {
    theme: { name: 'New Moon', url: 'https://taniarascia.github.io/new-moon' },
    font: { name: 'Fira Code', url: 'https://github.com/tonsky/FiraCode' },
    settings: { url: 'https://gist.github.com/doceazedo/a82ef97ebd94227d48f270042fcb63aa' }
  };
  const webDevStack: ThingsWithLinks = {
    language: { name: 'TypeScript', url: 'https://typescriptlang.org' },
    svelte: { name: 'Svelte', url: 'https://svelte.dev' },
    svelteKit: { name: 'SvelteKit', url: 'https://kit.svelte.dev' },
    css: { name: 'SASS', url: 'https://sass-lang.com' },
    icons: { name: 'Lucide', url: 'https://lucide.dev' },
    brandIcons: { name: 'Simple Icons', url: 'https://simpleicons.org' },
    bundler: { name: 'Vite', url: 'https://vitejs.dev' },
    tests: { name: 'Vitest', url: 'https://vitest.dev' },
    hosting: { name: 'Vercel', url: 'https://vercel.com' }
  };

  const streamingApps: ThingsWithLinks = {
    obs: { name: 'OBS', url: 'https://obsproject.com' },
    chat: { name: 'Chatterino', url: 'https://chatterino.com' },
    audio: { name: 'Loopback', url: 'https://rogueamoeba.com/loopback' }
  };

  const designApps: ThingsWithLinks = {
    figma: { name: 'Figma', url: 'https://figma.com' },
    illustrator: { name: 'Illustrator', url: 'https://reddit.com/r/GenP' },
    photopea: { name: 'Photopea', url: 'https://photopea.com' }
  };

  const socialApps: ThingsWithLinks = {
    mastodonWeb: { name: 'Elk', url: 'https://elk.zone' },
    mastodonMobile: { name: 'Mammoth', url: 'https://getmammoth.app' },
    tweetdeck: { name: 'TweetDeck', url: 'https://tweetdeck.twitter.com' },
    discord: { name: 'Discord', url: 'https://qg.doceazedo.com' }
  };

  const utils: ThingsWithLinks = {
    pxToRem: { name: 'PX to REM converter', url: 'https://nekocalc.com/px-to-rem-converter' },
    gridGenerator: { name: 'CSS Grid Generator', url: 'https://cssgrid-generator.netlify.app' },
    svgomg: { name: 'SVGOMG', url: 'https://jakearchibald.github.io/svgomg' },
    bulkResize: { name: 'Bulk Resize Photos', url: 'https://bulkresizephotos.com' },
    icons: { name: 'Iconês', url: 'https://icones.js.org' }
  };

  const extensions: ThingsWithLinks = {
    adblocker: {
      name: 'uBlock Origin',
      url: 'https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm'
    },
    darkReader: {
      name: 'Dark Reader',
      url: 'https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh'
    },
    rss: {
      name: 'Feeder',
      url: 'https://chrome.google.com/webstore/detail/pnjaodmkngahhkoihejjehlcdlnohgmp'
    },
    wappalyzer: {
      name: 'Wappalyzer',
      url: 'https://chrome.google.com/webstore/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg'
    },
    jsonViewer: {
      name: 'JSON Viewer',
      url: 'https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh'
    },
    hardRefresh: {
      name: 'Hard Refresh',
      url: 'https://chrome.google.com/webstore/detail/hard-refresh/ichmdelihgokllcnibkcpciljnggojkj'
    },
    ogChecker: {
      name: 'Localhost Open Graph Checker',
      url: 'https://chrome.google.com/webstore/detail/localhost-open-graph-chec/gcbnmkhkglonipggglncobhklaegphgn'
    },
    youtubeDislike: {
      name: 'Return YouTube Dislike',
      url: 'https://chrome.google.com/webstore/detail/return-youtube-dislike/gebbhagfogifgggkldgodflihgfeippi'
    },
    youtubeQuality: {
      name: 'Auto Quality for YouTube',
      url: 'https://chrome.google.com/webstore/detail/iaddfgegjgjelgkanamleadckkpnjpjc'
    },
    youtubeSponsorBlock: {
      name: 'SponsorBlock',
      url: 'https://chrome.google.com/webstore/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone'
    }
  };
</script>

<Metadata title={$_.uses.title} />
<PageTitle title={$_.uses.title} subtitle={$_.uses.paragraph} />

<article class="content">
  <SubtitleWithIcon icon={ComputerIcon}>{$_.uses.hardware.title}</SubtitleWithIcon>
  <ul>
    <li><span>{$_.uses.hardware.mainPC}:</span> {mainPC}</li>
    <li><span>{$_.uses.hardware.gamingPC.title}:</span></li>
    <ul>
      {#each Object.keys(gamingPC) as part}
        <li><span>{$_.uses.hardware.gamingPC.items[part]}:</span> {gamingPC[part]}</li>
      {/each}
    </ul>
    {#each Object.keys(peripherals) as item}
      <li><span>{$_.uses.hardware.peripherals.items[item]}:</span> {peripherals[item]}</li>
    {/each}
  </ul>
  <img src={setupImg} alt={$_.alt.setup} />

  <UseList things={generalApps} lang={$_.uses.general} icon={SparklesIcon} />

  <UseList things={productivityApps} lang={$_.uses.productivity} icon={AttachmentIcon} />

  <UseList things={codingApps} lang={$_.uses.coding} icon={CodeIcon}>
    <li slot="pre">
      <a href="/" target="_blank" rel="noopener noreferrer">VS Code</a>
      {$_.uses.coding.items.ide}
      <ul>
        {#each Object.keys(vscodeSettings) as key}
          {@const setting = vscodeSettings[key]}
          <li>
            <a href={setting.url} target="_blank" rel="noopener noreferrer">
              {setting?.name || $_.uses.coding.vscode[key]}
            </a>
            {setting?.name ? $_.uses.coding.vscode[key] : ''}
          </li>
        {/each}
      </ul>
    </li>

    <li><span>{$_.uses.coding.web.title}:</span></li>
    <UseList things={webDevStack} lang={$_.uses.coding.web} showTitle={false} />
  </UseList>

  <UseList things={streamingApps} lang={$_.uses.streaming} icon={LiveIcon} />

  <UseList things={designApps} lang={$_.uses.design} icon={PencilRulerIcon} />

  <UseList things={socialApps} lang={$_.uses.social} icon={ChatIcon} />

  <UseList things={utils} lang={$_.uses.utils} icon={ToolsIcon} />

  <UseList things={extensions} lang={$_.uses.extensions} icon={PuzzleIcon} />
</article>

<style lang="sass">
  li span
    color: #fff
    transition: all .4s ease

  img
    margin-bottom: 0

  :global([data-theme="light"])
    li span
      color: #000
      font-weight: 600
</style>
