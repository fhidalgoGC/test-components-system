import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { tagSelectorDemoTranslations } from '../i18n';

export function useTagSelectorDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Use reactive hierarchical translations
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    tagSelectorDemoTranslations
  );

  return {
    t,
    language,
    changeLanguage,
    currentTheme
  };
}