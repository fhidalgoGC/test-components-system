import { useTheme } from 'next-themes';
import { getTagSelectorDemoTranslations } from '../i18n';

export function useTagSelectorDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Using default language for now - can be extended later
  const t = getTagSelectorDemoTranslations('es');

  return {
    t,
    currentTheme
  };
}