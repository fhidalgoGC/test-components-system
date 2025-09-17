import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { notFoundTranslations } from '../i18n';

export function useNotFound() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Get language from localStorage or default to 'es'
  const language: SupportedLanguage = (localStorage.getItem('app-language') as SupportedLanguage) || 'es';
  
  // Use hierarchical translations
  const { t: getTranslation } = useHierarchicalTranslations(
    notFoundTranslations[language], 
    language
  );
  
  // Create translation object for easier access
  const t = notFoundTranslations[language];

  return {
    t,
    currentTheme
  };
}