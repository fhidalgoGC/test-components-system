import { useState } from 'react';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { libraryDashboardTranslations } from '../i18n';

const LANGUAGE_KEY = 'library-dashboard-language';

export const useLibraryDashboard = () => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  });

  // Use hierarchical translations with fallback to global translations
  const { t } = useHierarchicalTranslations(
    libraryDashboardTranslations[language], 
    language
  );

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_KEY, newLanguage);
  };

  return {
    language,
    t,
    changeLanguage
  };
};