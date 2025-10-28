import { getLocalDict } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../../../../utils';
import { useLibI18n } from '../../../../providers/AppLanguageLibUiProvider/index.hook';

function flattenDict(obj: any, prefix = ''): Record<string, string> {
  let result: Record<string, string> = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenDict(obj[key], fullKey));
    } else {
      result[fullKey] = String(obj[key]);
    }
  }
  return result;
}

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder }
) {
  const libI18n = useLibI18n();
  const lang = langOverride ?? libI18n.lang;
  const local = flattenDict(getLocalDict(lang));
  const external = libI18n.getExternalTranslations();
  
  const effectiveOrder = opts?.order ?? 
    (libI18n.translationPriority === 'component-first' ? 'local-first' : 'global-first');
  
  const t = makeTranslator(local, external, effectiveOrder);
  
  return { lang, t };
}
