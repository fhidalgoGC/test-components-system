import { useState } from 'react';
import type { FloatingMenuProps } from '../types';

export const useFloatingMenu = (props: FloatingMenuProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
