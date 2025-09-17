import { useTheme } from "next-themes";
import { type SupportedLanguage, useHierarchicalTranslations } from "@/i18n";
import { cardTranslations } from "../i18n/index";

export function useCard(language: SupportedLanguage = 'es') {
  const { resolvedTheme } = useTheme();
  const currentTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  const { t } = useHierarchicalTranslations(
    cardTranslations[language] || cardTranslations.es, 
    language
  );

  return {
    theme: currentTheme,
    t,
    language
  };
}