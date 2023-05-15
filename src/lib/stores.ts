import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en, pt } from '../lang';

type Theme = 'light' | 'dark';
type ColorThemes = {
  [name: string]: {
    primary: string;
    primaryLight: string;
    background: string;
  };
};

const themes: ColorThemes = {
  purple: {
    primary: '6930C3',
    primaryLight: '8968D3',
    background: '070212'
  },
  blue: {
    primary: '057EA4',
    primaryLight: '3494BB',
    background: '010D10'
  },
  orange: {
    primary: 'FF3E00',
    primaryLight: 'FF5E24',
    background: '100B0A'
  },
  carmine: {
    primary: 'D02548',
    primaryLight: 'E9415B',
    background: '111111'
  },
  green: {
    primary: '42B883',
    primaryLight: '66D9A2',
    background: '07120D'
  }
};

const fontSizes = ['16px', '19.2px', '22px', '24px'];
const lineHeights = ['-4px', '0px', '4px'];
const maxWidths = ['600px', '700px', '800px', '900px'];

export const findStyleTag = (): HTMLElement => {
  const styleTag = document.querySelector('head style[data-user-settings]');
  if (styleTag) return styleTag as HTMLElement;
  document.head.insertAdjacentHTML('beforeend', `<style data-user-settings></style>`);
  return findStyleTag();
};

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b].join();
};

export const updateCssVariables = () => {
  if (!browser) return;

  const styleTag = findStyleTag();

  const colorTheme = themes[get(COLOR_THEME)];
  if (!colorTheme) {
    console.warn('Invalid color theme. User settings might not be applied.');
    return;
  }

  const fontSize = fontSizes[get(READING_FONT_SIZE)];
  const maxWidth = maxWidths[get(READING_MAX_WIDTH)];
  const lineHeight = lineHeights[get(READING_LINE_HEIGHT)];

  styleTag.innerHTML = `
    :root {
      --primary-rgb: ${hexToRgb(colorTheme.primary)};
      --primary-light-rgb: ${hexToRgb(colorTheme.primaryLight)};
      --background-rgb: ${hexToRgb(colorTheme.background)};

      --primary: rgb(var(--primary-rgb));
      --primary-light: rgb(var(--primary-light-rgb));
      --background: rgb(var(--background-rgb));

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

export const COLOR_THEME = writable<string>('purple', () => {
  if (!browser) return;
  const stored = localStorage.getItem('COLOR_THEME');
  if (stored) COLOR_THEME.set(stored);
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

COLOR_THEME.subscribe((colorTheme) => {
  if (!browser) return;
  localStorage.setItem('COLOR_THEME', colorTheme);
  if (colorTheme == 'purple') localStorage.removeItem('COLOR_THEME');
  document.body.dataset.color = colorTheme;
  updateCssVariables();
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
