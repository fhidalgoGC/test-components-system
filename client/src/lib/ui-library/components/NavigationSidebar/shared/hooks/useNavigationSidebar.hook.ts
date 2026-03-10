import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import type { NavigationSidebarProps, NavigationItem, UseNavigationSidebarReturn } from '../types';
import { LibI18nContext } from '../../../../providers/AppLanguageLibUiProvider/index.hook';

function useOptionalLibI18n() {
  return useContext(LibI18nContext);
}

const isPathActive = (path: string, currentPath: string): boolean => {
  if (!currentPath || !path) return false;
  return currentPath === path || currentPath.startsWith(path + '/');
};

const getExpandedItemsFromPath = (items: NavigationItem[], currentPath: string): Set<string> => {
  const expanded = new Set<string>();
  items.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(child => isPathActive(child.path, currentPath));
      if (hasActiveChild) {
        expanded.add(item.id);
      }
    }
  });
  return expanded;
};

export function useNavigationSidebar(props: NavigationSidebarProps): UseNavigationSidebarReturn {
  const {
    items,
    currentPath: propPath,
    defaultCollapsed = false,
    currentLanguage: propLanguage,
    currentTheme: propTheme,
    onNavigate,
    onThemeChange,
    onLanguageChange,
    onCollapseChange,
  } = props;

  const libI18n = useOptionalLibI18n();

  const [internalPath, setInternalPath] = useState<string>(propPath || '');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => 
    getExpandedItemsFromPath(items, propPath || '')
  );
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internalTheme, setInternalTheme] = useState<'light' | 'dark'>(() => {
    if (propTheme) return propTheme;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'light';
  });
  const [internalLanguage, setInternalLanguage] = useState<string>(() => {
    if (propLanguage) return propLanguage;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es';
    }
    return 'es';
  });

  const currentPath = propPath !== undefined ? propPath : internalPath;
  const currentTheme = propTheme ?? internalTheme;
  const currentLanguage = libI18n?.lang ?? propLanguage ?? internalLanguage;

  useEffect(() => {
    if (propPath !== undefined) {
      setInternalPath(propPath);
    }
  }, [propPath]);

  useEffect(() => {
    if (propTheme) return;
    const html = document.documentElement;
    if (currentTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [currentTheme, propTheme]);

  const processedItems = useMemo<NavigationItem[]>(() => {
    return items.map(item => {
      const hasActiveChild = item.children?.some(child => isPathActive(child.path, currentPath));
      const isItemActive = item.path ? isPathActive(item.path, currentPath) : false;
      
      return {
        ...item,
        isActive: isItemActive || hasActiveChild,
        children: item.children?.map(child => ({
          ...child,
          isActive: isPathActive(child.path, currentPath)
        }))
      };
    });
  }, [items, currentPath]);

  const toggleItemExpansion = useCallback((id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleNavigation = useCallback((path: string) => {
    if (propPath === undefined) {
      setInternalPath(path);
      const newExpanded = getExpandedItemsFromPath(items, path);
      setExpandedItems(prev => new Set([...Array.from(prev), ...Array.from(newExpanded)]));
    }
    if (onNavigate) {
      onNavigate(path);
    }
  }, [propPath, items, onNavigate]);

  const handleThemeToggle = useCallback(() => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (!propTheme) {
      setInternalTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      const html = document.documentElement;
      if (newTheme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
    
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  }, [currentTheme, propTheme, onThemeChange]);

  const handleLanguageChange = useCallback((language: string) => {
    if (libI18n?.setLanguage) {
      libI18n.setLanguage(language as 'en' | 'es');
    }
    
    if (!propLanguage) {
      setInternalLanguage(language);
      localStorage.setItem('language', language);
    }
    
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  }, [libI18n, propLanguage, onLanguageChange]);

  const handleToggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return {
    processedItems,
    expandedItems,
    isCollapsed,
    isMobileMenuOpen,
    currentTheme,
    currentLanguage,
    currentPath,
    toggleItemExpansion,
    handleNavigation,
    handleThemeToggle,
    handleLanguageChange,
    handleToggleCollapse,
    handleToggleMobileMenu,
  };
}
