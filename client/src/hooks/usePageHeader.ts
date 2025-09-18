import { useEffect } from 'react';

// Global state for page header
let currentHeader: {
  title?: string;
  description?: string;
  showActionButtons?: boolean;
} = {};

let listeners: (() => void)[] = [];

export function usePageHeader() {
  const setPageHeader = (header: {
    title?: string;
    description?: string;
    showActionButtons?: boolean;
  }) => {
    currentHeader = { ...header };
    listeners.forEach(listener => listener());
  };

  const getPageHeader = () => currentHeader;

  const clearPageHeader = () => {
    currentHeader = {};
    listeners.forEach(listener => listener());
  };

  useEffect(() => {
    return () => {
      // Clear header when component unmounts
      clearPageHeader();
    };
  }, []);

  return {
    setPageHeader,
    getPageHeader,
    clearPageHeader
  };
}

export function usePageHeaderListener(callback: () => void) {
  useEffect(() => {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  }, [callback]);
  
  return currentHeader;
}