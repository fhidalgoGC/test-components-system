import { useState, useCallback } from 'react';

interface UseAppendableStateReturn<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  append: (newItems: T[]) => void;
  prepend: (newItems: T[]) => void;
  clear: () => void;
  reset: (initialData: T[]) => void;
}

export function useAppendableState<T>(initialData: T[] | (() => T[])): UseAppendableStateReturn<T> {
  const [data, setData] = useState<T[]>(initialData);

  const append = useCallback((newItems: T[]) => {
    setData((prev) => [...prev, ...newItems]);
  }, []);

  const prepend = useCallback((newItems: T[]) => {
    setData((prev) => [...newItems, ...prev]);
  }, []);

  const clear = useCallback(() => {
    setData([]);
  }, []);

  const reset = useCallback((initialData: T[]) => {
    setData(initialData);
  }, []);

  return { data, setData, append, prepend, clear, reset };
}
