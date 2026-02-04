import { useState } from 'react';
import { WrapperItemsSelected, useSelection } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import styles from '../css/WrapperItemsSelectedDemo.module.css';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
}

const SelectableCard = ({ id, title, description }: SelectableCardProps) => {
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
        <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

interface SelectableListItemProps {
  id: string;
  name: string;
  email: string;
}

const SelectableListItem = ({ id, name, email }: SelectableListItemProps) => {
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

export const WrapperItemsSelectedDemoMobileView = () => {
  const [controlledSelection, setControlledSelection] = useState<string[]>(['user-2']);

  const products = [
    { id: 'product-1', title: 'Premium Plan', description: 'Advanced features for professionals' },
    { id: 'product-2', title: 'Basic Plan', description: 'Essential features for beginners' },
  ];

  const users = [
    { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 'user-2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: 'user-3', name: 'Carol White', email: 'carol@example.com' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>WrapperItemsSelected</h1>
          <p className={styles.description}>
            Selection wrapper component demo (Mobile)
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Multi-Select Cards</h2>
          <p className={styles.sectionDescription}>
            Tap cards to select/deselect
          </p>

          <WrapperItemsSelected
            defaultSelectedIds={['product-2']}
            multiSelect={true}
          >
            <div className="space-y-3">
              {products.map(product => (
                <SelectableCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                />
              ))}
            </div>
          </WrapperItemsSelected>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Controlled List</h2>
          <p className={styles.sectionDescription}>
            External controls for selection
          </p>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {controlledSelection.length} selected
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setControlledSelection(users.map(u => u.id))}
              data-testid="button-select-all-mobile"
            >
              All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setControlledSelection([])}
              data-testid="button-clear-all-mobile"
            >
              Clear
            </Button>
          </div>

          <WrapperItemsSelected
            selectedIds={controlledSelection}
            onSelectionChange={setControlledSelection}
            multiSelect={true}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2">
              {users.map(user => (
                <SelectableListItem
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                />
              ))}
            </div>
          </WrapperItemsSelected>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Single Select</h2>
          <p className={styles.sectionDescription}>
            Only one item at a time
          </p>

          <WrapperItemsSelected
            defaultSelectedIds={['product-1']}
            multiSelect={false}
          >
            <div className="space-y-3">
              {products.map(product => (
                <SelectableCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                />
              ))}
            </div>
          </WrapperItemsSelected>
        </div>
      </div>
    </div>
  );
};
