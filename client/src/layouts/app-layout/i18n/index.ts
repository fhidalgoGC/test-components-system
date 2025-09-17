import esTranslations from './es.json';
import enTranslations from './en.json';

export const appLayoutTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getAppLayoutTranslations = (language: string) => {
  return appLayoutTranslations[language as keyof typeof appLayoutTranslations] || appLayoutTranslations.es;
};