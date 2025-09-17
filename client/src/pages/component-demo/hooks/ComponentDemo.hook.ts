import { useState } from 'react';
import { useTheme } from 'next-themes';
import type { MenuItem } from '@/components/sidebar';
import { useHierarchicalTranslations, type SupportedLanguage } from '@/i18n';
import { componentDemoTranslations } from '../i18n';

export function useComponentDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const [currentPath, setCurrentPath] = useState('/');
  
  // Get language from localStorage or default to 'es'
  const language: SupportedLanguage = (localStorage.getItem('app-language') as SupportedLanguage) || 'es';
  
  // Use hierarchical translations
  const { t: getTranslation } = useHierarchicalTranslations(
    componentDemoTranslations[language], 
    language
  );
  
  // Create translation object for easier access
  const t = componentDemoTranslations[language];

  const menuItems: MenuItem[] = [
    {
      id: 'overview',
      label: t.menu.overview,
      icon: 'Home',
      path: '/'
    },
    {
      id: 'components',
      label: t.menu.components,
      icon: 'Package',
      children: [
        { id: 'button', label: 'Button', path: '/components/button', description: t.menu.button_description },
        { id: 'input', label: 'Input', path: '/components/input', description: t.menu.input_description },
        { id: 'modal', label: 'Modal', path: '/components/modal', description: t.menu.modal_description }
      ]
    },
    {
      id: 'layouts',
      label: t.menu.layouts,
      icon: 'Layout',
      children: [
        { id: 'grid', label: 'Grid', path: '/layouts/grid', description: t.menu.grid_description },
        { id: 'flex', label: 'Flex', path: '/layouts/flex', description: t.menu.flex_description }
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log('Navigation to:', path);
  };

  return {
    currentPath,
    menuItems,
    currentTheme,
    t,
    handleNavigation
  };
}