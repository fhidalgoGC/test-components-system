import { useLocation } from 'wouter';
import { useTheme } from 'next-themes';
import { getDefaultMenuItems, handleNavigation } from './AppLayout.utils';
import type { AppLayoutProps } from './AppLayout.types';

export function useAppLayout(props: AppLayoutProps) {
  const {
    headerTitle = "UI Library",
    headerDescription = "React + TypeScript modular component system",
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