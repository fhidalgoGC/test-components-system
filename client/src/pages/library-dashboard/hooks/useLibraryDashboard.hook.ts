import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { libraryDashboardTranslations } from '../i18n';

export const useLibraryDashboard = () => {
  // Use reactive hierarchical translations system
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    libraryDashboardTranslations
  );

  return {
    language,
    t,
    changeLanguage
  };
};