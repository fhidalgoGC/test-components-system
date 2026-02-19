import { useState, useCallback } from 'react';
import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps, AcordionListState } from '@/lib/ui-library/components/AcordionList';

type ItemData = {
  name: string;
  description: string;
};

const sampleData: ItemData[] = [
  { name: 'Elemento 1', description: 'Descripción del elemento 1' },
  { name: 'Elemento 2', description: 'Descripción del elemento 2' },
  { name: 'Elemento 3', description: 'Descripción del elemento 3' },
];

const ItemBody: ComponentType<AcordionListItemDataProps<ItemData>> = ({ itemData }) => (
  <div style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }} data-testid={`text-body-${itemData.name}`}>
    {itemData.description}
  </div>
);

export function ExampleStates() {
  const controller = useAcordionListController();
  const [data, setData] = useState<ItemData[]>([]);
  const [stateLabel, setStateLabel] = useState<string>('idle');

  const simulateLoadWithData = useCallback(() => {
    setStateLabel('loading');
    controller.setState('loading');
    setTimeout(() => {
      setData(sampleData);
      setStateLabel('success (auto)');
    }, 1500);
  }, [controller]);

  const simulateLoadEmpty = useCallback(() => {
    setStateLabel('loading');
    controller.setState('loading');
    setTimeout(() => {
      setData([]);
      setStateLabel('empty (auto)');
    }, 1500);
  }, [controller]);

  const simulateError = useCallback(() => {
    setStateLabel('loading');
    controller.setState('loading');
    setTimeout(() => {
      controller.setState('error');
      setStateLabel('error (manual)');
    }, 1500);
  }, [controller]);

  const reset = useCallback(() => {
    setData([]);
    controller.setState('idle');
    setStateLabel('idle');
  }, [controller]);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>7. States — Transiciones automáticas</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El componente detecta cambios en <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>data</code> y
        transiciona automáticamente: datos con items → <strong>success</strong>, datos vacíos desde loading → <strong>empty</strong>.
        Solo <strong>loading</strong> y <strong>error</strong> se controlan manualmente.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={simulateLoadWithData}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #10b981', borderRadius: '6px', cursor: 'pointer', background: '#ecfdf5', color: '#065f46' }}
          data-testid="button-simulate-load-data"
        >
          Simular: loading → success
        </button>
        <button
          onClick={simulateLoadEmpty}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #f59e0b', borderRadius: '6px', cursor: 'pointer', background: '#fffbeb', color: '#92400e' }}
          data-testid="button-simulate-load-empty"
        >
          Simular: loading → empty
        </button>
        <button
          onClick={simulateError}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #ef4444', borderRadius: '6px', cursor: 'pointer', background: '#fef2f2', color: '#991b1b' }}
          data-testid="button-simulate-error"
        >
          Simular: loading → error
        </button>
        <button
          onClick={reset}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff', color: '#374151' }}
          data-testid="button-reset-states"
        >
          Reset (idle)
        </button>
      </div>

      <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#f1f5f9', borderRadius: '6px', fontSize: '13px', color: '#475569' }} data-testid="text-current-state">
        Estado actual: <strong>{stateLabel}</strong> — data.length: <strong>{data.length}</strong>
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', minHeight: '200px' }}>
        <AcordionList
          id="states-demo"
          data={data}
          getItemId={(item) => item.name}
          getItemData={(item) => item}
          controller={controller}
          itemHeader={{
            renderType: 'self',
            getHeaderLabel: (item: ItemData) => item.name,
            arrowPosition: 'right',
          }}
          itemBody={{
            renderType: 'component',
            render: ItemBody,
          }}
          layout={{ widthMode: 'full', gap: 4 }}
          behaviors={{ mode: 'single' }}
          error="No se pudo cargar la información. Intente nuevamente."
        />
      </div>
    </div>
  );
}
