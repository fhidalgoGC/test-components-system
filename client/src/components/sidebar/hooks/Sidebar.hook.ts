import { useState, useEffect, useCallback } from 'react';
import type { SidebarProps, SidebarState, MenuItem } from '../types/Sidebar.types';
import { 
  updateMenuActiveStates, 
  getExpandedItems, 
  toggleTheme, 
  getStoredTheme,
  getStoredLanguage
} from '../utils/Sidebar.utils';
import { useAppLanguage } from '../../../providers/AppLanguageProvider';

export const useSidebar = (props: SidebarProps) => {
  const { menuItems, currentPath = '', onNavigate } = props;
  const appLanguage = useAppLanguage();
  
  const [state, setState] = useState<SidebarState>({
    expandedItems: new Set(),
    currentLanguage: appLanguage?.lang || getStoredLanguage(),
    currentTheme: getStoredTheme()
  });

  // Initialize theme on mount
  useEffect(() => {
    const theme = getStoredTheme();
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    setState(prev => ({ ...prev, currentTheme: theme }));
  }, []);

  // Update expanded items based on current path
  useEffect(() => {
    const expandedItems = getExpandedItems(menuItems, currentPath);
    setState(prev => ({ ...prev, expandedItems }));
  }, [menuItems, currentPath]);

  // Sync with AppLanguageProvider
  useEffect(() => {
    if (appLanguage) {
      setState(prev => ({ ...prev, currentLanguage: appLanguage.lang }));
    }
  }, [appLanguage?.lang]);

  const processedMenuItems = updateMenuActiveStates(menuItems, currentPath);

  const toggleItemExpansion = useCallback((itemId: string) => {
    setState(prev => {
      const newExpanded = new Set(prev.expandedItems);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return { ...prev, expandedItems: newExpanded };
    });
  }, []);

  const handleNavigation = useCallback((path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  }, [onNavigate]);

  const handleThemeToggle = useCallback(() => {
    const newTheme = toggleTheme();
    setState(prev => ({ ...prev, currentTheme: newTheme }));
  }, []);

  const handleLanguageChange = useCallback((language: string) => {
    if (appLanguage) {
      appLanguage.setLang(language as 'es' | 'en');
    }
    setState(prev => ({ ...prev, currentLanguage: language }));
  }, [appLanguage]);

  return {
    processedMenuItems,
    expandedItems: state.expandedItems,
    currentLanguage: state.currentLanguage,
    currentTheme: state.currentTheme,
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange
  };
};