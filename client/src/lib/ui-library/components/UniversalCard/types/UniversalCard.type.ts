import { ReactNode, ComponentType } from 'react';

/**
 * Size value - can be px value, percentage, or Tailwind classes (w-full, h-full, etc.)
 */
export type SizeValue = string | number;

/**
 * Props for the component to be rendered inside the card
 */
export type ChildComponentProps = Record<string, any>;

/**
 * Card styling options
 */
export interface CardStyles {
  /** Background color (CSS value or Tailwind class) */
  backgroundColor?: string;
  /** Border color (CSS value or Tailwind class) */
  borderColor?: string;
  /** Border width (CSS value) */
  borderWidth?: string;
  /** Border radius (CSS value or Tailwind class) */
  borderRadius?: string;
  /** Shadow (CSS value or Tailwind class) */
  boxShadow?: string;
  /** Padding (CSS value or Tailwind class) */
  padding?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

/**
 * UniversalCard component props
 */
export interface UniversalCardProps {
  /** Component to render inside the card */
  component: ComponentType<any>;
  /** Props to pass to the child component */
  componentProps?: ChildComponentProps;
  /** Unique identifier for the card (required when selectable is true) */
  id?: string;
  /** Whether the card can be selected (only works within WrapperItemsSelected) */
  selectable?: boolean;
  /** Minimum width of the card */
  minWidth?: SizeValue;
  /** Minimum height of the card */
  minHeight?: SizeValue;
  /** Width of the card */
  width?: SizeValue;
  /** Height of the card */
  height?: SizeValue;
  /** Card styling options */
  cardStyles?: CardStyles;
  /** Data test ID for testing */
  dataTestId?: string;
  /** Additional content to render above the component */
  headerContent?: ReactNode;
  /** Additional content to render below the component */
  footerContent?: ReactNode;
}
