export interface NavbarProps {
  title: string;
  description: string;
  className?: string;
  showBorder?: boolean;
}

export interface NavbarState {
  currentTheme: 'light' | 'dark';
}

export interface NavbarConfig {
  responsiveBreakpoint: number;
  maxWidth?: string;
  backgroundColor?: string;
}