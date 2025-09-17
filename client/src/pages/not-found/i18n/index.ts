import esTranslations from './es.json';
import enTranslations from './en.json';

export const notFoundTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getNotFoundTranslations = (language: string) => {
  return notFoundTranslations[language as keyof typeof notFoundTranslations] || notFoundTranslations.es;
};