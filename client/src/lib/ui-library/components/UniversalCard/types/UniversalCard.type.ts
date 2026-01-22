import { ReactNode, ComponentType } from 'react';

export type SizeValue = string | number;

export type ChildComponentProps = Record<string, any>;

export interface CardStyles {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface UniversalCardProps {
  component: ComponentType<any>;
  componentProps?: ChildComponentProps;
  id?: string;
  selectable?: boolean;
  minWidth?: SizeValue;
  minHeight?: SizeValue;
  width?: SizeValue;
  height?: SizeValue;
  cardStyles?: CardStyles;
  dataTestId?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

export interface UniversalCardNativeProps {
  component: ComponentType<any>;
  componentProps?: ChildComponentProps;
  id?: string;
  selectable?: boolean;
  minWidth?: SizeValue;
  minHeight?: SizeValue;
  width?: SizeValue;
  height?: SizeValue;
  cardStyles?: Omit<CardStyles, 'className' | 'style' | 'boxShadow'>;
  dataTestId?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}
