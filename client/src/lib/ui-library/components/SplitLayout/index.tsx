import { useIsMobile } from '../../hooks';
import { SplitLayout as SplitLayoutWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { SplitLayoutProps, PanelConfig, PanelBackground, MainSide, VerticalAlign, HorizontalAlign, SpacingToken } from './web/types';

export const SplitLayout = (props: SplitLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="SplitLayout" />;
  }

  return <SplitLayoutWeb {...props} />;
};

export type { SplitLayoutProps, PanelConfig, PanelBackground, MainSide, VerticalAlign, HorizontalAlign, SpacingToken };
