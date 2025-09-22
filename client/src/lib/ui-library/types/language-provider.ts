// Interfaz genérica para cualquier proveedor de idioma compatible
export interface GenericLanguageProvider {
  lang: string;
  setLang: (lang: string) => void;
}

// Función para detectar automáticamente cualquier proveedor de idioma
// sin depender de imports específicos
export function detectParentLanguageProvider(): GenericLanguageProvider | null {
  // Esta función será implementada en el LibI18nProvider
  // usando React.useContext de forma dinámica
  return null;
}