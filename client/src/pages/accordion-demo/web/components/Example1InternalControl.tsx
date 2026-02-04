import { Accordion } from '@/lib/ui-library/components/Accordion';
import { SampleHeader } from './SampleHeader';
import { SampleBody } from './SampleBody';

export function Example1InternalControl() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>1. Control Interno (No Controlado)</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        El accordion maneja su propio estado. Click en el header para abrir/cerrar.
      </p>
      
      <Accordion
        id="internal-1"
        defaultOpen={false}
        header={{
          renderType: 'component',
          render: <SampleHeader title="Accordion con control interno" />,
          arrowPosition: 'right',
        }}
        body={{
          renderType: 'component',
          render: <SampleBody content="Este contenido se controla internamente. El estado está manejado por el propio componente." />,
          behaviors: {
            renderComponentStrategy: 'once',
          },
        }}
        callbacks={{
          onToggleAccordion: (id, isOpen) => {
            console.log(`[Internal] Accordion ${id} toggled: ${isOpen}`);
          },
          onRenderBody: (id) => {
            console.log(`[Internal] Body rendered for ${id}`);
          },
        }}
      />
    </div>
  );
}
