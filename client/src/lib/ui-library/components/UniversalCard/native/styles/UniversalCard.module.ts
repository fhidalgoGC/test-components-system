import { StyleSheet } from 'react-native';
import { colors, spacing, padding, borders, shadows } from '../../token.shared';

export const styles = StyleSheet.create({
  header: {
    padding: padding.card,
    borderBottomWidth: borders.width,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundMuted,
  },
  content: {
    flex: 1,
    padding: padding.card,
  },
  footer: {
    padding: padding.card,
    borderTopWidth: borders.width,
    borderTopColor: colors.border,
    backgroundColor: colors.backgroundMuted,
  },
});

export const defaultCardStyles = {
  backgroundColor: colors.background,
  borderRadius: borders.radius,
  borderWidth: borders.width,
  borderColor: colors.border,
  selectedBorderColor: colors.borderSelected,
  selectedBorderWidth: borders.selectedWidth,
  shadowColor: shadows.color,
  shadowOffsetWidth: shadows.offsetX,
  shadowOffsetHeight: shadows.offsetY,
  shadowOpacity: shadows.opacity,
  shadowRadius: shadows.radius,
  elevation: shadows.elevation,
};
