import type { HeterogeneousListProps } from '../types';
import { useHeterogeneousList } from '../hooks';

export const HeterogeneousListView: React.FC<HeterogeneousListProps> = ({
  children,
  className,
}) => {
  const { state } = useHeterogeneousList();

  return (
    <div className={className} data-testid="heterogeneous-list-web">
      {children}
    </div>
  );
};
