import { createContext, useContext } from 'react';
import type { SidebarLayoutContextValue } from '../types/SidebarLayout.types';

export const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null);

export function useSidebarLayout(): SidebarLayoutContextValue {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error('useSidebarLayout must be used within SidebarLayout');
  }
  return context;
}

export function useOptionalSidebarLayout(): SidebarLayoutContextValue | null {
  return useContext(SidebarLayoutContext);
}
