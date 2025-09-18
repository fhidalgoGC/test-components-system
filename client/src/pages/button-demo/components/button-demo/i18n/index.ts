import esTranslations from './es.json';
import enTranslations from './en.json';

export const buttonDemoTranslations = {
  es: esTranslations,
  en: enTranslations
};

export const getButtonDemoTranslations = (language: string) => {
  return buttonDemoTranslations[language as keyof typeof buttonDemoTranslations] || buttonDemoTranslations.es;
};