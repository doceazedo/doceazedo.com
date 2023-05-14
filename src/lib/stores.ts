import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '../lang';

type Theme = 'light' | 'dark';
type ColorTheme = 'purple' | 'blue' | 'orange' | 'carmine' | 'green';

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

export const THEME = writable<Theme>('dark', () => {
  if (!browser) return;

  const storedTheme = localStorage.getItem('THEME');
  if (storedTheme == 'dark' || storedTheme == 'light') THEME.set(storedTheme);
});

THEME.subscribe((theme) => {
  if (!browser) return;
  localStorage.setItem('THEME', theme);
  document.body.dataset.theme = theme;
});

export const COLOR_THEME = writable<ColorTheme>('purple');
COLOR_THEME.subscribe((colorTheme) => {
  if (!browser) return;
  if (colorTheme == 'purple') {
    localStorage.removeItem('COLOR_THEME');
    document.body.dataset.color = undefined;
    return;
  }
  localStorage.setItem('COLOR_THEME', colorTheme);
  document.body.dataset.color = colorTheme;
});

export const READING_FONT_SIZE = writable<number>(1);
export const READING_LINE_HEIGHT = writable<number>(1);
export const READING_MAX_WIDTH = writable<number>(1);
export const USE_DYSLEXIA_FONT = writable<boolean>(false);
export const IS_ELEVATOR_FAST = writable<boolean>(false);

export const IS_SLEEPING = writable(false);
