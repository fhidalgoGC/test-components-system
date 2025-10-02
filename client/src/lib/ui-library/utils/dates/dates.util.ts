import { useMemo, useContext } from 'react';
import { useAppLanguage } from '../../providers/AppLanguageProvider/index.hook';
import { useLibI18n } from '../../providers/AppLanguageLibUiProvider/index.hook';
import { ConfigContext } from '../../providers/AppEnviromentProvider/index.hook';
import { LANGUAGE_CONFIG as INTERNAL_LANGUAGE_CONFIG, DEFAULT_LANGUAGE as INTERNAL_DEFAULT_LANGUAGE } from '../../enviorments/enviroment';

/**
 * Normaliza diferentes tipos de entrada de fecha a un objeto Date válido o null
 */
function normalizeDate(input: Date | string | number | null | undefined): Date | null {
  if (!input && input !== 0) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Formatea una fecha según el patrón especificado
 * Soporta: dd, MM, yyyy
 */
function formatDateWithPattern(date: Date, pattern: string, twoDigits: boolean): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses empiezan en 0
  const year = date.getFullYear();

  const dd = twoDigits ? String(day).padStart(2, '0') : String(day);
  const MM = twoDigits ? String(month).padStart(2, '0') : String(month);
  const yyyy = String(year);

  return pattern
    .replace('dd', dd)
    .replace('MM', MM)
    .replace('yyyy', yyyy);
}

/**
 * Hook interno para obtener configuración de fecha desde cualquier provider disponible
 * Prioridad: AppLanguageProvider > LibI18nProvider > ConfigProvider > Config interno por defecto
 */
function useDateConfig() {
  // Intentar obtener de AppLanguageProvider (provider padre)
  const appLang = useAppLanguage();
  
  // Intentar obtener de LibI18nProvider (provider de librería)
  let libI18n;
  try {
    libI18n = useLibI18n();
  } catch {
    // LibI18nProvider no está disponible
    libI18n = null;
  }

  // Intentar obtener LANGUAGE_CONFIG del ConfigProvider merged
  const configContext = useContext(ConfigContext);
  const mergedConfig = configContext?.config;

  return useMemo(() => {
    // Determinar qué LANGUAGE_CONFIG usar (merged o interno)
    const LANGUAGE_CONFIG = mergedConfig?.LANGUAGE_CONFIG || INTERNAL_LANGUAGE_CONFIG;
    const DEFAULT_LANGUAGE = mergedConfig?.DEFAULT_LANGUAGE || INTERNAL_DEFAULT_LANGUAGE;

    // Prioridad 1: Si existe AppLanguageProvider, usar su configuración (ya lee del ConfigProvider merged)
    if (appLang) {
      return {
        dateFormat: appLang.dateFormat,
        twoDigits: appLang.twoDigits,
        lang: appLang.lang,
      };
    }

    // Prioridad 2: Si existe LibI18nProvider, obtener config del merged o interno
    if (libI18n) {
      const config = LANGUAGE_CONFIG[libI18n.lang] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
      return {
        dateFormat: config.dateFormat,
        twoDigits: config.twoDigits,
        lang: libI18n.lang,
      };
    }

    // Prioridad 3: Usar configuración del ConfigProvider merged o interno por defecto
    const defaultConfig = LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
    return {
      dateFormat: defaultConfig.dateFormat,
      twoDigits: defaultConfig.twoDigits,
      lang: DEFAULT_LANGUAGE,
    };
  }, [appLang, libI18n, mergedConfig]);
}

/**
 * Hook que devuelve una función estable para formatear fechas.
 * Funciona con AppLanguageProvider, LibI18nProvider o standalone.
 * 
 * @example
 * ```tsx
 * // Con AppLanguageProvider
 * const formatter = useDateFormatter();
 * const formattedDate = formatter(new Date());
 * 
 * // Con LibI18nProvider (obtiene config del environment)
 * const formatter = useDateFormatter();
 * const formattedDate = formatter(new Date());
 * 
 * // Sin provider (usa config por defecto)
 * const formatter = useDateFormatter();
 * const formattedDate = formatter(new Date());
 * ```
 */
export function useDateFormatter() {
  const { dateFormat, twoDigits } = useDateConfig();

  return useMemo(
    () => (dateInput: Date | string | number | null | undefined) => {
      const date = normalizeDate(dateInput);
      if (!date) return '';
      return formatDateWithPattern(date, dateFormat, twoDigits);
    },
    [dateFormat, twoDigits]
  );
}

/**
 * Hook que devuelve directamente el string formateado para una fecha específica.
 * Funciona con AppLanguageProvider, LibI18nProvider o standalone.
 * 
 * @example
 * ```tsx
 * const formattedDate = useFormattedDate(new Date());
 * // Con AppLanguageProvider español: "05/01/2024"
 * // Con LibI18nProvider español: "05/01/2024"
 * // Sin provider (default inglés): "01/05/2024"
 * ```
 */
export function useFormattedDate(
  dateInput: Date | string | number | null | undefined
): string {
  const formatter = useDateFormatter();
  const date = useMemo(() => normalizeDate(dateInput), [dateInput]);
  return useMemo(() => (date ? formatter(date) : ''), [date, formatter]);
}

/**
 * Función de formateo de fecha sin hooks (para uso fuera de componentes React)
 * Requiere pasar manualmente el dateFormat y twoDigits
 * 
 * @example
 * ```ts
 * const formatted = formatDate(new Date(), 'dd/MM/yyyy', true);
 * ```
 */
export function formatDate(
  dateInput: Date | string | number | null | undefined,
  dateFormat: string,
  twoDigits: boolean = true
): string {
  const date = normalizeDate(dateInput);
  if (!date) return '';
  return formatDateWithPattern(date, dateFormat, twoDigits);
}

/**
 * Obtener configuración de fecha para un idioma específico
 * NOTA: Esta función usa el environment interno. Para usar el merged, usa hooks de React.
 * Útil para formateo manual sin hooks fuera de componentes React.
 * 
 * @example
 * ```ts
 * const esConfig = getDateConfigForLanguage('es');
 * const formatted = formatDate(new Date(), esConfig.dateFormat, esConfig.twoDigits);
 * ```
 */
export function getDateConfigForLanguage(lang: string) {
  return INTERNAL_LANGUAGE_CONFIG[lang] || INTERNAL_LANGUAGE_CONFIG[INTERNAL_DEFAULT_LANGUAGE];
}
