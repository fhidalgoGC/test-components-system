import type { SizeToken, HeightToken, SpacingToken, GapToken, LayoutRowComponent, SlotConfig } from '../types';

export const sizeTokenToPixels: Record<SizeToken, number> = {
  xs: 100,
  sm: 200,
  md: 400,
  lg: 600,
  xl: 800,
};

export const heightTokenToPixels: Record<HeightToken, number> = {
  xs: 40,
  sm: 56,
  md: 72,
  lg: 96,
  xl: 120,
};

export const spacingTokenToPixels: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

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
  height: HeightToken | number | undefined
): React.CSSProperties => {
  if (heightMode === 'fixed' && height !== undefined) {
    const value = typeof height === 'number' ? height : heightTokenToPixels[height];
    return { height: `${value}px` };
  }
  return {};
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

export const getSlotStyle = (config: SlotConfig | undefined): React.CSSProperties => {
  if (!config) return {};
  const style: React.CSSProperties = {};
  if (config.widthMode === 'percentage' && config.width !== undefined) {
    style.width = `${config.width}%`;
    style.flex = `0 0 ${config.width}%`;
  } else if (config.widthMode === 'fixed' && config.width !== undefined) {
    style.width = `${config.width}px`;
  }
  if (config.minWidth !== undefined) {
    style.minWidth = `${config.minWidth}px`;
  }
  return style;
};

export const getComponentWrapperStyle = (comp: LayoutRowComponent): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (comp.widthMode === 'fixed' && comp.width !== undefined) {
    style.width = `${comp.width}px`;
  } else if (comp.widthMode === 'percentage' && comp.width !== undefined) {
    style.width = `${comp.width}%`;
  }
  if (comp.minWidth !== undefined) {
    style.minWidth = `${comp.minWidth}px`;
  }

  if (comp.heightMode === 'fixed' && comp.height !== undefined) {
    style.height = `${comp.height}px`;
  }
  if (comp.minHeight !== undefined) {
    style.minHeight = `${comp.minHeight}px`;
  }

  return style;
};

export const groupComponentsBySlot = (
  components: LayoutRowComponent[],
  slots: number
): Record<number, LayoutRowComponent[]> => {
  const grouped: Record<number, LayoutRowComponent[]> = {};
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

export const groupByAlign = (
  components: LayoutRowComponent[]
): Record<string, LayoutRowComponent[]> => {
  const grouped: Record<string, LayoutRowComponent[]> = {
    left: [],
    center: [],
    right: [],
  };
  components.forEach((comp) => {
    grouped[comp.align].push(comp);
  });
  return grouped;
};
