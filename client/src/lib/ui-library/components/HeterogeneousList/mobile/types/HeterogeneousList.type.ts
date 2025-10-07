import type { ReactNode } from 'react';

export interface HeterogeneousListProps {
  children?: ReactNode;
  className?: string;
}

export interface HeterogeneousListState {
  items: any[];
}
