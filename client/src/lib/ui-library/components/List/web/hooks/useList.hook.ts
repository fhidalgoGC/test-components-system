import { useState } from 'react';
import type { ListProps } from '../types';

export const useList = (props: ListProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
