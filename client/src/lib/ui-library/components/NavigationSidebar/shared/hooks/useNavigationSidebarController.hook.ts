import { useState, useCallback } from 'react';
import type { NavigationSidebarController } from '../types';

export function useNavigationSidebarController(
  initialPath: string = ''
): NavigationSidebarController {
  const [currentPath, setCurrentPathState] = useState<string>(initialPath);
  const [isCollapsed, setIsCollapsedState] = useState<boolean>(false);
  const [currentTheme, setCurrentThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'light';
  });
  const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  });

  const setCurrentPath = useCallback((path: string) => {
    setCurrentPathState(path);
  }, []);

  const setIsCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsedState(collapsed);
  }, []);

  const setCurrentTheme = useCallback((theme: 'light' | 'dark') => {
    setCurrentThemeState(theme);
    localStorage.setItem('theme', theme);
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const setCurrentLanguage = useCallback((language: string) => {
    setCurrentLanguageState(language);
    localStorage.setItem('language', language);
  }, []);

  return {
    currentPath,
    setCurrentPath,
    isCollapsed,
    setIsCollapsed,
    currentTheme,
    setCurrentTheme,
    currentLanguage,
    setCurrentLanguage,
  };
}
