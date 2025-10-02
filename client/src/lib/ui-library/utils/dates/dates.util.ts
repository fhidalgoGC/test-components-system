import { useMemo } from 'react';
import { useAppLanguage } from '../../providers/AppLanguageProvider/index.hook';

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
 * Hook que devuelve una función estable para formatear fechas según el idioma del provider.
 * Útil cuando vas a formatear muchas fechas en una lista.
 * 
 * @example
 * ```tsx
 * const formatter = useDateFormatter();
 * const formattedDate = formatter(new Date());
 * ```
 */
export function useDateFormatter() {
  const appLang = useAppLanguage();
  
  if (!appLang) {
    throw new Error('useDateFormatter must be used within AppLanguageProvider');
  }

  const { dateFormat, twoDigits } = appLang;

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
 * Reactivo al cambio de idioma del AppLanguageProvider.
 * 
 * @example
 * ```tsx
 * const formattedDate = useFormattedDate(new Date());
 * // Español: "05/01/2024"
 * // Inglés: "01/05/2024"
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
