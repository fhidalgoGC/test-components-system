import type {
  SizeToken,
  HeightToken,
  SpacingToken,
  GapToken,
  DividerSize,
  DividerColor,
  DividerStyle,
  SlotDividerToken,
  SlotAlignDividerToken,
  SlotConfig,
  LayoutColumnComponent,
} from '../types';

export const sizeTokenToPixels: Record<SizeToken, number> = {
  xs: 100,
  sm: 200,
  md: 400,
  lg: 600,
  xl: 800,
};

export const heightTokenToPixels: Record<HeightToken, number> = {
  xs: 100,
  sm: 200,
  md: 300,
  lg: 400,
  xl: 500,
};

export const spacingTokenToPixels: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const dividerSizeToPixels: Record<DividerSize, number> = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
};

export const dividerColorToValue: Record<DividerColor, string> = {
  white: '#ffffff',
  gray: '#9ca3af',
  light: '#e5e7eb',
  dark: '#374151',
  primary: '#4353ff',
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getMarginValue = (margin: SpacingToken | number | undefined): number => {
  if (margin === undefined) return 0;
  if (typeof margin === 'number') return margin;
  return spacingTokenToPixels[margin] || 0;
};

export const getWidthStyle = (
  widthMode: string | undefined,
  width: SizeToken | number | undefined,
  marginX?: SpacingToken | number
): React.CSSProperties => {
  if (widthMode === 'fixed' && width !== undefined) {
    const value = typeof width === 'number' ? width : sizeTokenToPixels[width];
    return { width: `${value}px` };
  }
  if (widthMode === 'full' && marginX !== undefined) {
    const marginValue = getMarginValue(marginX);
    if (marginValue > 0) {
      return { width: `calc(100% - ${marginValue * 2}px)` };
    }
  }
  return {};
};

export const getHeightStyle = (
  heightMode: string | undefined,
  height: HeightToken | number | undefined,
  marginY?: SpacingToken | number
): React.CSSProperties => {
  if (heightMode === 'fixed' && height !== undefined) {
    const value = typeof height === 'number' ? height : heightTokenToPixels[height];
    return { height: `${value}px` };
  }
  if (heightMode === 'full' && marginY !== undefined) {
    const marginValue = getMarginValue(marginY);
    if (marginValue > 0) {
      return { height: `calc(100% - ${marginValue * 2}px)` };
    }
  }
  return {};
};

export const getSpacingStyle = (
  paddingX: SpacingToken | number | undefined,
  paddingY: SpacingToken | number | undefined,
  marginX: SpacingToken | number | undefined,
  marginY: SpacingToken | number | undefined
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  if (typeof paddingX === 'number') style.paddingLeft = style.paddingRight = `${paddingX}px`;
  if (typeof paddingY === 'number') style.paddingTop = style.paddingBottom = `${paddingY}px`;
  if (typeof marginX === 'number') style.marginLeft = style.marginRight = `${marginX}px`;
  if (typeof marginY === 'number') style.marginTop = style.marginBottom = `${marginY}px`;
  return style;
};

export const getComponentHeightStyle = (comp: LayoutColumnComponent): React.CSSProperties => {
  if (comp.height !== undefined) {
    const value = typeof comp.height === 'number' ? comp.height : heightTokenToPixels[comp.height];
    return { height: `${value}px` };
  }
  return {};
};

export const getSlotWrapperStyle = (config: SlotConfig | undefined): React.CSSProperties => {
  if (!config) return {};

  const style: React.CSSProperties = {};
  const heightMode = config.heightMode || 'auto';

  if (heightMode === 'percentage' && config.height !== undefined) {
    style.flex = `0 0 ${config.height}%`;
    style.height = `${config.height}%`;
  } else if (heightMode === 'fixed' && config.height !== undefined) {
    style.flex = '0 0 auto';
    style.height = `${config.height}px`;
  } else if (heightMode === 'full') {
    style.flex = '1 1 0';
    style.minHeight = 0;
  } else {
    style.flex = '0 0 auto';
  }

  if (config.minHeight !== undefined) {
    style.minHeight = `${config.minHeight}px`;
  }
  if (config.maxHeight !== undefined) {
    style.maxHeight = `${config.maxHeight}px`;
  }

  return style;
};

export const parseDividerToken = (token: SlotDividerToken): { size: DividerSize; color: DividerColor } => {
  const [size, color] = token.split('-') as [DividerSize, DividerColor];
  return { size, color };
};

export const parseAlignDividerToken = (token: SlotAlignDividerToken): { size: DividerSize; color: DividerColor; style: DividerStyle } => {
  const [size, color, style] = token.split('-') as [DividerSize, DividerColor, DividerStyle];
  return { size, color, style };
};

export const groupComponentsBySlot = (
  components: LayoutColumnComponent[],
  slots: number
): Record<number, LayoutColumnComponent[]> => {
  const grouped: Record<number, LayoutColumnComponent[]> = {};
  components
    .filter((comp) => !comp.hide)
    .forEach((comp) => {
      if (comp.slot >= 0 && comp.slot < slots) {
        if (!grouped[comp.slot]) {
          grouped[comp.slot] = [];
        }
        grouped[comp.slot].push(comp);
      }
    });
  return grouped;
};
