import type { ItemWithMultiLanguageLabel } from '../../../../types';

export interface NavItemMetadata {
  icon?: React.ReactNode;
  isDisabled?: boolean;
  dataTestId?: string;
}

export interface NavItem extends ItemWithMultiLanguageLabel<NavItemMetadata> {}

export interface BottomNavigationBarError {
  type: 'disable-selected-item';
  itemId: string;
  message: string;
}

export interface BottomNavigationBarProps {
  /** Lista de items de navegación */
  items: NavItem[];
  
  /** Callback al seleccionar un item (manual o por cambio externo) */
  onSelect?: (item: NavItem) => void;
  
  /** Callback cuando ocurre un error (ej: intento de deshabilitar item seleccionado) */
  onError?: (error: BottomNavigationBarError) => void;
  
  /** Controlado: define externamente el ítem seleccionado actual */
  selectedId?: string;
  
  /** No controlado: ítem seleccionado inicial */
  defaultSelectedId?: string;
  
  /** Si es true, al montar el componente se invoca el callback del ítem seleccionado */
  triggerOnMount?: boolean;
  
  /** IDs de items que estarán deshabilitados (tiene prioridad sobre metadata.isDisabled) */
  disabledIds?: string[];
  
  /** Clase CSS adicional */
  className?: string;
  
  /** Override de idioma */
  langOverride?: string;
  
  /** Orden de prioridad de traducciones */
  i18nOrder?: 'global-first' | 'local-first';
}

export interface BottomNavigationBarContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
  items: NavItem[];
  selectedId: string | null;
  disabledIds: string[];
  onItemClick: (item: NavItem) => void;
}
