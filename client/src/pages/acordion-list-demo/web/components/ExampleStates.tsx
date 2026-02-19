import { useState } from 'react';
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

const states: AcordionListState[] = ['idle', 'loading', 'success', 'empty', 'error'];

export function ExampleStates() {
  const controller = useAcordionListController();
  const [currentState, setCurrentState] = useState<AcordionListState>('idle');

  const handleStateChange = (state: AcordionListState) => {
    setCurrentState(state);
    controller.setState(state);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>7. States (idle, loading, success, empty, error)</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Ciclo de vida: <strong>idle</strong> (sin datos) → <strong>loading</strong> → <strong>success</strong> (datos visibles) / <strong>empty</strong> / <strong>error</strong>.
        Solo loading, empty y error tienen visualización especial. idle y success muestran el contenido normal.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {states.map((state) => (
          <button
            key={state}
            onClick={() => handleStateChange(state)}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              border: `1px solid ${currentState === state ? '#3b82f6' : '#d1d5db'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              background: currentState === state ? '#eff6ff' : '#fff',
              color: currentState === state ? '#3b82f6' : '#374151',
              fontWeight: currentState === state ? 600 : 400,
            }}
            data-testid={`button-state-${state}`}
          >
            {state}
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', minHeight: '200px' }}>
        <AcordionList
          id="states-demo"
          data={sampleData}
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
