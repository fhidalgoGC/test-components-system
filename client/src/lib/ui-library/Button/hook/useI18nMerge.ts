import { getLocalDict } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../utils';

type LangHook = () => { lang: string; dict?: Record<string, string> };
declare const useLanguage: LangHook;

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder } // optional
) {
  let lang = 'en';
  let globalDict: Record<string, string> | undefined;

  try {
    const g = (useLanguage as LangHook)?.();
    lang = g?.lang ?? 'en';
    globalDict = g?.dict;
  } catch { /* safe fallback */ }

  if (langOverride) lang = langOverride;
  const local = getLocalDict(lang);

  // ⬇️ now defaults to local-first
  const t = makeTranslator(local as any, globalDict, opts?.order ?? 'local-first');
  return { lang, t };
}
