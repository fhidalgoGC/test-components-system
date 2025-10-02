import { useMemo } from 'react';
import { useLanguageProviderResolver } from '../../providers/utils/AppProviderLanguageResolver';

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
 * 
 * Prioridad (manejada por useLanguageProviderResolver):
 * 1. LibI18nProvider (provider de la librería) - si existe
 * 2. AppLanguageProvider (provider padre) - si existe  
 * 3. ConfigProvider merged - como fallback
 * 
 * Toda la configuración viene del ConfigProvider merged.
 */
function useDateConfig() {
  const { lang, config } = useLanguageProviderResolver();
  
  return useMemo(() => {
    // Fallback de configuración de fechas si no existe en el config
    const dateFormat = config?.dateFormat || 'MM/dd/yyyy';
    const twoDigits = config?.twoDigits ?? true;
    
    return {
      dateFormat,
      twoDigits,
      lang,
    };
  }, [config, lang]);
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
 * Obtener configuración de fecha para un idioma específico
 * 
 * NOTA: Esta función NO puede acceder al ConfigProvider merged porque no es un hook.
 * Solo usa el environment interno de la librería.
 * Para usar el config merged, debes usar los hooks de React (useDateFormatter, useFormattedDate).
 * 
 * @deprecated Considera usar hooks de React para acceder al config merged.
 * 
 * @example
 * ```ts
 * // Solo para uso fuera de componentes React
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
