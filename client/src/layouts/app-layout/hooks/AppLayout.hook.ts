import { useLocation } from 'wouter';
import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { getDefaultMenuItems, handleNavigation } from '../utils/AppLayout.utils';
import type { AppLayoutProps } from '../types/AppLayout.types';
import { appLayoutTranslations } from '../i18n';

export function useAppLayout(props: AppLayoutProps) {
  // Get language from localStorage or default to 'es'
  const language: SupportedLanguage = (localStorage.getItem('app-language') as SupportedLanguage) || 'es';
  
  // Use hierarchical translations
  const { t: getTranslation } = useHierarchicalTranslations(
    appLayoutTranslations[language], 
    language
  );
  
  // Create translation object for easier access
  const translations = appLayoutTranslations[language];

  const {
    headerTitle = translations.defaults.title,
    headerDescription = translations.defaults.description,
    showActionButtons = true
  } = props;

  const [location] = useLocation();
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';

  const menuItems = getDefaultMenuItems();

  return {
    location,
    currentTheme,
    menuItems,
    headerTitle,
    headerDescription,
    showActionButtons,
    handleNavigation
  };
}