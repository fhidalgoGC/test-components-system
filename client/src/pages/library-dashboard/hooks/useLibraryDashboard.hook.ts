import { useState } from 'react';
import type { Language, Translation } from '../i18n';
import { en } from '../i18n/en';
import { es } from '../i18n/es';

const LANGUAGE_KEY = 'library-dashboard-language';

const translations = {
  en,
  es
};

export const useLibraryDashboard = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return (saved && saved in translations) ? saved as Language : 'en';
  });

  const t = translations[language];

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return {
    language,
    t,
    changeLanguage
  };
};