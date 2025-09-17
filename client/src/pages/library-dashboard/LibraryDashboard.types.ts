import { ReactNode } from 'react';

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  content: ReactNode;
}

export interface ComponentInfo {
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  features: string[];
  href: string;
}

export interface LibraryFeature {
  name: string;
  description: string;
  icon: string;
  iconColor: string;
}