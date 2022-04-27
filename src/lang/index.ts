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

  articles: {
    title: string;
    paragraph: string[];
    more: string;
  };

  footer: string[];

  blog: {
    subtitle: string;
  };

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

  contact: {
    title: string;
    paragraph: string;
    telegramButton: string;
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
