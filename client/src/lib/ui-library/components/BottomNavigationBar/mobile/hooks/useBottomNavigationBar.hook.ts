import { useState } from 'react';
import type { BottomNavigationBarProps } from '../types';

export const useBottomNavigationBar = (props: BottomNavigationBarProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
