import { getLocalDictionary } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../../../../utils';
import { useLibI18n } from '../../../../providers/AppLanguageLibUiProvider/index.hook';

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder }
) {
  const libI18n = useLibI18n();
  const lang = langOverride ?? libI18n.lang;
  const local = getLocalDictionary(lang);
  const external = libI18n.getExternalTranslations();
  
  const effectiveOrder = opts?.order ?? 
    (libI18n.translationPriority === 'component-first' ? 'local-first' : 'global-first');
  
  const t = makeTranslator(local as any, external, effectiveOrder);
  
  return { lang, t };
}
