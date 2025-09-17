import { useState, useEffect } from 'react';
import type { NavbarProps, NavbarState } from './Navbar.types';
import { getStoredTheme, formatTitle, formatDescription } from './Navbar.utils';

export const useNavbar = (props: NavbarProps) => {
  const { title, description } = props;
  
  const [state, setState] = useState<NavbarState>({
    currentTheme: getStoredTheme()
  });

  // Listen for theme changes from other components (like Sidebar)
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = getStoredTheme();
      setState(prev => ({ ...prev, currentTheme: theme }));
    };

    // Listen for theme changes in localStorage
    window.addEventListener('storage', handleThemeChange);
    
    // Listen for manual theme changes
    const observer = new MutationObserver(() => {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      const newTheme = isDark ? 'dark' : 'light';
      setState(prev => ({ ...prev, currentTheme: newTheme }));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Initial theme setup
    handleThemeChange();

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const formattedTitle = formatTitle(title);
  const formattedDescription = formatDescription(description);

  return {
    formattedTitle,
    formattedDescription,
    currentTheme: state.currentTheme
  };
};