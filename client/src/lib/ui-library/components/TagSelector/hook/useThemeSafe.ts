import { useTheme } from '../../theme';

export function useThemeSafe() {
  // Always call useTheme - no conditional hook calls
  // If ThemeProvider is not set up, useTheme will return the default context value
  const themeContext = useTheme();
  
  // Return theme or fallback to 'light' if context is null/undefined
  return { 
    theme: themeContext?.theme ?? 'light' as const
  };
}