import { ReactNode } from 'react';

/**
 * Props para el componente GCModal
 */
export interface GCModalProps {
  /** Contenido del modal */
  children: ReactNode;
  
  /** Si se muestra el botón de cerrar */
  showCloseButton?: boolean;
  
  /** Si se puede cerrar haciendo clic en el backdrop */
  closeOnBackdrop?: boolean;
  
  /** Función llamada cuando el modal se cierra */
  onClose?: () => void;
  
  /** Identificador para testing */
  'data-testid'?: string;
}