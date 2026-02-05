import type { LayoutRowProps, LayoutRowComponent, SlotConfig, SizeToken, HeightToken, SpacingToken, GapToken, SlotGapToken } from '../types';
import styles from '../css/LayoutRow.module.scss';

const sizeTokenToPixels: Record<SizeToken, number> = {
  xs: 100,
  sm: 200,
  md: 400,
  lg: 600,
  xl: 800,
};

const heightTokenToPixels: Record<HeightToken, number> = {
  xs: 40,
  sm: 56,
  md: 72,
  lg: 96,
  xl: 120,
};

const spacingTokenToPixels: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const getMarginValue = (margin: SpacingToken | number | undefined): number => {
  if (margin === undefined) return 0;
  if (typeof margin === 'number') return margin;
  return spacingTokenToPixels[margin] || 0;
};

const getWidthStyle = (
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

const getHeightStyle = (
  heightMode: string | undefined,
  height: HeightToken | number | undefined
): React.CSSProperties => {
  if (heightMode === 'fixed' && height !== undefined) {
    const value = typeof height === 'number' ? height : heightTokenToPixels[height];
    return { height: `${value}px` };
  }
  return {};
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getPaddingXClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`paddingX${capitalize(value)}`] || '';
};

const getPaddingYClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`paddingY${capitalize(value)}`] || '';
};

const getMarginXClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`marginX${capitalize(value)}`] || '';
};

const getMarginYClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`marginY${capitalize(value)}`] || '';
};

const getSpacingStyle = (
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

const getComponentGapClass = (gap: GapToken | number | undefined): string => {
  if (gap === undefined) return styles.componentGapMd;
  if (typeof gap === 'number') return '';
  return styles[`componentGap${capitalize(gap)}`] || styles.componentGapMd;
};

const getComponentGapStyle = (gap: GapToken | number | undefined): React.CSSProperties => {
  if (typeof gap === 'number') {
    return { gap: `${gap}px` };
  }
  return {};
};

const getSlotGapClass = (token: SlotGapToken | undefined) => {
  if (!token) return '';
  return styles[`slotGap${capitalize(token)}`] || '';
};

const getVerticalAlignClass = (align: string | undefined) => {
  switch (align) {
    case 'top': return styles.verticalTop;
    case 'bottom': return styles.verticalBottom;
    case 'stretch': return styles.verticalStretch;
    default: return styles.verticalCenter;
  }
};

const getAlignClass = (align: string) => {
  switch (align) {
    case 'left': return styles.alignLeft;
    case 'right': return styles.alignRight;
    default: return styles.alignCenter;
  }
};

const getComponentWrapperClasses = (comp: LayoutRowComponent): string => {
  const classes = [styles.componentWrapper];

  const wm = comp.widthMode || 'auto';
  if (wm === 'full') classes.push(styles.componentWidthFull);
  else if (wm === 'fixed') classes.push(styles.componentWidthFixed);
  else classes.push(styles.componentWidthAuto);

  const hm = comp.heightMode || 'auto';
  if (hm === 'full') classes.push(styles.componentHeightFull);
  else if (hm === 'fixed') classes.push(styles.componentHeightFixed);
  else classes.push(styles.componentHeightAuto);

  return classes.join(' ');
};

const getSlotClasses = (config: SlotConfig | undefined): string => {
  if (!config || !config.widthMode) return '';
  switch (config.widthMode) {
    case 'full': return styles.slotFull;
    case 'auto': return styles.slotAuto;
    case 'fixed': return styles.slotFixed;
    default: return '';
  }
};

const getSlotStyle = (config: SlotConfig | undefined): React.CSSProperties => {
  if (!config) return {};
  const style: React.CSSProperties = {};
  if (config.widthMode === 'fixed' && config.width !== undefined) {
    style.width = `${config.width}px`;
  }
  if (config.minWidth !== undefined) {
    style.minWidth = `${config.minWidth}px`;
  }
  return style;
};

const getComponentWrapperStyle = (comp: LayoutRowComponent): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (comp.widthMode === 'fixed' && comp.width !== undefined) {
    style.width = `${comp.width}px`;
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

export const LayoutRowView = (props: LayoutRowProps) => {
  const {
    slots,
    slotConfig,
    widthMode = 'full',
    width,
    heightMode = 'auto',
    height,
    paddingX,
    paddingY,
    marginX,
    marginY,
    componentVerticalAlign = 'center',
    componentGap = 'md',
    slotGap,
    components,
    className,
  } = props;

  const groupedBySlot: Record<number, LayoutRowComponent[]> = {};
  components
    .filter((comp) => !comp.hide)
    .forEach((comp) => {
      if (comp.slot >= 0 && comp.slot < slots) {
        if (!groupedBySlot[comp.slot]) {
          groupedBySlot[comp.slot] = [];
        }
        groupedBySlot[comp.slot].push(comp);
      }
    });

  const containerClasses = [
    styles.layoutrow,
    widthMode === 'full' ? styles.widthFull : widthMode === 'auto' ? styles.widthAuto : '',
    heightMode === 'full' ? styles.heightFull : heightMode === 'auto' ? styles.heightAuto : '',
    getPaddingXClass(paddingX),
    getPaddingYClass(paddingY),
    getMarginXClass(marginX),
    getMarginYClass(marginY),
    getSlotGapClass(slotGap),
    getVerticalAlignClass(componentVerticalAlign),
    className,
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {
    ...getWidthStyle(widthMode, width, marginX),
    ...getHeightStyle(heightMode, height),
    ...getSpacingStyle(paddingX, paddingY, marginX, marginY),
  };

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutrow">
      {Array.from({ length: slots }, (_, slotIndex) => {
        const slotComponents = groupedBySlot[slotIndex] || [];
        const currentSlotConfig = slotConfig?.[slotIndex];
        
        const groupedByAlign: Record<string, LayoutRowComponent[]> = {
          left: [],
          center: [],
          right: [],
        };
        
        slotComponents.forEach((comp) => {
          groupedByAlign[comp.align].push(comp);
        });

        const slotClasses = [
          styles.slot,
          getSlotClasses(currentSlotConfig),
          getVerticalAlignClass(componentVerticalAlign),
        ].filter(Boolean).join(' ');

        return (
          <div
            key={slotIndex}
            className={slotClasses}
            style={getSlotStyle(currentSlotConfig)}
            data-testid={`layoutrow-slot-${slotIndex}`}
          >
            {(['left', 'center', 'right'] as const).map((align) => {
              const alignComponents = groupedByAlign[align];
              if (alignComponents.length === 0) return null;
              
              return (
                <div
                  key={align}
                  className={`${styles.slot} ${getAlignClass(align)} ${getComponentGapClass(componentGap)}`}
                  style={getComponentGapStyle(componentGap)}
                  data-testid={`layoutrow-slot-${slotIndex}-${align}`}
                >
                  {alignComponents.map((comp, idx) => (
                    <div
                      key={idx}
                      className={getComponentWrapperClasses(comp)}
                      style={getComponentWrapperStyle(comp)}
                      data-testid={`layoutrow-component-${slotIndex}-${align}-${idx}`}
                    >
                      {comp.component}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
