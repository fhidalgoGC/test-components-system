import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { notFoundTranslations } from '../i18n';

export function useNotFound() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Get language from localStorage or default to 'es'
  const language: SupportedLanguage = (localStorage.getItem('app-language') as SupportedLanguage) || 'es';
  
  // Use hierarchical translations with fallback to global translations
  const { t } = useHierarchicalTranslations(
    notFoundTranslations[language], 
    language
  );

  return {
    t,
    currentTheme
  };
}