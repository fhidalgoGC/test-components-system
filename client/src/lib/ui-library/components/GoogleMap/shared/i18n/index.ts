import { en } from './en';
import { es } from './es';

export type GoogleMapTranslations = typeof en;

const dictionaries: Record<string, GoogleMapTranslations> = { en, es };

export function getLocalDict(lang: string): GoogleMapTranslations {
  return dictionaries[lang] || dictionaries.en;
}

export { en, es };
