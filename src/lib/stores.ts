import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '../lang';

type Theme = 'light' | 'dark';
type ColorTheme = 'purple' | 'blue' | 'orange' | 'carmine' | 'green';

const fontSizes = ['16px', '19.2px', '22px', '24px'];
const lineHeights = ['-4px', '0px', '4px'];
const maxWidths = ['600px', '700px', '800px', '900px'];

export const findStyleTag = (): HTMLElement => {
  const styleTag = document.querySelector('head style[data-user-settings]');
  if (styleTag) return styleTag as HTMLElement;
  document.head.insertAdjacentHTML('beforeend', `<style data-user-settings></style>`);
  return findStyleTag();
};

export const updateCssVariables = () => {
  if (!browser) return;

  const styleTag = findStyleTag();

  const fontSize = fontSizes[get(READING_FONT_SIZE)];
  const maxWidth = maxWidths[get(READING_MAX_WIDTH)];
  const lineHeight = lineHeights[get(READING_LINE_HEIGHT)];

  styleTag.innerHTML = `
    :root {
      --readingFontSize: ${fontSize};
      --readingMaxWidth: ${maxWidth};
      --readingLineHeight: ${lineHeight};
    }
  `;
};

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

export const READING_FONT_SIZE = writable<number>(1, () => {
  if (!browser) return;
  const stored = localStorage.getItem('READING_FONT_SIZE');
  if (stored) READING_FONT_SIZE.set(Number(stored));
});

export const READING_LINE_HEIGHT = writable<number>(1, () => {
  if (!browser) return;
  const stored = localStorage.getItem('READING_LINE_HEIGHT');
  if (stored) READING_LINE_HEIGHT.set(Number(stored));
});

export const READING_MAX_WIDTH = writable<number>(1, () => {
  if (!browser) return;
  const stored = localStorage.getItem('READING_MAX_WIDTH');
  if (stored) READING_MAX_WIDTH.set(Number(stored));
});

READING_FONT_SIZE.subscribe((data) => {
  if (!browser) return;

  localStorage.setItem('READING_FONT_SIZE', data.toString());
  if (data == 1) localStorage.removeItem('READING_FONT_SIZE');
  updateCssVariables();
});

READING_LINE_HEIGHT.subscribe((data) => {
  if (!browser) return;

  localStorage.setItem('READING_LINE_HEIGHT', data.toString());
  if (data == 1) localStorage.removeItem('READING_LINE_HEIGHT');
  updateCssVariables();
});

READING_MAX_WIDTH.subscribe((data) => {
  if (!browser) return;

  localStorage.setItem('READING_MAX_WIDTH', data.toString());
  if (data == 1) localStorage.removeItem('READING_MAX_WIDTH');
  updateCssVariables();
});

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
