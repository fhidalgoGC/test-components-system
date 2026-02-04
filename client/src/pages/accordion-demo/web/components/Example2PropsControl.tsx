import { useState } from 'react';
import { Accordion } from '@/lib/ui-library/components/Accordion';
import { SampleHeader } from './SampleHeader';
import { SampleBody } from './SampleBody';

export function Example2PropsControl() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>2. Control por Props (Controlado)</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El estado se controla externamente mediante props. Usa el botón o el header.
      </p>
      
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="toggle-props-button"
        >
          {isOpen ? 'Cerrar' : 'Abrir'} desde fuera
        </button>
        <span style={{ marginLeft: '12px', color: '#6b7280', fontSize: '14px' }}>
          Estado actual: <strong>{isOpen ? 'Abierto' : 'Cerrado'}</strong>
        </span>
      </div>
      
      <Accordion
        id="props-control-1"
        isOpen={isOpen}
        header={{
          renderType: 'component',
          render: <SampleHeader title="Accordion controlado por props" />,
          arrowPosition: 'left',
        }}
        body={{
          renderType: 'component',
          render: <SampleBody content="Este contenido se controla mediante isOpen prop. El padre decide cuándo está abierto o cerrado." />,
          behaviors: {
            renderComponentStrategy: 'once',
          },
        }}
        callbacks={{
          onToggleAccordion: (_, newState) => {
            console.log(`[Props] Requested state: ${newState}`);
            setIsOpen(newState);
          },
        }}
      />
    </div>
  );
}
