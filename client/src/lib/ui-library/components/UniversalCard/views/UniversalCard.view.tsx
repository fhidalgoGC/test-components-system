import type { UniversalCardProps, SizeValue } from '../types';
import { useMemo } from 'react';
import { cn } from '@/lib/ui-library/utils';
import styles from '../css/UniversalCard.module.css';
import { useSelectionSafe } from '@/lib/ui-library/components/WrapperItemsSelected';

/**
 * Converts a size value to CSS format
 * Supports: numbers (px), strings with units, Tailwind classes (w-full, h-full)
 */
const convertSizeValue = (value: SizeValue | undefined): string | undefined => {
  if (value === undefined) return undefined;
  
  // If it's a number, convert to px
  if (typeof value === 'number') {
    return `${value}px`;
  }
  
  // If it's a Tailwind class or already has units, return as is
  return value;
};

/**
 * Checks if a value is a Tailwind class (like w-full, h-full)
 */
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

  // Try to use selection context (safe - won't throw if not wrapped)
  const selectionContext = useSelectionSafe();
  const isSelectable = selectable && selectionContext !== null && id !== undefined;
  
  // Subscribe to selectedIds to trigger re-render when selection changes
  // Access selectedIds directly to ensure React detects the dependency
  const selectedIds = selectionContext?.selectedIds || [];
  const isSelected = isSelectable && id !== undefined && selectedIds.includes(id);

  // Process size values
  const widthValue = convertSizeValue(width);
  const heightValue = convertSizeValue(height);
  const minWidthValue = convertSizeValue(minWidth);
  const minHeightValue = convertSizeValue(minHeight);

  // Build inline styles
  const inlineStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      ...cardStyles.style,
    };

    // Add width/height if they're not Tailwind classes
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

    // Add custom styles from cardStyles
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

  // Build class names
  const classNames = useMemo(() => {
    const classes: string[] = [styles.universalcard];

    // Add Tailwind classes for sizes if they are Tailwind
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

    // Add custom className from cardStyles
    if (cardStyles.className) {
      classes.push(cardStyles.className);
    }

    // Add selectable and selected classes from CSS module
    if (isSelectable) {
      classes.push('cursor-pointer');
    }
    if (isSelected) {
      classes.push(styles.selected);
    }

    return cn(...classes);
  }, [widthValue, heightValue, minWidthValue, minHeightValue, cardStyles.className, isSelectable, isSelected]);

  // Handle click for selectable cards
  const handleClick = () => {
    if (isSelectable && id && selectionContext) {
      selectionContext.toggleSelection(id);
    }
  };

  return (
    <div
      className={classNames}
      style={inlineStyles}
      data-testid={dataTestId}
      onClick={handleClick}
    >
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
  );
};
