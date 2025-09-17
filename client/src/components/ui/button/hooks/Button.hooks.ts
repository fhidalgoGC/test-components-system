import { useTheme } from "next-themes";
import { type SupportedLanguage, useHierarchicalTranslations } from "@/i18n";
import { buttonTranslations } from "../i18n/index";

export function useButton(language: SupportedLanguage = 'es') {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const { t } = useHierarchicalTranslations(
    buttonTranslations[language] || buttonTranslations.es, 
    language
  );

  return {
    theme: currentTheme,
    t,
    language
  };
}