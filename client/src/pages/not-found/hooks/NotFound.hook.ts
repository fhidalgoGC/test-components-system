import { useTheme } from 'next-themes';
import { getNotFoundTranslations } from '../i18n';

export function useNotFound() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Using default language for now - can be extended later
  const t = getNotFoundTranslations('es');

  return {
    t,
    currentTheme
  };
}