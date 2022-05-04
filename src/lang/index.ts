export type Language = {
  code: string;

  navbar: {
    blog: string;
    talks: string;
    streams: string;
    projects: string;
    me: string;
  };

  blurb: {
    title: string;
    paragraph: string[];
    button: string;
  };

  skills: {
    title: string;
    paragraph: string[];
  };

  portfolio: {
    title: string;
    projects: {
      title: string;
      description: string;
    }[];
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
  };

  bookmarks: {
    title: string;
    paragraph: string;
    devUtils: string;
    design: string;
    resources: string;
    subreddits: string;
    english: string;
    miscellaneous: string;
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
};

export * from './en';
export * from './pt';
