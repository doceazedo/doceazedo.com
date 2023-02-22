import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '../lang';

type Theme = 'light' | 'dark';

const updateAria = (code: string) => browser && document.documentElement.setAttribute('lang', code);

export const initializeLang = () => {
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

export const LANG = initializeLang();

const getSystemTheme = (): Theme => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDarkMode ? 'dark' : 'light';
};

const handleSystemThemeUpdate = (e: MediaQueryListEvent) => {
  const prefersDarkMode = e.matches;
  THEME.set(prefersDarkMode ? 'dark' : 'light');
};

export const THEME = writable<Theme>('dark', () => {
  if (!browser) return;

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', handleSystemThemeUpdate);

  const storedTheme = localStorage.getItem('THEME');
  if (storedTheme == 'dark' || storedTheme == 'light') {
    THEME.set(storedTheme);
    return;
  }

  const systemTheme = getSystemTheme();
  THEME.set(systemTheme);
});

THEME.subscribe((theme) => {
  if (!browser) return;

  const storedTheme = localStorage.getItem('THEME');
  const systemTheme = getSystemTheme();

  if (storedTheme || systemTheme != theme) localStorage.setItem('THEME', theme);
  if (systemTheme == theme) localStorage.removeItem('THEME');

  document.body.dataset.theme = theme;
});
