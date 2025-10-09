import { BottomNavigationBarProvider } from './providers';
import { BottomNavigationBarView } from './views';
import type { BottomNavigationBarProps } from './types';

export const BottomNavigationBar = (props: BottomNavigationBarProps) => {
  return (
    <BottomNavigationBarProvider {...props}>
      <BottomNavigationBarView {...props} />
    </BottomNavigationBarProvider>
  );
};

export type { BottomNavigationBarProps } from './types';
