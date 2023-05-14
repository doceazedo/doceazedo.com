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
  localStorage.setItem('COLOR_THEME', colorTheme);
  if (colorTheme == 'purple') localStorage.removeItem('COLOR_THEME');
  document.body.dataset.color = colorTheme;
});

export const READING_FONT_SIZE = writable<number>(1);
export const READING_LINE_HEIGHT = writable<number>(1);
export const READING_MAX_WIDTH = writable<number>(1);

export const USE_DYSLEXIA_FONT = writable<boolean>(false, () => {
  if (!browser) return;

  const storedState = localStorage.getItem('USE_DYSLEXIA_FONT');
  if (storedState == 'true') {
    USE_DYSLEXIA_FONT.set(true);
    document.body.dataset.dyslexiaMode = 'true';
  }
});
USE_DYSLEXIA_FONT.subscribe((useDyslexiaFont) => {
  if (!browser) return;

  localStorage.setItem('USE_DYSLEXIA_FONT', 'true');
  if (!useDyslexiaFont) localStorage.removeItem('USE_DYSLEXIA_FONT');
  document.body.dataset.dyslexiaMode = useDyslexiaFont ? 'true' : 'false';
});

export const IS_ELEVATOR_FAST = writable<boolean>(false, () => {
  if (!browser) return;

  const storedState = localStorage.getItem('IS_ELEVATOR_FAST');
  if (storedState == 'true') IS_ELEVATOR_FAST.set(true);
});
IS_ELEVATOR_FAST.subscribe((useDyslexiaFont) => {
  if (!browser) return;

  localStorage.setItem('IS_ELEVATOR_FAST', 'true');
  if (!useDyslexiaFont) localStorage.removeItem('IS_ELEVATOR_FAST');
});

export const IS_SLEEPING = writable(false);
