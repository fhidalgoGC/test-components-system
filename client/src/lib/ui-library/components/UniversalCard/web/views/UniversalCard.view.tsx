import type { UniversalCardProps, SizeValue } from '../types';
import { useMemo } from 'react';
import { cn } from '../../../../utils';
import { styles } from '../css';
import { useSelectionSafe } from '../../../WrapperItemsSelected/index';

const convertSizeValue = (value: SizeValue | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

const isTailwindClass = (value: string): boolean => {
  return value.startsWith('w-') || value.startsWith('h-') || 
         value.startsWith('min-w-') || value.startsWith('min-h-') ||
         value.startsWith('max-w-') || value.startsWith('max-h-');
};

export const UniversalCardView = (props: UniversalCardProps) => {
  const {
    component: ChildComponent,
    componentProps = {},
    id,
    selectable = false,
    minWidth,
    minHeight,
    width,
    height,
    cardStyles = {},
    dataTestId = 'universal-card',
    headerContent,
    footerContent,
  } = props;

  const selectionContext = useSelectionSafe();
  const isSelectable = selectable && selectionContext !== null && id !== undefined;
  
  const selectedIds = selectionContext?.selectedIds || [];
  const isSelected = isSelectable && id !== undefined && selectedIds.includes(id);

  const widthValue = convertSizeValue(width);
  const heightValue = convertSizeValue(height);
  const minWidthValue = convertSizeValue(minWidth);
  const minHeightValue = convertSizeValue(minHeight);

  const inlineStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      ...cardStyles.style,
    };

    if (widthValue && !isTailwindClass(widthValue)) {
      baseStyles.width = widthValue;
    }
    if (heightValue && !isTailwindClass(heightValue)) {
      baseStyles.height = heightValue;
    }
    if (minWidthValue && !isTailwindClass(minWidthValue)) {
      baseStyles.minWidth = minWidthValue;
    }
    if (minHeightValue && !isTailwindClass(minHeightValue)) {
      baseStyles.minHeight = minHeightValue;
    }

    if (cardStyles.backgroundColor) {
      baseStyles.backgroundColor = cardStyles.backgroundColor;
    }
    if (cardStyles.borderColor) {
      baseStyles.borderColor = cardStyles.borderColor;
    }
    if (cardStyles.borderWidth) {
      baseStyles.borderWidth = cardStyles.borderWidth;
    }
    if (cardStyles.borderRadius) {
      baseStyles.borderRadius = cardStyles.borderRadius;
    }
    if (cardStyles.boxShadow) {
      baseStyles.boxShadow = cardStyles.boxShadow;
    }
    if (cardStyles.padding) {
      baseStyles.padding = cardStyles.padding;
    }

    return baseStyles;
  }, [widthValue, heightValue, minWidthValue, minHeightValue, cardStyles]);

  const classNames = useMemo(() => {
    const classes: string[] = [styles.universalcard];

    if (widthValue && isTailwindClass(widthValue)) {
      classes.push(widthValue);
    }
    if (heightValue && isTailwindClass(heightValue)) {
      classes.push(heightValue);
    }
    if (minWidthValue && isTailwindClass(minWidthValue)) {
      classes.push(minWidthValue);
    }
    if (minHeightValue && isTailwindClass(minHeightValue)) {
      classes.push(minHeightValue);
    }

    if (cardStyles.className) {
      classes.push(cardStyles.className);
    }

    if (isSelectable) {
      classes.push('cursor-pointer');
    }

    return cn(...classes);
  }, [widthValue, heightValue, minWidthValue, minHeightValue, cardStyles.className, isSelectable, isSelected, id]);

  const handleClick = () => {
    if (isSelectable && id && selectionContext) {
      selectionContext.toggleSelection(id);
    }
  };

  const innerBorderClass = `${styles.innerBorder} ${isSelected ? styles.innerBorderSelected : ''}`;

  return (
    <div
      className={classNames}
      style={inlineStyles}
      data-testid={dataTestId}
      onClick={handleClick}
    >
      <div className={innerBorderClass}>
        {headerContent && (
          <div className={styles.header} data-testid={`${dataTestId}-header`}>
            {headerContent}
          </div>
        )}

        <div className={styles.content} data-testid={`${dataTestId}-content`}>
          <ChildComponent {...componentProps} />
        </div>

        {footerContent && (
          <div className={styles.footer} data-testid={`${dataTestId}-footer`}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};
