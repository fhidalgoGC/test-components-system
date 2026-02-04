import { useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
}

export const SelectableCard = ({ id, title, description }: SelectableCardProps) => {
  const { isSelected, toggleSelection } = useSelection();
  const selected = isSelected(id);

  return (
    <Card
      className={`cursor-pointer transition-all ${
        selected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
      onClick={() => toggleSelection(id)}
      data-testid={`card-${id}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {selected && (
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};
