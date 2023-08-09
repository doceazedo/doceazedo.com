import toast from 'svelte-french-toast';
import { get, writable } from 'svelte/store';
import { browser } from '$app/environment';
import _ from '../lang';
import { toastTheme } from '../utils/toast';
import selfiePurple from '../../assets/img/me-selfie-v3.webp';
import selfieRed from '../../assets/img/me-selfie-goptun.png';

type Theme = 'light' | 'dark';
type ColorThemes = {
  [name: string]: {
    primary: string;
    primaryLight: string;
    background: string;
    selfie?: string;
    patArea?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    fonts?: {
      primary?: string;
      secondary?: string;
    };
    isDarkOnly?: boolean;
  };
};

export const COLOR_THEMES = writable<ColorThemes>({
  purple: {
    primary: '6930C3',
    primaryLight: '8968D3',
    background: '070212',
    selfie: selfiePurple
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
    background: '111111',
    selfie: selfieRed,
    patArea: {
      x: 80,
      y: 128,
      width: 112,
      height: 70
    }
  },
  green: {
    primary: '42B883',
    primaryLight: '66D9A2',
    background: '07120D'
  }
});

const extraThemes: ColorThemes = {
  pink: {
    primary: 'F266AB',
    primaryLight: 'FF85C9',
    background: '180A11'
  },
  fortnite: {
    primary: 'F7FF19',
    primaryLight: 'F7FF19',
    background: '1B90DD',
    isDarkOnly: true
  }
};

const addExtraTheme = (theme: string) => {
  const extraTheme = extraThemes[theme];
  if (!extraTheme) return console.warn(`Could not find extra theme ${theme}`);

  const themes = get(COLOR_THEMES);
  if (themes[theme]) return console.warn(`Extra theme ${theme} already added`);

  themes[theme] = extraTheme;
  COLOR_THEMES.set(themes);
};

export const unlockTheme = (theme: string) => {
  const unlockedThemes = get(UNLOCKED_THEMES);
  if (unlockedThemes.includes(theme)) return;
  UNLOCKED_THEMES.set([...unlockedThemes, theme]);

  const lang = get(_);
  toast.success(`${lang.settings.themeUnlock} ${lang.settings.themes[theme]}`, {
    ...toastTheme,
    duration: 6000
  });
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

  const themes = get(COLOR_THEMES);
  const colorTheme = themes[get(COLOR_THEME)];
  if (!colorTheme) {
    console.warn('Invalid color theme. User settings might not be applied.');
    return;
  }

  const fontSize = fontSizes[get(READING_FONT_SIZE)];
  const maxWidth = maxWidths[get(READING_MAX_WIDTH)];
  const lineHeight = lineHeights[get(READING_LINE_HEIGHT)];

  const primaryFont = colorTheme?.fonts?.primary || "'Rubik', sans-serif";
  const secondaryFont = colorTheme?.fonts?.secondary || "'Karla', sans-serif";

  styleTag.innerHTML = `
    :root {
      --primary-rgb: ${hexToRgb(colorTheme.primary)};
      --primary-light-rgb: ${hexToRgb(colorTheme.primaryLight)};
      --background-rgb: ${hexToRgb(colorTheme.background)};

      --primary: rgb(var(--primary-rgb));
      --primary-light: rgb(var(--primary-light-rgb));
      --background: rgb(var(--background-rgb));

      --font-emoji: Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
      --font-primary: ${primaryFont}, var(--font-emoji);
      --font-secondary: ${secondaryFont}, var(--font-emoji);
      --font-dyslexia: 'OpenDyslexic', sans-serif, var(--font-emoji);

      --readingFontSize: ${fontSize};
      --readingMaxWidth: ${maxWidth};
      --readingLineHeight: ${lineHeight};
    }
  `;
};

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

export const UNLOCKED_THEMES = writable<string[]>([], () => {
  if (!browser) return;
  const stored = localStorage.getItem('UNLOCKED_THEMES');
  if (stored) UNLOCKED_THEMES.set(stored.split(','));
});

UNLOCKED_THEMES.subscribe((themes) => {
  if (!browser) return;
  localStorage.setItem('UNLOCKED_THEMES', themes.join(','));
  if (!themes.length) localStorage.removeItem('UNLOCKED_THEMES');
  themes.map((theme) => addExtraTheme(theme));
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

export const ADHD_MODE = writable(false);
export const IS_ADHD_MODE_AVAILABLE = writable(false);
