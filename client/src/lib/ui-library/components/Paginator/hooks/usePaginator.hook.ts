import { useState } from 'react';
import type { PaginatorProps } from '../types';

export const usePaginator = (props: PaginatorProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
