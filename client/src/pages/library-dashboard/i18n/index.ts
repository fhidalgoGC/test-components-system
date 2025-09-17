import esTranslations from './es.json';
import enTranslations from './en.json';

export const libraryDashboardTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getLibraryDashboardTranslations = (language: string) => {
  return libraryDashboardTranslations[language as keyof typeof libraryDashboardTranslations] || libraryDashboardTranslations.es;
};