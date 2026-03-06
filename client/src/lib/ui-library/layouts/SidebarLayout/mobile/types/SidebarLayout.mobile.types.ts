import { ReactNode } from 'react';

export interface SidebarLayoutMobileProps {
  toolbarContent: ReactNode;
  children: ReactNode;
  toolbarHeight?: number;
  className?: string;
  mainPaddingX?: number;
  mainPaddingY?: number;
  bottomNavContent?: ReactNode;
}
