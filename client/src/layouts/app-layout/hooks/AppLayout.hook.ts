import { useLocation } from 'wouter';
import { useTheme } from 'next-themes';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { getDefaultMenuItems, handleNavigation } from '../utils/AppLayout.utils';
import type { AppLayoutProps } from '../types/AppLayout.types';
import { appLayoutTranslations } from '../i18n';

export function useAppLayout(props: AppLayoutProps) {
  // Use reactive hierarchical translations
  const { t, language, changeLanguage } = useHierarchicalTranslations(
    appLayoutTranslations
  );

  const {
    headerTitle = t('defaults.title') || "UI Library",
    headerDescription = t('defaults.description') || "React + TypeScript modular component system",
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
    language,
    changeLanguage,
    handleNavigation
  };
}