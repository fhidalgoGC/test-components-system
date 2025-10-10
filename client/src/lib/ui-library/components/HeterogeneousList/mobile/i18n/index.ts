import en from './en.json';
import es from './es.json';

const localDictionaries = { en, es };

export const getLocalDictionary = (lang?: string) => {
  const pick = (lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return localDictionaries[pick];
};

export type HeterogeneousListTranslations = typeof en;
