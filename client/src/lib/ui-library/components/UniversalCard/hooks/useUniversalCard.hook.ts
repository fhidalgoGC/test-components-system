import { useState } from 'react';
import type { UniversalCardProps } from '../types';

export const useUniversalCard = (props: UniversalCardProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
