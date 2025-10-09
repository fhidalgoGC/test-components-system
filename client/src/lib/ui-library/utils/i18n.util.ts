import type { MultiLanguageLabel, LabelOrMultiLanguage } from '../types';

export type TranslationOrder = 'global-first' | 'local-first';

export function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
}

export function makeTranslator(
  local?: Record<string, string>,
  global?: Record<string, string>,
  order: TranslationOrder = 'local-first' // ⬅️ now local-first by default
) {
  return (key: string, params?: Record<string, string | number>) => {
    let value: string | undefined;
    if (order === 'global-first') {
      value = global?.[key] ?? local?.[key];
    } else {
      value = local?.[key] ?? global?.[key];
    }
    return interpolate(value ?? key, params);
  };
}

/**
 * Resolves a MultiLanguageLabel to a string based on the current language
 * @param label - The label to resolve (can be string or MultiLanguageLabel)
 * @param lang - Current language code (e.g., 'en', 'es', 'fr')
 * @returns The resolved string in the appropriate language
 * 
 * @example
 * const label = { en: "Hello", es: "Hola", default: "Hello" };
 * resolveMultiLanguageLabel(label, "es"); // Returns "Hola"
 * resolveMultiLanguageLabel(label, "fr"); // Returns "Hello" (default)
 * resolveMultiLanguageLabel("Simple text", "es"); // Returns "Simple text"
 * 
 * @example With metadata (ignored during resolution)
 * const label = { 
 *   en: "Hello", 
 *   es: "Hola", 
 *   default: "Hello",
 *   metadata: { tone: "formal" }
 * };
 * resolveMultiLanguageLabel(label, "es"); // Returns "Hola"
 */
export function resolveMultiLanguageLabel(
  label: LabelOrMultiLanguage,
  lang: string = 'en'
): string {
  // If it's a simple string, return it as-is
  if (typeof label === 'string') {
    return label;
  }

  // If it's a MultiLanguageLabel object
  const normalizedLang = lang.toLowerCase();
  
  // Reserved keys that are not language codes
  const reservedKeys = ['default', 'metadata'];
  
  // Try exact match first (excluding reserved keys)
  if (label[normalizedLang] && typeof label[normalizedLang] === 'string') {
    return label[normalizedLang];
  }

  // Try language prefix (e.g., "en" for "en-US")
  const langPrefix = normalizedLang.split('-')[0];
  if (langPrefix !== normalizedLang && label[langPrefix] && typeof label[langPrefix] === 'string') {
    return label[langPrefix];
  }

  // Try finding any key that starts with the language prefix
  const matchingKey = Object.keys(label).find(key => 
    !reservedKeys.includes(key) && 
    typeof label[key] === 'string' &&
    key.toLowerCase().startsWith(langPrefix)
  );
  if (matchingKey) {
    return label[matchingKey];
  }

  // Fallback to default
  if (typeof label.default === 'string') {
    return label.default;
  }

  // Last resort: find first string value
  const firstStringValue = Object.entries(label).find(
    ([key, value]) => !reservedKeys.includes(key) && typeof value === 'string'
  );
  
  return firstStringValue?.[1] || '';
}

/**
 * Creates a simple MultiLanguageLabel from a string
 * @param text - The text to use for all languages
 * @returns A MultiLanguageLabel with the same text for all fields
 * 
 * @example
 * createSimpleLabel("Hello"); // Returns { default: "Hello" }
 */
export function createSimpleLabel(text: string): MultiLanguageLabel {
  return { default: text };
}

/**
 * Creates a MultiLanguageLabel from translations object
 * @param translations - Object with language codes as keys
 * @param defaultLang - Which language to use as default (defaults to 'en')
 * @returns A MultiLanguageLabel with proper default fallback
 * 
 * @example
 * createMultiLanguageLabel({ en: "Hello", es: "Hola" }); 
 * // Returns { en: "Hello", es: "Hola", default: "Hello" }
 */
export function createMultiLanguageLabel(
  translations: Record<string, string>,
  defaultLang: string = 'en'
): MultiLanguageLabel {
  const defaultValue = translations[defaultLang] || translations['en'] || Object.values(translations)[0] || '';
  
  return {
    ...translations,
    default: defaultValue
  };
}

/**
 * Checks if a value is a MultiLanguageLabel object
 * @param value - Value to check
 * @returns true if value is a MultiLanguageLabel
 * 
 * @example
 * isMultiLanguageLabel({ en: "Hello", default: "Hello" }); // true
 * isMultiLanguageLabel("Hello"); // false
 */
export function isMultiLanguageLabel(value: any): value is MultiLanguageLabel {
  return (
    typeof value === 'object' &&
    value !== null &&
    'default' in value &&
    typeof value.default === 'string'
  );
}