import type { MenuItem, SubMenuItem } from './Sidebar.types';

export const isPathActive = (path: string, currentPath: string): boolean => {
  if (!currentPath || !path) return false;
  return currentPath === path || currentPath.startsWith(path + '/');
};

export const findActiveItem = (menuItems: MenuItem[], currentPath: string): { item: MenuItem | null, subItem: SubMenuItem | null } => {
  for (const item of menuItems) {
    if (item.path && isPathActive(item.path, currentPath)) {
      return { item, subItem: null };
    }
    
    if (item.children) {
      for (const subItem of item.children) {
        if (isPathActive(subItem.path, currentPath)) {
          return { item, subItem };
        }
      }
    }
  }
  
  return { item: null, subItem: null };
};

export const updateMenuActiveStates = (menuItems: MenuItem[], currentPath: string): MenuItem[] => {
  return menuItems.map(item => {
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
};

export const getExpandedItems = (menuItems: MenuItem[], currentPath: string): Set<string> => {
  const expanded = new Set<string>();
  
  menuItems.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(child => isPathActive(child.path, currentPath));
      if (hasActiveChild) {
        expanded.add(item.id);
      }
    }
  });
  
  return expanded;
};

export const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  if (newTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  
  localStorage.setItem('theme', newTheme);
  return newTheme;
};

export const getStoredTheme = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return 'light';
};

export const getStoredLanguage = (): string => {
  return localStorage.getItem('language') || 'es';
};

export const setStoredLanguage = (language: string): void => {
  localStorage.setItem('language', language);
};