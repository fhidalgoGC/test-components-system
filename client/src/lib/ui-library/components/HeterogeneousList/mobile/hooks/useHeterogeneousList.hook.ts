import { useState } from 'react';
import type { HeterogeneousListState } from '../types';

export function useHeterogeneousList() {
  const [state, setState] = useState<HeterogeneousListState>({
    items: [],
  });

  return {
    state,
    setState,
  };
}
