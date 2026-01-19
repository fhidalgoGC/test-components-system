import type { LayoutColumnProps, LayoutColumnComponent, SizeToken, HeightToken, SpacingToken, GapToken, SlotGapToken, SlotDividerToken, DividerSize, DividerColor } from '../types';
import styles from '../css/LayoutColumn.module.scss';

const dividerSizeToPixels: Record<DividerSize, number> = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
};

const dividerColorToValue: Record<DividerColor, string> = {
  white: '#ffffff',
  gray: '#9ca3af',
  light: '#e5e7eb',
  dark: '#374151',
  primary: '#4353ff',
};

const parseDividerToken = (token: SlotDividerToken): { size: DividerSize; color: DividerColor } => {
  const [size, color] = token.split('-') as [DividerSize, DividerColor];
  return { size, color };
};

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

const getComponentHeightStyle = (comp: LayoutColumnComponent): React.CSSProperties => {
  if (comp.height !== undefined) {
    const value = typeof comp.height === 'number' ? comp.height : heightTokenToPixels[comp.height];
    return { height: `${value}px` };
  }
  return {};
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
    componentGap = 'md',
    slotGap,
    slotDivider,
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

  const dividerStyle = slotDivider ? (() => {
    const { size, color } = parseDividerToken(slotDivider);
    return {
      height: `${dividerSizeToPixels[size]}px`,
      backgroundColor: dividerColorToValue[color],
    };
  })() : null;

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutcolumn">
      {slotsToRender.map((slotIndex, arrayIndex) => {
        const slotComponents = groupedBySlot[slotIndex] || [];
        
        const topComponents = slotComponents.filter(c => c.align === 'top');
        const centerComponents = slotComponents.filter(c => c.align === 'center');
        const bottomComponents = slotComponents.filter(c => c.align === 'bottom');

        const hasTop = topComponents.length > 0;
        const hasCenter = centerComponents.length > 0;
        const hasBottom = bottomComponents.length > 0;

        const showDivider = slotDivider && arrayIndex < slotsToRender.length - 1;

        return (
          <div key={slotIndex} className={styles.slotWrapper}>
            <div
              className={styles.slot}
              data-testid={`layoutcolumn-slot-${slotIndex}`}
            >
            {hasTop && (
              <div
                className={`${styles.slotContent} ${styles.alignTop} ${getComponentGapClass(componentGap)}`}
                style={getComponentGapStyle(componentGap)}
                data-testid={`layoutcolumn-slot-${slotIndex}-top`}
              >
                {topComponents.map((comp, idx) => {
                  const sizeMode = comp.sizeMode || 'auto';
                  const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                  return (
                    <div 
                      key={comp.id || idx} 
                      className={`${styles.componentWrapper} ${wrapperClass}`}
                      style={getComponentHeightStyle(comp)}
                      data-testid={`layoutcolumn-component-${slotIndex}-top-${idx}`}
                    >
                      {comp.component}
                    </div>
                  );
                })}
              </div>
            )}
            
            {hasTop && (hasCenter || hasBottom) && (
              <div style={{ flex: 1 }} />
            )}

            {!hasTop && hasCenter && (
              <div style={{ flex: 1 }} />
            )}

            {hasCenter && (
              <div
                className={`${styles.slotContent} ${styles.alignCenter} ${getComponentGapClass(componentGap)}`}
                style={getComponentGapStyle(componentGap)}
                data-testid={`layoutcolumn-slot-${slotIndex}-center`}
              >
                {centerComponents.map((comp, idx) => {
                  const sizeMode = comp.sizeMode || 'auto';
                  const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                  return (
                    <div 
                      key={comp.id || idx} 
                      className={`${styles.componentWrapper} ${wrapperClass}`}
                      style={getComponentHeightStyle(comp)}
                      data-testid={`layoutcolumn-component-${slotIndex}-center-${idx}`}
                    >
                      {comp.component}
                    </div>
                  );
                })}
              </div>
            )}

            {hasCenter && (hasBottom || !hasTop) && (
              <div style={{ flex: 1 }} />
            )}

            {!hasTop && !hasCenter && hasBottom && (
              <div style={{ flex: 1 }} />
            )}
            
            {hasBottom && (
              <div
                className={`${styles.slotContent} ${styles.alignBottom} ${getComponentGapClass(componentGap)}`}
                style={getComponentGapStyle(componentGap)}
                data-testid={`layoutcolumn-slot-${slotIndex}-bottom`}
              >
                {bottomComponents.map((comp, idx) => {
                  const sizeMode = comp.sizeMode || 'auto';
                  const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                  return (
                    <div 
                      key={comp.id || idx} 
                      className={`${styles.componentWrapper} ${wrapperClass}`}
                      style={getComponentHeightStyle(comp)}
                      data-testid={`layoutcolumn-component-${slotIndex}-bottom-${idx}`}
                    >
                      {comp.component}
                    </div>
                  );
                })}
              </div>
            )}
            </div>
            {showDivider && dividerStyle && (
              <div 
                className={styles.slotDivider} 
                style={dividerStyle}
                data-testid={`layoutcolumn-divider-${slotIndex}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
