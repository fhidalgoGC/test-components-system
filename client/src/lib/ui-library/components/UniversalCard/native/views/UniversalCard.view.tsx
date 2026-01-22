import { View, Pressable, ViewStyle, StyleSheet } from 'react-native';
import type { UniversalCardNativeProps, SizeValue } from '../types';
import { useMemo } from 'react';

const convertSizeValue = (value: SizeValue | undefined): number | string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (value === '100%') return '100%';
  if (value.endsWith('px')) return parseInt(value, 10);
  if (value.endsWith('%')) return value;
  return undefined;
};

export const UniversalCardNativeView = (props: UniversalCardNativeProps) => {
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
    onSelect,
    isSelected = false,
  } = props;

  const containerStyle = useMemo(() => {
    const style: ViewStyle = {
      backgroundColor: cardStyles.backgroundColor || '#ffffff',
      borderRadius: cardStyles.borderRadius ? parseInt(String(cardStyles.borderRadius), 10) : 12,
      borderWidth: isSelected ? 3 : (cardStyles.borderWidth ? parseInt(String(cardStyles.borderWidth), 10) : 1),
      borderColor: isSelected ? '#2563eb' : (cardStyles.borderColor || '#e5e7eb'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      overflow: 'hidden',
    };

    const widthVal = convertSizeValue(width);
    const heightVal = convertSizeValue(height);
    const minWidthVal = convertSizeValue(minWidth);
    const minHeightVal = convertSizeValue(minHeight);

    if (widthVal !== undefined) style.width = widthVal as any;
    if (heightVal !== undefined) style.height = heightVal as any;
    if (minWidthVal !== undefined) style.minWidth = minWidthVal as any;
    if (minHeightVal !== undefined) style.minHeight = minHeightVal as any;

    return style;
  }, [width, height, minWidth, minHeight, cardStyles, isSelected]);

  const handlePress = () => {
    if (selectable && id && onSelect) {
      onSelect(id);
    }
  };

  const CardWrapper = selectable ? Pressable : View;
  const wrapperProps = selectable ? { onPress: handlePress } : {};

  return (
    <CardWrapper
      style={containerStyle}
      {...wrapperProps}
      testID={dataTestId}
    >
      {headerContent && (
        <View style={styles.header} testID={`${dataTestId}-header`}>
          {headerContent}
        </View>
      )}

      <View style={styles.content} testID={`${dataTestId}-content`}>
        <ChildComponent {...componentProps} />
      </View>

      {footerContent && (
        <View style={styles.footer} testID={`${dataTestId}-footer`}>
          {footerContent}
        </View>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'rgba(243, 244, 246, 0.2)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: 'rgba(243, 244, 246, 0.2)',
  },
});
