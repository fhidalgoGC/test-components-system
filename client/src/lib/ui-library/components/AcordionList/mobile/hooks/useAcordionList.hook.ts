import { useState } from 'react';
import type { AcordionListProps } from '../types';

export const useAcordionList = (props: AcordionListProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
