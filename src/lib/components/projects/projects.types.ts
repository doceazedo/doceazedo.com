export type Project = {
  id: string;
  title: string;
  imageFormat?: string;
  url?: string;
  writeup?: string;
  source?: string;
  demo?: string;
  // FIXME: remove this:
  scroll?: string;
};
