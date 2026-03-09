import { useIsMobile } from '../../hooks';
import { FloatingMenu as FloatingMenuWeb } from './web';
import { FloatingMenuMobileView } from './mobile';
import type { FloatingMenuProps } from './web/types';

export const FloatingMenu = <T,>(props: FloatingMenuProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <FloatingMenuMobileView {...props} />;
  }

  return <FloatingMenuWeb {...props} />;
};

export { useFloatingMenu } from './web';

export type { 
  FloatingMenuProps, 
  FloatingMenuItem, 
  FloatingMenuLayout, 
  FloatingMenuItemConfig,
  FloatingMenuSectionConfig,
  FloatingMenuSelectionStyle,
  FloatingMenuController,
  MenuPosition,
  WidthMode,
  HeightMode,
  ScrollMode,
  RenderType
} from './web/types';

export type { FloatingMenuMobileProps } from './mobile/types';
