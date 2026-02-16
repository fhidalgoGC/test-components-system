import type { ComponentType } from 'react';
import { Accordion } from '@/lib/ui-library/components/Accordion';
import { useAccordionController } from '@/lib/ui-library/components/Accordion/shared';
import type { AccordionItemDataProps } from '@/lib/ui-library/components/Accordion/shared';

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

const DriverHeader: ComponentType<AccordionItemDataProps<DriverData>> = ({ itemData }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '4px 0' }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: '15px', color: '#1f2937' }} data-testid={`text-driver-name-${itemData.name}`}>
        {itemData.name}
      </div>
      <div style={{ fontSize: '13px', color: '#6b7280' }} data-testid={`text-driver-vehicle-${itemData.name}`}>
        {itemData.vehicle}
      </div>
    </div>
    <span style={{
      background: '#dbeafe',
      color: '#1d4ed8',
      fontSize: '12px',
      fontWeight: 600,
      padding: '2px 10px',
      borderRadius: '12px',
    }} data-testid={`text-driver-trip-count-${itemData.name}`}>
      {itemData.trips.length} viaje{itemData.trips.length !== 1 ? 's' : ''}
    </span>
  </div>
);

const DriverBody: ComponentType<AccordionItemDataProps<DriverData>> = ({ itemData }) => (
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

export function Example6ItemData() {
  const controller = useAccordionController();

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>6. itemData — Datos genéricos por item</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Cada Accordion recibe <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px' }}>itemData</code> de tipo genérico.
        El header y body son <strong>ComponentType</strong> que reciben esos datos automáticamente.
        Ideal para listas agrupadas (ej: conductores con sus viajes).
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {driversData.map((driver) => (
          <Accordion
            key={driver.name}
            id={`driver-${driver.name}`}
            itemData={driver}
            controller={controller}
            header={{
              renderType: 'component',
              render: DriverHeader,
              arrowPosition: 'right',
              heightMode: 'auto',
            }}
            body={{
              renderType: 'component',
              render: DriverBody,
              behaviors: {
                renderComponentStrategy: 'once',
              },
            }}
            callbacks={{
              onToggleAccordion: (id, isOpen) => {
                console.log(`[ItemData] Accordion ${id} toggled: ${isOpen}`);
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}
