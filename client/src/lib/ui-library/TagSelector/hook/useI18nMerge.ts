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
  
  // Obtener traducciones externas del provider
  const external = libI18n.getExternalTranslations();
  
  // Determinar el orden de prioridad
  // 1. Si se pasa localmente, usar esa preferencia
  // 2. Si no, usar la configuración del provider
  // 3. Por defecto, component-first (local-first)
  const effectiveOrder = opts?.order ?? 
    (libI18n.translationPriority === 'component-first' ? 'local-first' : 'global-first');
  
  // Crear traductor que combina traducciones locales con externas
  const t = makeTranslator(local as any, external, effectiveOrder);
  
  return { lang, t };
}