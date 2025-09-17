import esTranslations from './es.json';
import enTranslations from './en.json';

export const inputTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getInputTranslations = (language: string) => {
  return inputTranslations[language as keyof typeof inputTranslations] || inputTranslations.es;
};