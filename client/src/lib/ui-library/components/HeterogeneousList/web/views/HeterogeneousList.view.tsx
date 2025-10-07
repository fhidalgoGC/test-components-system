import type { HeterogeneousListProps } from '../types';
import { useHeterogeneousList } from '../hooks';

export const HeterogeneousListView: React.FC<HeterogeneousListProps> = ({
  children,
  className,
  ...props
}) => {
  const { state } = useHeterogeneousList();

  return (
    <div className={className} {...props} data-testid="heterogeneous-list-web">
      {children}
    </div>
  );
};
