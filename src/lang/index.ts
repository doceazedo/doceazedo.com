export type Language = {
  code: string;

  navbar: {
    home: string;
    blog: string;
    talks: string;
    live: string;
    projects: string;
    me: string;
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
  };

  footer: string[];

  about: {
    subtitle: string;
    intro: string;
    factsIntro: string;
    facts: string[];
    tattoosTitle: string;
    tattoos: string[];
    keepInTouchTitle: string;
    socialsIntro: string;
    socials: string[];
    livestream: string;
    nickname: string;
    hardwareTitle: string;
    hardware: string[];
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
    subscribeRSS: string;
    subscribeNewsletter: string;
    subscribeButton: string;
    soon: string;
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
    tts: {
      title: string;
      subtitle: string;
      usage: {
        default: string;
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
  };

  topbar: {
    content: string;
    highlight: string;
    readMore: string;
  };
};

export * from './en';
export * from './pt';
