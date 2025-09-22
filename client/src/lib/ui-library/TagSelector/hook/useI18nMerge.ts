import { useContext } from 'react';
import { getLocalDict } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../utils';
import { useLibI18n } from '../../providers/LibI18nProvider';

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder }
) {
  // Obtener el contexto del LibI18nProvider para traducciones externas
  const libI18n = useLibI18n();
  
  // Usar el idioma del provider padre o el override
  const lang = langOverride ?? libI18n.lang;
  
  // Obtener traducciones locales del componente (carpeta i18n/)
  const local = getLocalDict(lang);
  
  // Crear traductor que combina traducciones locales con externas
  // El orden se hereda del provider, pero se puede overridear localmente
  const order = opts?.order ?? 'local-first';
  const t = makeTranslator(local as any, undefined, order);
  
  return { lang, t };
}