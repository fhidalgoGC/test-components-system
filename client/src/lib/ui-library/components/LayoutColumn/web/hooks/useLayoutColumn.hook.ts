import { useState } from 'react';
import type { LayoutColumnProps } from '../types';

export const useLayoutColumn = (props: LayoutColumnProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
