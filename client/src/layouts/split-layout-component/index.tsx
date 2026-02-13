import { SplitLayout as SplitLayoutWeb } from './web';
import type {
  SplitLayoutProps,
  LayoutConfig,
  PanelConfig,
  PanelAlign,
  PanelScroll,
  SizeMode,
  VerticalAlign,
  HorizontalAlign,
  ComponentMainAlign,
} from './web/types';

export const SplitLayout = (props: SplitLayoutProps) => {
  return <SplitLayoutWeb {...props} />;
};

export type {
  SplitLayoutProps,
  LayoutConfig,
  PanelConfig,
  PanelAlign,
  PanelScroll,
  SizeMode,
  VerticalAlign,
  HorizontalAlign,
  ComponentMainAlign,
};
