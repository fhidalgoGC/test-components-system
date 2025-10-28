import { useState } from 'react';
import type { LoginCardProps } from '../types';

export const useLoginCard = (props: LoginCardProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
