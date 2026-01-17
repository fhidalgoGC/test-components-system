import type { LayoutColumnProps, LayoutColumnComponent, SizeToken, HeightToken, SpacingToken, GapToken, SlotGapToken } from '../types';
import styles from '../css/LayoutColumn.module.scss';

const sizeTokenToPixels: Record<SizeToken, number> = {
  xs: 100,
  sm: 200,
  md: 400,
  lg: 600,
  xl: 800,
};

const heightTokenToPixels: Record<HeightToken, number> = {
  xs: 100,
  sm: 200,
  md: 300,
  lg: 400,
  xl: 500,
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

export const LayoutColumnView = (props: LayoutColumnProps) => {
  const {
    slots,
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

  const groupedBySlot: Record<number, LayoutColumnComponent[]> = {};
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
    styles.layoutcolumn,
    widthMode === 'full' ? styles.widthFull : widthMode === 'auto' ? styles.widthAuto : '',
    heightMode === 'full' ? styles.heightFull : heightMode === 'auto' ? styles.heightAuto : '',
    getPaddingXClass(paddingX),
    getPaddingYClass(paddingY),
    getMarginXClass(marginX),
    getMarginYClass(marginY),
    getSlotGapClass(slotGap),
    className,
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {
    ...getWidthStyle(widthMode, width, marginX),
    ...getHeightStyle(heightMode, height, marginY),
    ...getSpacingStyle(paddingX, paddingY, marginX, marginY),
  };

  const slotsToRender = Array.from({ length: slots }, (_, i) => i)
    .filter((slotIndex) => {
      const slotComponents = groupedBySlot[slotIndex];
      return slotComponents && slotComponents.length > 0;
    });

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutcolumn">
      {slotsToRender.map((slotIndex) => {
        const slotComponents = groupedBySlot[slotIndex] || [];
        
        const groupedByAlign: Record<string, LayoutColumnComponent[]> = {
          left: [],
          center: [],
          right: [],
        };

        slotComponents.forEach((comp) => {
          groupedByAlign[comp.align].push(comp);
        });

        return (
          <div
            key={slotIndex}
            className={`${styles.slot} ${getVerticalAlignClass(componentVerticalAlign)}`}
            data-testid={`layoutcolumn-slot-${slotIndex}`}
          >
            {(['left', 'center', 'right'] as const).map((align) => {
              const alignComponents = groupedByAlign[align];
              if (alignComponents.length === 0) return null;
              
              return (
                <div
                  key={align}
                  className={`${styles.alignGroup} ${getAlignClass(align)} ${getComponentGapClass(componentGap)}`}
                  style={getComponentGapStyle(componentGap)}
                  data-testid={`layoutcolumn-slot-${slotIndex}-${align}`}
                >
                  {alignComponents.map((comp, idx) => (
                    <div key={comp.id || idx} data-testid={`layoutcolumn-component-${slotIndex}-${align}-${idx}`}>
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
