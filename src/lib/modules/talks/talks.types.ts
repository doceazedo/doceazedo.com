export type Talk = {
  title: string;
  slug: string;
  date: Date;
  promoter: Promoter;
  replay: string;
  resources: Resource[];
};

export type Promoter = {
  name: string;
  slug: string;
  url: string;
};

export type Promoters = {
  [version: string]: Promoter;
};

export type Resource = {
  link?: {
    label: string;
    url: string;
  };
  html?: string;
};
