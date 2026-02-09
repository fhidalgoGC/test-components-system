import { useState } from 'react';
import type { ModalProps } from '../types';

export const useModal = (props: ModalProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
