import type {
  FloatingMenuItem,
  FloatingMenuLayout,
  FloatingMenuSectionConfig,
  FloatingMenuItemConfig,
  FloatingMenuSelectionStyle,
  FloatingMenuController,
  ScrollMode,
} from '../../web/types';

export interface FloatingMenuMobileProps<T = unknown> {
  items: FloatingMenuItem<T>[];
  layout?: FloatingMenuLayout;
  header?: FloatingMenuSectionConfig;
  footer?: FloatingMenuSectionConfig;
  itemConfig?: FloatingMenuItemConfig;
  scroll?: ScrollMode;
  isOpen?: boolean;
  showBackdrop?: boolean;
  selectable?: boolean;
  defaultSelectedId?: string;
  selectionStyle?: FloatingMenuSelectionStyle;
  onSelectionChange?: (selectedId: string | null, item: FloatingMenuItem<T> | null) => void;
  onItemClick?: (item: FloatingMenuItem<T>, index: number) => void;
  onClose?: () => void;
  controller?: FloatingMenuController;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  selectedClassName?: string;
  bodyClassName?: string;
}
