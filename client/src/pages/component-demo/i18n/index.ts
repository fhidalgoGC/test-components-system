import esTranslations from './es.json';
import enTranslations from './en.json';

export const componentDemoTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getComponentDemoTranslations = (language: string) => {
  return componentDemoTranslations[language as keyof typeof componentDemoTranslations] || componentDemoTranslations.es;
};