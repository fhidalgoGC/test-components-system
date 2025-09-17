import esTranslations from './es.json';
import enTranslations from './en.json';

export const buttonTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getButtonTranslations = (language: string) => {
  return buttonTranslations[language as keyof typeof buttonTranslations] || buttonTranslations.es;
};