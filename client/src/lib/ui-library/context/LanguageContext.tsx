import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { LanguageContextValue, MultiLanguageLabel } from '../types/language';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLanguage);

  // Escuchar cambios globales de idioma
  useEffect(() => {
    const handleGlobalLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail?.language;
      if (newLanguage && newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);
      }
    };

    // Escuchar el evento global de cambio de idioma
    window.addEventListener('languageChange', handleGlobalLanguageChange as EventListener);

    // También verificar localStorage al montar
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && storedLanguage !== currentLanguage) {
      setCurrentLanguage(storedLanguage);
    }

    return () => {
      window.removeEventListener('languageChange', handleGlobalLanguageChange as EventListener);
    };
  }, [currentLanguage]);

  const setLanguage = useCallback((language: string) => {
    setCurrentLanguage(language);
  }, []);

  const resolveLabel = useCallback((label: MultiLanguageLabel): string => {
    // Try current language first
    if (label[currentLanguage]) {
      return label[currentLanguage];
    }
    
    // Fallback to default (required)
    return label.default;
  }, [currentLanguage]);

  const contextValue: LanguageContextValue = {
    currentLanguage,
    setLanguage,
    resolveLabel,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;