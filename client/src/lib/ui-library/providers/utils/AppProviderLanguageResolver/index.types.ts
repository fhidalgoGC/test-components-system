/**
 * Resultado de la resolución del provider de idioma
 */
export interface ResolvedLanguageProvider {
  /**
   * Código de idioma actual (e.g., 'en', 'es')
   */
  lang: string;
  
  /**
   * Configuración completa del idioma desde el ConfigProvider merged
   */
  config: any;
}
