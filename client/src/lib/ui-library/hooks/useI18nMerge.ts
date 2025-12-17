import { makeTranslator, type TranslationOrder } from '../utils';
import { useLibI18n } from '../providers/AppLanguageLibUiProvider/index.hook';

export type LocalDictionaries = {
  [lang: string]: Record<string, string>;
};

export interface UseI18nMergeOptions {
  order?: TranslationOrder;
  langOverride?: string;
}

function getLocalDict(dictionaries: LocalDictionaries, lang: string): Record<string, string> {
  const normalizedLang = lang.toLowerCase();
  
  if (dictionaries[normalizedLang]) {
    return dictionaries[normalizedLang];
  }
  
  const langPrefix = normalizedLang.split('-')[0];
  if (dictionaries[langPrefix]) {
    return dictionaries[langPrefix];
  }
  
  return dictionaries['en'] || dictionaries[Object.keys(dictionaries)[0]] || {};
}

export function useI18nMerge(
  localDictionaries: LocalDictionaries,
  opts?: UseI18nMergeOptions
) {
  const libI18n = useLibI18n();
  
  const lang = opts?.langOverride ?? libI18n.lang;
  
  const local = getLocalDict(localDictionaries, lang);
  
  const external = libI18n.getExternalTranslations();
  
  const effectiveOrder = opts?.order ?? 
    (libI18n.translationPriority === 'component-first' ? 'local-first' : 'global-first');
  
  const t = makeTranslator(local, external, effectiveOrder);
  
  return { lang, t };
}
