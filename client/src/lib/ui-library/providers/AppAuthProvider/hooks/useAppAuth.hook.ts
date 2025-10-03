import { useContext } from 'react';
import { AppAuthContext } from '../views/AppAuthProvider.view';

export function useAppAuth() {
  const context = useContext(AppAuthContext);

  if (!context) {
    throw new Error('useAppAuth must be used within AppAuthProvider');
  }

  return context;
}
