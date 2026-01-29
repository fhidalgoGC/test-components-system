import type { PaginatorProps } from './types';
import { PaginatorProvider } from './providers';
import { PaginatorView } from './views';

export const Paginator = (props: PaginatorProps) => {
  return (
    <PaginatorProvider {...props}>
      <PaginatorView {...props} />
    </PaginatorProvider>
  );
};

export type { PaginatorProps, PaginatorContext, PaginatorMetadata } from './types';
export { usePaginatorContext } from './providers';
export { usePaginator } from './hooks';
