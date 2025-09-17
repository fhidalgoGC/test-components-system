import esTranslations from './es.json';
import enTranslations from './en.json';

export const cardTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getCardTranslations = (language: string) => {
  return cardTranslations[language as keyof typeof cardTranslations] || cardTranslations.es;
};