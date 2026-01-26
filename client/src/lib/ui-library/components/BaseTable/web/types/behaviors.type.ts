import type { ReactNode } from 'react';

export type HoverableTarget = 'header' | 'column' | 'row' | 'cell' | 'none';
export type ClickableTarget = 'header' | 'cell' | 'row' | 'none';

export interface StateConfig {
  defaultText?: string;
  message?: string;
  component?: ReactNode;
}

export interface StatesConfig {
  idle?: StateConfig;
  loading?: StateConfig;
  error?: StateConfig;
  empty?: StateConfig;
}

export interface BehaviorsConfig {
  hoverable?: HoverableTarget;
  clickable?: ClickableTarget;
  states?: StatesConfig;
}
