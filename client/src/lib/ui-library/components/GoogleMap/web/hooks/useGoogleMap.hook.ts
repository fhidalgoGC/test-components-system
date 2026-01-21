import { useState } from 'react';
import type { GoogleMapProps } from '../types';

export const useGoogleMap = (props: GoogleMapProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
