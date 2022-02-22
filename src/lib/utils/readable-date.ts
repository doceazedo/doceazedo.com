import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/pt-br.js';
import { browser } from '$app/env';

export const readableDate = (dateString: string, langCode: string) => {
  if (browser) {
    dayjs.extend(relativeTime);
    return dayjs(dateString)
      .locale(langCode == 'pt' ? 'pt-br' : 'en-us')
      .fromNow();
  }
  return '';
};
