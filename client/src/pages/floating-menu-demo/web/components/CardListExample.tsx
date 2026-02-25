import { useState } from 'react';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';
import styles from '../css/FloatingMenuDemo.module.css';

interface KpiData {
  name: string;
  checked: boolean;
}

const initialKpis: FloatingMenuItem<KpiData>[] = [
  { id: 'kpi-1', data: { name: 'Revenue', checked: true }, render: () => null },
  { id: 'kpi-2', data: { name: 'Conversion Rate', checked: true }, render: () => null },
  { id: 'kpi-3', data: { name: 'Active Users', checked: true }, render: () => null },
  { id: 'kpi-4', data: { name: 'Churn Rate', checked: false }, render: () => null },
  { id: 'kpi-5', data: { name: 'Avg Session', checked: false }, render: () => null },
  { id: 'kpi-6', data: { name: 'NPS Score', checked: false }, render: () => null },
];

function createItems(
  kpis: KpiData[],
  onToggle: (index: number) => void
): FloatingMenuItem<KpiData>[] {
  return kpis.map((kpi, idx) => ({
    id: `kpi-${idx + 1}`,
    data: kpi,
    render: (item) => (
      <label
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
        data-testid={`label-kpi-${idx}`}
      >
        <input
          type="checkbox"
          checked={item.data?.checked ?? false}
          onChange={() => onToggle(idx)}
          style={{ width: 18, height: 18, accentColor: '#22c55e', cursor: 'pointer' }}
          data-testid={`checkbox-kpi-${idx}`}
        />
        <span style={{ fontSize: 14, color: '#374151' }}>{item.data?.name}</span>
      </label>
    ),
  }));
}

export function CardListExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [kpis, setKpis] = useState<KpiData[]>(initialKpis.map((i) => i.data!));

  const handleToggle = (index: number) => {
    setKpis((prev) => prev.map((k, i) => (i === index ? { ...k, checked: !k.checked } : k)));
  };

  const items = createItems(kpis, handleToggle);

  const handleOrderChange = (newItems: FloatingMenuItem<KpiData>[]) => {
    setKpis(newItems.map((i) => i.data!));
  };

  const handleRestore = () => {
    setKpis(initialKpis.map((i) => i.data!));
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-cardlist-title">Card List (gap + bodyClassName)</h2>
      <p className={styles.sectionDescription}>
        Layout tipo tarjeta con separación entre items usando{' '}
        <code className={styles.sectionDescriptionCode}>itemConfig.gap</code>,{' '}
        <code className={styles.sectionDescriptionCode}>bodyClassName</code> para padding del body,
        e <code className={styles.sectionDescriptionCode}>itemClassName</code> para bordes por item.
        Combina <code className={styles.sectionDescriptionCode}>orderable</code> con checkboxes en el render.
      </p>
      <div className={styles.demoArea}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.triggerBtn + ' ' + styles.triggerBtnGreen}
            data-testid="button-cardlist-trigger"
          >
            Select and Order KPIs
          </button>

          <FloatingMenu
            items={items}
            isOpen={isOpen}
            orderable={true}
            onOrderChange={handleOrderChange}
            onClose={() => setIsOpen(false)}
            itemConfig={{ gap: 8 }}
            bodyClassName="p-3"
            itemClassName="border border-gray-300 rounded-md"
            layout={{ widthMode: 'fixed', width: 300, maxHeight: 400 }}
            header={{
              renderType: 'component',
              render: () => (
                <div style={{ padding: '12px 16px' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#111827', fontStyle: 'italic' }}>
                    Select and Order KPIs
                  </span>
                </div>
              ),
            }}
            footer={{
              renderType: 'component',
              render: () => (
                <div
                  style={{
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                  onClick={handleRestore}
                  data-testid="button-restore-config"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>Restore configuration</span>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
