import { SplitLayout as SplitLayoutWeb } from './web';
import { SplitLayoutMobile } from './mobile';
import { useIsMobile } from '../../hooks/useResponsive';
import type {
  SplitLayoutProps,
  LayoutConfig,
  PanelConfig,
  PanelAlign,
  PanelScroll,
  PanelBackgroundImage,
  BackgroundRenderType,
  SizeMode,
  VerticalAlign,
  HorizontalAlign,
  ComponentMainAlign,
} from './web/types';
import type { SplitLayoutMobileProps, MobileLayoutConfig } from './mobile/types';

export const SplitLayout = (props: SplitLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SplitLayoutMobile layout={props.layout} main={props.main} />;
  }

  return <SplitLayoutWeb {...props} />;
};

export type {
  SplitLayoutProps,
  LayoutConfig,
  PanelConfig,
  PanelAlign,
  PanelScroll,
  PanelBackgroundImage,
  BackgroundRenderType,
  SizeMode,
  VerticalAlign,
  HorizontalAlign,
  ComponentMainAlign,
  SplitLayoutMobileProps,
  MobileLayoutConfig,
};
