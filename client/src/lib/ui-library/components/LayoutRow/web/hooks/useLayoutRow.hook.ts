import { useState } from 'react';
import type { LayoutRowProps } from '../types';

export const useLayoutRow = (props: LayoutRowProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
