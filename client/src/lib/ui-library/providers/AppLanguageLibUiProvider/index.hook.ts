import { createContext, useContext } from 'react';
import type { LibI18nContextValue } from './index.types';
import type { GenericLanguageProvider } from '../../types/language.types';

// Context - exported for provider usage
export const LibI18nContext = createContext<LibI18nContextValue | undefined>(undefined);

// Hook to use LibI18n context
export function useLibI18n() {
  const ctx = useContext(LibI18nContext);
  if (!ctx) throw new Error('useLibI18n must be used within LibI18nProvider');
  return ctx;
}

// Hook conveniente para inyectar automáticamente el proveedor padre
// Este hook puede ser usado por la app padre para conectar su sistema de idioma
export function useParentLanguageInjection(parentProvider: GenericLanguageProvider | null) {
  return parentProvider ? { parentLanguageProvider: parentProvider } : {};
}
