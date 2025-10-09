// Language system types for the UI library

/**
 * MultiLanguageLabel - Object with translations for multiple languages
 * @example
 * const label: MultiLanguageLabel = {
 *   en: "Hello",
 *   es: "Hola",
 *   fr: "Bonjour",
 *   default: "Hello"
 * }
 */
export interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}

/**
 * LabelOrMultiLanguage - Flexible type for labels
 * Can be a simple string or a MultiLanguageLabel object
 */
export type LabelOrMultiLanguage = string | MultiLanguageLabel;

/**
 * ItemWithMultiLanguageLabel - Generic item with multi-language label
 * Use this for any item that needs translated labels
 * @example
 * const item: ItemWithMultiLanguageLabel = {
 *   id: "1",
 *   label: { en: "Option 1", es: "Opción 1", default: "Option 1" },
 *   metadata: { color: "blue" }
 * }
 */
export interface ItemWithMultiLanguageLabel<T = any> {
  id: string;
  label: MultiLanguageLabel;
  metadata?: T; // Generic metadata for customization
}

/**
 * ResolveLabel function type
 * Takes a label (string or MultiLanguageLabel) and returns the appropriate translation
 */
export type ResolveLabelFn = (
  label: LabelOrMultiLanguage,
  lang?: string
) => string;

/**
 * Language Context Value
 */
export interface LanguageContextValue {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  resolveLabel: (label: MultiLanguageLabel) => string;
}

/**
 * Language Provider Props
 */
export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
}

/**
 * Generic Language Provider interface
 * Compatible with any language provider (accepts any lang type for maximum compatibility)
 */
export interface GenericLanguageProvider {
  lang: string;
  setLang: (lang: any) => void; // Accepts any type for maximum compatibility
}

/**
 * Function to detect parent language provider automatically
 * without depending on specific imports
 */
export function detectParentLanguageProvider(): GenericLanguageProvider | null {
  // This function will be implemented in LibI18nProvider
  // using React.useContext dynamically
  return null;
}