import { useTheme } from "next-themes";
import { type SupportedLanguage, useHierarchicalTranslations } from "@/i18n";
import { inputTranslations } from "../i18n/index";

export function useInput(language: SupportedLanguage = 'es') {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const { t } = useHierarchicalTranslations(
    inputTranslations[language] || inputTranslations.es, 
    language
  );

  return {
    theme: currentTheme,
    t,
    language
  };
}