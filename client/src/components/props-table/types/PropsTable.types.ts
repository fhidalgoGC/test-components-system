export interface PropInfo {
  name: string;
  description: string;
  type: string;
  example: string;
}

export interface PropsTableProps {
  props: PropInfo[];
  titleKey?: string;
  descriptionKey?: string;
  title?: string;
  description?: string;
  className?: string;
}

export interface PropsTableState {
  isLoaded: boolean;
}

export interface PropsTableConfig {
  maxItems?: number;
  showBorder?: boolean;
  headerBold?: boolean;
}