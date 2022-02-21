import { writable } from 'svelte/store';
import { browser } from '$app/env';
import en from '../lang/en.json';
import pt from '../lang/pt.json';

export const initializeLang = () => {
  let defaultLang = en;
  if (browser && navigator.language.startsWith('pt')) defaultLang = pt;
  const { subscribe, set } = writable(defaultLang);

  return {
    subscribe,
    change: (lang: string) => set(lang == 'pt' ? pt : en)
  };
};

export const lang = initializeLang();
