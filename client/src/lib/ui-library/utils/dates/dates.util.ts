import { useMemo } from "react";
import { useLanguageProviderResolver } from "../../providers/utils/AppProviderLanguageResolver";

/**
 * Normaliza diferentes tipos de entrada de fecha a un objeto Date válido o null
 */
function normalizeDate(
  input: Date | string | number | null | undefined,
): Date | null {
  if (!input && input !== 0) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Formatea una fecha según el patrón especificado
 * Soporta: dd, MM, yyyy
 */
function formatDateWithPattern(
  date: Date,
  pattern: string,
  twoDigits: boolean,
): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses empiezan en 0
  const year = date.getFullYear();

  const dd = twoDigits ? String(day).padStart(2, "0") : String(day);
  const MM = twoDigits ? String(month).padStart(2, "0") : String(month);
  const yyyy = String(year);

  return pattern.replace("dd", dd).replace("MM", MM).replace("yyyy", yyyy);
}

function useDateConfig() {
  const { lang, config } = useLanguageProviderResolver();

  return useMemo(() => {
    // Fallback de configuración de fechas si no existe en el config
    const dateFormat = config?.dateFormat || "MM/dd/yyyy";
    const twoDigits = config?.twoDigits ?? true;

    return {
      dateFormat,
      twoDigits,
      lang,
    };
  }, [config, lang]);
}

export function useDateFormatter() {
  const { dateFormat, twoDigits } = useDateConfig();

  return useMemo(
    () => (dateInput: Date | string | number | null | undefined) => {
      const date = normalizeDate(dateInput);
      if (!date) return "";
      return formatDateWithPattern(date, dateFormat, twoDigits);
    },
    [dateFormat, twoDigits],
  );
}

export function useFormattedDate(
  dateInput: Date | string | number | null | undefined,
): string {
  const formatter = useDateFormatter();
  const date = useMemo(() => normalizeDate(dateInput), [dateInput]);
  return useMemo(() => (date ? formatter(date) : ""), [date, formatter]);
}

export function formatDate(
  dateInput: Date | string | number | null | undefined,
  dateFormat: string,
  twoDigits: boolean = true,
): string {
  const date = normalizeDate(dateInput);
  if (!date) return "";
  return formatDateWithPattern(date, dateFormat, twoDigits);
}
