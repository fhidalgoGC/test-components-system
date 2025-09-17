import esTranslations from './es.json';
import enTranslations from './en.json';

export const navbarTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getNavbarTranslations = (language: string) => {
  return navbarTranslations[language as keyof typeof navbarTranslations] || navbarTranslations.es;
};