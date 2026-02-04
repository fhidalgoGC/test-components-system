import { UniversalCard } from '@/lib/ui-library/components/UniversalCard';
import { WrapperItemsSelected } from '@/lib/ui-library/components/WrapperItemsSelected';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import styles from '../css/UniversalCardDemo.module.css';

const SimpleContent = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-2">
    <h3 className="text-base font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const StatCard = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="text-center space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
    <p className={`text-xs ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
      {trend}
    </p>
  </div>
);

const InteractiveComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-3">
      <p className="text-center text-xl font-bold">Counter: {count}</p>
      <div className="flex gap-2 justify-center">
        <Button size="sm" onClick={() => setCount(count - 1)} variant="outline" data-testid="button-decrement-mobile">
          -
        </Button>
        <Button size="sm" onClick={() => setCount(count + 1)} data-testid="button-increment-mobile">
          +
        </Button>
        <Button size="sm" onClick={() => setCount(0)} variant="destructive" data-testid="button-reset-mobile">
          Reset
        </Button>
      </div>
    </div>
  );
};

export const UniversalCardDemoMobileView = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>UniversalCard Demo</h1>
          <p className={styles.description}>
            Mobile view of UniversalCard examples
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Cards</h2>
          <div className="space-y-3">
            <UniversalCard
              component={SimpleContent}
              componentProps={{
                title: "Simple Card",
                description: "Basic card with simple content"
              }}
              width="w-full"
              minHeight={100}
              dataTestId="card-basic-mobile-1"
            />

            <UniversalCard
              component={SimpleContent}
              componentProps={{
                title: "Another Card",
                description: "Full width card for mobile"
              }}
              width="w-full"
              minHeight={100}
              dataTestId="card-basic-mobile-2"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Stats Cards</h2>
          <div className="grid grid-cols-2 gap-3">
            <UniversalCard
              component={StatCard}
              componentProps={{
                label: "Users",
                value: "1,234",
                trend: "+12.5%"
              }}
              cardStyles={{
                backgroundColor: "#f0f9ff",
                borderColor: "#3b82f6",
                borderWidth: "2px",
                borderRadius: "12px"
              }}
              dataTestId="card-stat-mobile-1"
            />

            <UniversalCard
              component={StatCard}
              componentProps={{
                label: "Revenue",
                value: "$45.2K",
                trend: "+8.3%"
              }}
              cardStyles={{
                backgroundColor: "#f0fdf4",
                borderColor: "#22c55e",
                borderWidth: "2px",
                borderRadius: "12px"
              }}
              dataTestId="card-stat-mobile-2"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Interactive</h2>
          <UniversalCard
            component={InteractiveComponent}
            width="w-full"
            minHeight={120}
            headerContent={
              <h3 className="font-semibold text-center text-sm">Counter</h3>
            }
            dataTestId="card-interactive-mobile"
          />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Selectable Cards</h2>
          <div className="flex gap-2 items-center mb-3">
            <Badge variant="outline" className="text-xs" data-testid="badge-selected-count-mobile">
              Selected: {selectedCards.length}
            </Badge>
            {selectedCards.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedCards([])}
                data-testid="button-clear-selection-mobile"
              >
                Clear
              </Button>
            )}
          </div>

          <WrapperItemsSelected
            selectedIds={selectedCards}
            onSelectionChange={setSelectedCards}
            multiSelect={true}
          >
            <div className="space-y-3">
              <UniversalCard
                id="card-1"
                selectable={true}
                component={StatCard}
                componentProps={{
                  label: "Product A",
                  value: "145",
                  trend: "+12.5%"
                }}
                width="w-full"
                dataTestId="card-selectable-mobile-1"
              />

              <UniversalCard
                id="card-2"
                selectable={true}
                component={StatCard}
                componentProps={{
                  label: "Product B",
                  value: "289",
                  trend: "+8.3%"
                }}
                width="w-full"
                dataTestId="card-selectable-mobile-2"
              />

              <UniversalCard
                id="card-3"
                selectable={true}
                component={StatCard}
                componentProps={{
                  label: "Product C",
                  value: "432",
                  trend: "-2.1%"
                }}
                width="w-full"
                dataTestId="card-selectable-mobile-3"
              />
            </div>
          </WrapperItemsSelected>
        </div>
      </div>
    </div>
  );
};
