export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  component?: React.ComponentType;
  content?: React.ReactNode;
}

export interface ComponentLayoutProps {
  componentName: string;
  componentDescription?: string;
  // Legacy support for manual tabs
  tabs?: TabConfig[];
  defaultTab?: string;
  className?: string;
  children?: React.ReactNode;
}