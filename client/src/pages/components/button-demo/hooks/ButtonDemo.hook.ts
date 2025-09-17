import { useTheme } from 'next-themes';
import { getButtonDemoTranslations } from '../i18n';

export function useButtonDemo() {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  // Using default language for now - can be extended later
  const t = getButtonDemoTranslations('es');

  return {
    t,
    currentTheme
  };
}