import React from 'react';
import type { LibI18nProviderProps } from './index.types';
/**
 * Comportamiento INDEPENDIENTE:
 * - Si recibe `parentLanguageProvider` (inyectado), usa ese como fuente de verdad
 * - Si NO hay padre pero viene `language` en props, usamos esa prop (controlado por prop)
 * - Si NO hay padre ni `language`, la librería se autogestiona con estado interno
 * - Cuando setLanguage es llamado desde la librería:
 *    - Si hay padre inyectado, le notifica al padre (padre.setLang)
 *    - En su defecto, dispara onLanguageChange si fue provisto
 *    - Y si nada existe, cambia su estado interno
 */
export declare function LibI18nProvider({ language, onLanguageChange, parentLanguageProvider, globalTranslationPaths, translationPriority, children }: LibI18nProviderProps): React.JSX.Element;
//# sourceMappingURL=index.provider.d.ts.map