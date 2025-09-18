import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { buttonDemoTranslations } from '../i18n';

export function useButtonDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Use reactive hierarchical translations
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    buttonDemoTranslations
  );

  return {
    t,
    language,
    changeLanguage,
    currentTheme
  };
}