import {
  BookmarkIcon,
  CodeIcon,
  FlagBrazilIcon,
  FlagUnitedKingdomIcon,
  LiveIcon,
  NewspaperIcon,
  RssIcon,
  SlideshowIcon,
  UserIcon
} from '$lib/components/icons';
import type { SvelteComponent } from 'svelte';

type NavbarLink = {
  slug: string;
  icon: typeof SvelteComponent;
};

type NavbarShortcut = {
  icon: typeof SvelteComponent;
  href: string;
  target?: string;
};

type Languages = {
  [code: string]: {
    code: string;
    title: string;
    icon: typeof SvelteComponent;
  };
};

export const navbarItems: NavbarLink[] = [
  {
    slug: 'blog',
    icon: NewspaperIcon
  },
  {
    slug: 'talks',
    icon: SlideshowIcon
  },
  {
    slug: 'live',
    icon: LiveIcon
  },
  {
    slug: 'projects',
    icon: CodeIcon
  },
  {
    slug: 'me',
    icon: UserIcon
  }
];

export const shortcuts: NavbarShortcut[] = [
  {
    icon: BookmarkIcon,
    href: '/uses'
  },
  {
    icon: RssIcon,
    href: '/feed.xml',
    target: '_blank'
  }
];

export const languages: Languages = {
  pt: { code: 'pt', title: 'PT-BR', icon: FlagBrazilIcon },
  en: { code: 'en', title: 'EN', icon: FlagUnitedKingdomIcon }
};
