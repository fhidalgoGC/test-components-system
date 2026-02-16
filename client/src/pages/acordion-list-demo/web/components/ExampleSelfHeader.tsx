import type { ComponentType } from 'react';
import { AcordionList, useAcordionListController } from '@/lib/ui-library/components/AcordionList';
import type { AcordionListItemDataProps } from '@/lib/ui-library/components/AcordionList';

type DriverData = {
  name: string;
  vehicle: string;
  trips: { id: string; from: string; to: string; date: string; amount: string }[];
};

const driversData: DriverData[] = [
  {
    name: 'Carlos Méndez',
    vehicle: 'Toyota Corolla 2022 - ABC-123',
    trips: [
      { id: 't1', from: 'Centro', to: 'Aeropuerto', date: '2025-01-15', amount: '$45.00' },
      { id: 't2', from: 'Mall Norte', to: 'Zona Industrial', date: '2025-01-16', amount: '$32.50' },
      { id: 't3', from: 'Hospital', to: 'Universidad', date: '2025-01-17', amount: '$18.00' },
    ],
  },
  {
    name: 'Ana García',
    vehicle: 'Honda Civic 2023 - XYZ-789',
    trips: [
      { id: 't4', from: 'Estación Central', to: 'Puerto', date: '2025-01-15', amount: '$55.00' },
      { id: 't5', from: 'Parque Sur', to: 'Centro Comercial', date: '2025-01-18', amount: '$22.00' },
    ],
  },
  {
    name: 'Miguel Torres',
    vehicle: 'Nissan Sentra 2021 - DEF-456',
    trips: [
      { id: 't6', from: 'Terminal', to: 'Hotel Plaza', date: '2025-01-14', amount: '$28.00' },
    ],
  },
];

const DriverBody: ComponentType<AcordionListItemDataProps<DriverData>> = ({ itemData }) => (
  <div style={{ padding: '8px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }} data-testid={`table-driver-trips-${itemData.name}`}>
      <thead>
        <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
          <th style={{ textAlign: 'left', padding: '6px 8px', color: '#6b7280', fontWeight: 500 }}>Fecha</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', color: '#6b7280', fontWeight: 500 }}>Origen</th>
          <th style={{ textAlign: 'left', padding: '6px 8px', color: '#6b7280', fontWeight: 500 }}>Destino</th>
          <th style={{ textAlign: 'right', padding: '6px 8px', color: '#6b7280', fontWeight: 500 }}>Monto</th>
        </tr>
      </thead>
      <tbody>
        {itemData.trips.map((trip) => (
          <tr key={trip.id} style={{ borderBottom: '1px solid #f3f4f6' }} data-testid={`row-trip-${trip.id}`}>
            <td style={{ padding: '6px 8px', color: '#374151' }}>{trip.date}</td>
            <td style={{ padding: '6px 8px', color: '#374151' }}>{trip.from}</td>
            <td style={{ padding: '6px 8px', color: '#374151' }}>{trip.to}</td>
            <td style={{ padding: '6px 8px', color: '#059669', fontWeight: 600, textAlign: 'right' }}>{trip.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export function ExampleSelfHeader() {
  const controller = useAcordionListController();

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>1. Header Self + mode single</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El header usa <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>renderType: 'self'</code> con{' '}
        <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>getHeaderLabel</code> para mostrar el nombre del conductor.
        En modo <strong>single</strong>: al abrir uno se cierra el anterior.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => controller.closeAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-close-all-self"
        >
          Cerrar todos
        </button>
        <button
          onClick={() => controller.refreshAll()}
          style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
          data-testid="button-refresh-all-self"
        >
          Refrescar todos
        </button>
      </div>

      <AcordionList
        id="self-header-demo"
        data={driversData}
        getItemId={(item) => item.name}
        getItemData={(item) => item}
        controller={controller}
        itemHeader={{
          renderType: 'self',
          getHeaderLabel: (item: DriverData) => `${item.name} — ${item.vehicle}`,
          arrowPosition: 'right',
        }}
        itemBody={{
          renderType: 'component',
          render: DriverBody,
          behaviors: { renderComponentStrategy: 'once' },
        }}
        layout={{
          widthMode: 'full',
          gap: 4,
        }}
        behaviors={{
          mode: 'single',
        }}
        callbacks={{
          onToggle: (id, isOpen) => {
            console.log(`[SelfHeader] ${id} toggled: ${isOpen}`);
          },
          onOpenChange: (openIds) => {
            console.log(`[SelfHeader] Open IDs:`, openIds);
          },
        }}
      />
    </div>
  );
}
