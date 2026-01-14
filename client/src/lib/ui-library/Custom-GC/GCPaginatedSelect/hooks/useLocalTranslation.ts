import { useTranslation } from 'react-i18next';
import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';

const translations = {
  es: esTranslations,
  en: enTranslations,
};

export const useLocalTranslation = () => {
  const { i18n } = useTranslation();
  
  const t = (key: string): string => {
    const language = i18n.language.startsWith('es') ? 'es' : 'en';
    const translation = translations[language][key as keyof typeof esTranslations];
    return translation || key;
  };

  return { t, i18n };
};
