import esTranslations from './es.json';
import enTranslations from './en.json';

export const sidebarTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getSidebarTranslations = (language: string) => {
  return sidebarTranslations[language as keyof typeof sidebarTranslations] || sidebarTranslations.es;
};