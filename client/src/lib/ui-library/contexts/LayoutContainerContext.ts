import { createContext, useContext } from 'react';

export interface LayoutContainerContextValue {
  insideLayout: boolean;
}

export const LayoutContainerContext = createContext<LayoutContainerContextValue | null>(null);

export function useLayoutContainer(): LayoutContainerContextValue {
  const ctx = useContext(LayoutContainerContext);
  return ctx ?? { insideLayout: false };
}
