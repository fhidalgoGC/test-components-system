/**
 * Number formatting utilities for UI components
 */

export interface NumberFormatOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  options: NumberFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    currency = 'USD',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(
  value: number,
  options: NumberFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping
  }).format(value);
}

/**
 * Format a number as percentage
 */
export function formatPercentage(
  value: number,
  options: NumberFormatOptions = {}
): string {
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 1
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value / 100);
}

/**
 * Compact number formatting (1K, 1M, 1B, etc.)
 */
export function formatCompactNumber(
  value: number,
  options: { locale?: string; notation?: 'compact' | 'standard' } = {}
): string {
  const { locale = 'en-US', notation = 'compact' } = options;

  return new Intl.NumberFormat(locale, {
    notation,
    compactDisplay: 'short'
  }).format(value);
}