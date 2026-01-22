import { ReactNode, ComponentType } from 'react';

export type SizeValue = string | number;

export type ChildComponentProps = Record<string, any>;

export interface CardStyles {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
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
  cardStyles?: CardStyles;
  dataTestId?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}
