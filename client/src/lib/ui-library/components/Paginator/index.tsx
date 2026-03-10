import { useIsMobile } from '../../hooks';
import type { PaginatorProps } from './shared/types';
import { PaginatorProvider } from './shared/providers';
import { PaginatorWeb } from './web';
import { PaginatorMobile } from './mobile';

export const Paginator = (props: PaginatorProps) => {
  const isMobile = useIsMobile();

  return (
    <PaginatorProvider {...props}>
      {isMobile ? <PaginatorMobile {...props} /> : <PaginatorWeb {...props} />}
    </PaginatorProvider>
  );
};

export type { PaginatorProps, PaginatorContext, PaginatorMetadata } from './shared/types';
export { usePaginatorContext } from './shared/providers';
export { usePaginator } from './shared/hooks';
