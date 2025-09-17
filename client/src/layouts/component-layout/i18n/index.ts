import esTranslations from './es.json';
import enTranslations from './en.json';

export const componentLayoutTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getComponentLayoutTranslations = (language: string) => {
  return componentLayoutTranslations[language as keyof typeof componentLayoutTranslations] || componentLayoutTranslations.es;
};