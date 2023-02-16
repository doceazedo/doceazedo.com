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
      intro: string;
      interests: string;
      music: string;
    };
    trivia: {
      title: string;
      items: string[];
    };
    software: {
      title: string;
      items: {
        stack: KeyValue;
        ide: KeyValue;
        terminal: KeyValue;
        notes: KeyValue;
        music: KeyValue;
      };
      bookmarks: {
        paragraph: string;
        linkLabel: string;
      };
    };
    hardware: {
      title: string;
      items: {
        devPc: KeyValue;
        gamingPc: {
          title: string;
          items: KeyValue[];
        };
        peripherals: KeyValue[];
      };
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
  };

  topbar: {
    content: string;
    highlight: string;
    readMore: string;
  };
};

type KeyValue = {
  key: string;
  value: string;
};

export * from './en';
export * from './pt';
