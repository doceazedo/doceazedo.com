/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import jsonic from 'jsonic';
import jp from 'jsonpath';
import { UsesThingSection } from '../src/lib/lang';
import { en } from '../src/lib/lang/locales/en';
import { pt } from '../src/lib/lang/locales/pt';
import type { Language } from '../src/lib/lang';

type SectionNames = {
  page: string;
  locale: string;
};

const UsesPage = fs.readFileSync('./src/routes/uses/+page.svelte').toString();

const updateLocales = (sections: SectionNames[]) => {
  sections.map((section) => {
    const keys = Object.keys(getVariableValue(UsesPage, section.page));
    updateLocale(section.locale, keys, en, 'EN');
    updateLocale(section.locale, keys, pt, 'PT');
    updateLocaleFile(en);
    updateLocaleFile(pt);
  });
};

const updateLocale = (section: string, keys: string[], lang: Language, langCode: string) => {
  const path = `$.uses.${section}.items`;
  const items = jp.query(lang, path)[0] as unknown as UsesThingSection;
  if (!items) throw Error(`Invalid section ${section}`);

  let newEntries = 0;
  keys.map((key) => {
    if (!items[key]) {
      items[key] = '...';
      newEntries++;
    }
  });

  if (newEntries) {
    jp.value(lang, path, items);
    console.log(`Added ${newEntries} new entries for ${section} in ${langCode}`);
  }
};

const updateLocaleFile = (lang: Language) => {
  fs.writeFileSync(
    `./src/lib/lang/locales/${lang.code}.ts`,
    `import type { Language } from '..';\n\nexport const ${lang.code}: Language = ${JSON.stringify(
      lang,
      null,
      2
    )};`
  );
};

const getVariableValue = (str: string, varName: string): object => {
  const lines = str.split('\n');
  const varLine = lines.find((line) => line.includes(`const ${varName}`));

  if (varLine) {
    let endLineIdx = lines.findIndex(
      (line, idx) => idx > lines.indexOf(varLine) && line.trim().endsWith('};')
    );
    if (endLineIdx === -1) {
      endLineIdx = lines.length - 1;
    }
    const valueLines = lines.slice(lines.indexOf(varLine) + 1, endLineIdx);
    const valueString = valueLines.join('\n').trim();

    return jsonic(valueString);
  } else {
    throw new Error(`Variable '${varName}' not found in input string`);
  }
};

updateLocales([
  { page: 'gamingPC', locale: 'hardware.gamingPC' },
  { page: 'peripherals', locale: 'hardware.peripherals' },
  { page: 'generalApps', locale: 'general' },
  { page: 'productivityApps', locale: 'productivity' },
  { page: 'codingApps', locale: 'coding' },
  { page: 'webDevStack', locale: 'coding.web' },
  { page: 'streamingApps', locale: 'streaming' },
  { page: 'designApps', locale: 'design' },
  { page: 'socialApps', locale: 'social' },
  { page: 'utils', locale: 'utils' },
  { page: 'extensions', locale: 'extensions' }
]);
