import { SplitLayout as SplitLayoutWeb } from './web';
import type { SplitLayoutProps, PanelConfig, PanelBackground, MainSide, VerticalAlign, HorizontalAlign, SpacingToken } from './web/types';

export const SplitLayout = (props: SplitLayoutProps) => {
  return <SplitLayoutWeb {...props} />;
};

export type { SplitLayoutProps, PanelConfig, PanelBackground, MainSide, VerticalAlign, HorizontalAlign, SpacingToken };
