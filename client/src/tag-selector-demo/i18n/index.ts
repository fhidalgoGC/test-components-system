import esTranslations from './es.json';
import enTranslations from './en.json';

export const tagSelectorDemoTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getTagSelectorDemoTranslations = (language: string) => {
  return tagSelectorDemoTranslations[language as keyof typeof tagSelectorDemoTranslations] || tagSelectorDemoTranslations.es;
};