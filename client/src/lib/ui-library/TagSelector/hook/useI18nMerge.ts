import { getLocalDict } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../utils';

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder }
) {
  // No conditional hook calls - always use the same logic flow
  const lang = langOverride ?? 'en';
  const local = getLocalDict(lang);
  
  // Using local-first approach without global dictionary
  // If a global language system is needed later, it should be provided via props or context
  const t = makeTranslator(local as any, undefined, opts?.order ?? 'local-first');
  
  return { lang, t };
}