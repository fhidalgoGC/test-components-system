import { createContext, useContext } from 'react';

interface ModalProviderContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}

const ModalCtx = createContext<ModalProviderContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalCtx);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
};

export const ModalProvider = ModalCtx.Provider;
