import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en } from './locales/en';
import { pt } from './locales/pt';

export type Language = {
  code: string;

  navbar: {
    [slug: string]: string;
  };

  blurb: {
    title: string;
    paragraph: string;
  };

  skills: {
    title: string;
    paragraph: string[];
  };

  blog: {
    title: string;
    subtitle: string;
    more: string;
    new: string;
  };

  footer: string[];

  about: {
    tldr: {
      online: KeyValue;
      legally: KeyValue;
      physically: KeyValue;
      professionally: KeyValue;
      casually: KeyValue;
      pronouns: KeyValue;
    };
    contact: string;
    me: {
      title: string;
      photoCaption: string;
      intro: string;
      interests: string;
      music: string;
    };
    trivia: {
      title: string;
      items: string[];
    };
    wrapup: string;
  };

  talks: {
    title: string;
    paragraph: string;
    at: string;
    watch: string;
    resources: string;
    resourcesPretitle: string;
  };

  bookmarks: {
    title: string;
    paragraph: string;
    devUtils: string;
    design: string;
    resources: string;
    subreddits: string;
    english: string;
    extensions: string;
    accessibility: string;
    miscellaneous: string;
  };

  newsletter: {
    title: string;
    paragraph: string;
    placeholder: string;
    subscribe: string;
    messages: {
      success: string;
      error: string;
      openIssue: string;
    };
  };

  projects: {
    subtitle: string;
    subtitleGitHub: string;
    url: string;
    writeup: string;
    source: string;
    demo: string;
    details: {
      [id: string]: string;
    };
  };

  streams: {
    titleOnline: string;
    titleOffline: string;
    supportMe: string;
    subscribe: {
      title: string;
      paragraph: string;
      benefits: string[];
      prime: string;
      sub: string;
    };
    donate: {
      title: string;
      paragraph: string;
    };
    icons: {
      title: string;
      subtitle: string;
      copied: string;
    };
    pronouns: {
      title: string;
      subtitle: string;
      command: string;
      copy: string;
    };
    tts: {
      title: string;
      subtitle: string;
      usage: {
        default: string;
        google: string;
        polly: string;
        ssml: string;
      };
      placeholder: {
        message: string;
        code: string;
      };
      ssmlTags: string;
      table: {
        lang: string;
        code: string;
        type: string;
        voiceTypes: {
          f: string;
          m: string;
        };
      };
    };
    prime: {
      title: string;
      paragraph: string;
      steps: {
        title: string;
        description: string;
      }[];
    };
  };

  email: string;
  posted: string;
  skipToContent: string;

  alt: {
    logo: string;
    selfie: string;
    copyleft: string;
    listeningTo: string;
    lastfm: string;
    imageBeach: string;
    changeLanguage: string;
    langEn: string;
    langPt: string;
    nowLive: string;
    audioButton: string;
    home: string;
    setup: string;
  };

  topbar: {
    content: string;
    highlight: string;
    readMore: string;
  };

  settings: {
    title: string;
    theme: string;
    colorTheme: string;
    fontSize: string;
    readingWidth: string;
    lineHeight: string;
    dyslexiaFont: string;
    elevatorSpeed: string;
    resetLabel: string;
    resetButton: string;
    themes: {
      [id: string]: string;
    };
    themeUnlock: string;
    fontSizes: string[];
    lineHeights: string[];
  };

  uses: {
    title: string;
    paragraph: string;
    hardware: {
      title: string;
      mainPC: string;
      gamingPC: UsesThingSection;
      peripherals: {
        items: {
          [item: string]: string;
        };
      };
    };
    general: UsesThingSection;
    productivity: UsesThingSection;
    coding: UsesThingSection & {
      vscode: {
        [item: string]: string;
      };
      web: UsesThingSection;
    };
    streaming: UsesThingSection;
    design: UsesThingSection;
    social: UsesThingSection;
    utils: UsesThingSection;
    extensions: UsesThingSection;
  };
};

type KeyValue = {
  key: string;
  value: string;
};

export type UsesThingSection = {
  title: string;
  items: {
    [item: string]: string;
  };
};

const updateAria = (code: string) => browser && document.documentElement.setAttribute('lang', code);

const initializeLang = () => {
  let defaultLang = en;
  if (browser && navigator.language.startsWith('pt')) defaultLang = pt;
  const { subscribe, set } = writable(defaultLang);
  updateAria(defaultLang.code);

  return {
    subscribe,
    change: (lang: string) => {
      set(lang == 'pt' ? pt : en);
      updateAria(lang);
    }
  };
};

const _ = initializeLang();

export default _;
