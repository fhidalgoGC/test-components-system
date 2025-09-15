import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokens } from './tokens';

const ThemeContext = createContext<{ 
  theme: 'light' | 'dark'; 
  tokens: typeof tokens;
  toggleTheme: () => void;
}>({ 
  theme: 'light', 
  tokens,
  toggleTheme: () => {}
});

export const ThemeProvider: React.FC<{ 
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, tokens, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
