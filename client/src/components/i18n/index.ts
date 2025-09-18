import esTranslations from './es.json';
import enTranslations from './en.json';

export const componentsTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getComponentsTranslations = (language: string) => {
  return componentsTranslations[language as keyof typeof componentsTranslations] || componentsTranslations.en;
};