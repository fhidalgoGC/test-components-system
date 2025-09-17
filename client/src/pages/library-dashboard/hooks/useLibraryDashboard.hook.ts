import { useState } from 'react';
import { getLibraryDashboardTranslations } from '../i18n';

const LANGUAGE_KEY = 'library-dashboard-language';

type Language = 'es' | 'en';

export const useLibraryDashboard = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  });

  const t = getLibraryDashboardTranslations(language);

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