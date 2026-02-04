import { useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Check } from 'lucide-react';

interface SelectableListItemProps {
  id: string;
  name: string;
  email: string;
}

export const SelectableListItem = ({ id, name, email }: SelectableListItemProps) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        selected 
          ? 'bg-blue-100 dark:bg-blue-900' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={() => toggleSelection(id)}
      data-testid={`list-item-${id}`}
    >
      <div
        className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
          selected 
            ? 'bg-blue-500 border-blue-500' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
      </div>
    </div>
  );
};
