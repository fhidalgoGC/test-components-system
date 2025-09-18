import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { usePageHeader } from '@/hooks/usePageHeader';
import { buttonDemoTranslations } from '../i18n';

export function useButtonDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Use reactive hierarchical translations
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    buttonDemoTranslations
  );

  const { setPageHeader } = usePageHeader();

  // Set page header with reactive translations
  useEffect(() => {
    setPageHeader({
      title: t('componentName') || 'Button',
      description: t('componentDescription') || 'Main button component',
      showActionButtons: false
    });
  }, [t, setPageHeader]);

  return {
    t,
    language,
    changeLanguage,
    currentTheme
  };
}