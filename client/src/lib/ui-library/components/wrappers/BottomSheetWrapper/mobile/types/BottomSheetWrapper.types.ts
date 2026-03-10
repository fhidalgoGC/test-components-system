import type { ReactNode } from 'react';

export type BottomSheetHeightMode = 'auto' | 'full' | 'half' | 'custom';

export interface BottomSheetWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  showDragHandle?: boolean;
  heightMode?: BottomSheetHeightMode;
  customHeight?: string;
  closeOnOverlayClick?: boolean;
  overlayOpacity?: number;
  className?: string;
  contentClassName?: string;
  dataTestId?: string;
}
