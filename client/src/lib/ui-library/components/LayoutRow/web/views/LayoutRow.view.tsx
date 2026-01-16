import type { LayoutRowProps, LayoutRowComponent, SizeToken, HeightToken, SpacingToken, SlotGapToken } from '../types';
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

const getWidthStyle = (widthMode: string | undefined, width: SizeToken | number | undefined): React.CSSProperties => {
  if (widthMode === 'fixed' && width !== undefined) {
    const value = typeof width === 'number' ? width : sizeTokenToPixels[width];
    return { width: `${value}px` };
  }
  return {};
};

const getHeightStyle = (heightMode: string | undefined, height: HeightToken | number | undefined): React.CSSProperties => {
  if (heightMode === 'fixed' && height !== undefined) {
    const value = typeof height === 'number' ? height : heightTokenToPixels[height];
    return { height: `${value}px` };
  }
  return {};
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getPaddingXClass = (token: SpacingToken | undefined) => {
  if (!token) return '';
  return styles[`paddingX${capitalize(token)}`] || '';
};

const getPaddingYClass = (token: SpacingToken | undefined) => {
  if (!token) return '';
  return styles[`paddingY${capitalize(token)}`] || '';
};

const getMarginXClass = (token: SpacingToken | undefined) => {
  if (!token) return '';
  return styles[`marginX${capitalize(token)}`] || '';
};

const getMarginYClass = (token: SpacingToken | undefined) => {
  if (!token) return '';
  return styles[`marginY${capitalize(token)}`] || '';
};

const getComponentGapClass = (token: SizeToken | undefined) => {
  if (!token) return styles.componentGapMd;
  return styles[`componentGap${capitalize(token)}`] || styles.componentGapMd;
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

export const LayoutRowView = (props: LayoutRowProps) => {
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

  const groupedBySlot: Record<number, LayoutRowComponent[]> = {};
  components.forEach((comp) => {
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
    heightMode === 'auto' ? styles.heightAuto : '',
    getPaddingXClass(paddingX),
    getPaddingYClass(paddingY),
    getMarginXClass(marginX),
    getMarginYClass(marginY),
    getSlotGapClass(slotGap),
    getVerticalAlignClass(componentVerticalAlign),
    className,
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {
    ...getWidthStyle(widthMode, width),
    ...getHeightStyle(heightMode, height),
  };

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutrow">
      {Array.from({ length: slots }, (_, slotIndex) => {
        const slotComponents = groupedBySlot[slotIndex] || [];
        
        const groupedByAlign: Record<string, LayoutRowComponent[]> = {
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
            data-testid={`layoutrow-slot-${slotIndex}`}
          >
            {(['left', 'center', 'right'] as const).map((align) => {
              const alignComponents = groupedByAlign[align];
              if (alignComponents.length === 0) return null;
              
              return (
                <div
                  key={align}
                  className={`${styles.slot} ${getAlignClass(align)} ${getComponentGapClass(componentGap)}`}
                  data-testid={`layoutrow-slot-${slotIndex}-${align}`}
                >
                  {alignComponents.map((comp, idx) => (
                    <div key={idx} data-testid={`layoutrow-component-${slotIndex}-${align}-${idx}`}>
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
