import { useMemo } from 'react';
import { useAppLanguage } from '../../providers/AppLanguageProvider/index.hook';
import { useLibI18n } from '../../providers/AppLanguageLibUiProvider/index.hook';
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
 * Prioridad: AppLanguageProvider > LibI18nProvider > Config interno por defecto
 * 
 * NOTA: AppLanguageProvider ya lee del ConfigProvider merged, por lo que este hook
 * solo necesita leer de los providers, no directamente del ConfigContext.
 */
function useDateConfig() {
  // Prioridad 1: AppLanguageProvider (ya incluye config merged del ConfigProvider)
  const appLang = useAppLanguage();
  
  // Prioridad 2: LibI18nProvider (también lee del ConfigProvider via useOptionalConfig)
  let libI18n;
  try {
    libI18n = useLibI18n();
  } catch {
    // LibI18nProvider no está disponible
    libI18n = null;
  }

  return useMemo(() => {
    // Prioridad 1: Si existe AppLanguageProvider, usar su configuración
    // (AppLanguageProvider ya leyó del ConfigProvider merged)
    if (appLang) {
      return {
        dateFormat: appLang.dateFormat,
        twoDigits: appLang.twoDigits,
        lang: appLang.lang,
      };
    }

    // Prioridad 2: Si existe LibI18nProvider, obtener config del environment interno
    // (LibI18nProvider lee del ConfigProvider via useOptionalConfig si está disponible)
    if (libI18n) {
      const config = INTERNAL_LANGUAGE_CONFIG[libI18n.lang] || INTERNAL_LANGUAGE_CONFIG[INTERNAL_DEFAULT_LANGUAGE];
      return {
        dateFormat: config.dateFormat,
        twoDigits: config.twoDigits,
        lang: libI18n.lang,
      };
    }

    // Prioridad 3: Usar configuración del environment interno por defecto
    const defaultConfig = INTERNAL_LANGUAGE_CONFIG[INTERNAL_DEFAULT_LANGUAGE];
    return {
      dateFormat: defaultConfig.dateFormat,
      twoDigits: defaultConfig.twoDigits,
      lang: INTERNAL_DEFAULT_LANGUAGE,
    };
  }, [appLang, libI18n]);
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
