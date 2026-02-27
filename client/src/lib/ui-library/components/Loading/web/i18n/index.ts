import en from './en.json';
import es from './es.json';

export const localDictionaries = { en, es } as const;

export const getLocalDict = (lang?: string) => {
  const pick = (lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return localDictionaries[pick];
};
