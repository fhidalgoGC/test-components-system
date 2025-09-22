// Language system types for the UI library

export interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}

export interface LanguageContextValue {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  resolveLabel: (label: MultiLanguageLabel) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
}

// Interfaz genérica para cualquier proveedor de idioma compatible
// Acepta cualquier string compatible con lang
export interface GenericLanguageProvider {
  lang: string;
  setLang: (lang: any) => void; // Acepta cualquier tipo para máxima compatibilidad
}

// Función para detectar automáticamente cualquier proveedor de idioma
// sin depender de imports específicos
export function detectParentLanguageProvider(): GenericLanguageProvider | null {
  // Esta función será implementada en el LibI18nProvider
  // usando React.useContext de forma dinámica
  return null;
}