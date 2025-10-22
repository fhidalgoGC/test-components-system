import { useState } from 'react';
import type { CarouselProps } from '../types';

export const useCarousel = (props: CarouselProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
