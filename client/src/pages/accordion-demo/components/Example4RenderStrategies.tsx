import { Accordion } from '@/lib/ui-library/components/Accordion';
import { SampleHeader } from './SampleHeader';
import { RenderTrackingBody } from './RenderTrackingBody';

export function Example4RenderStrategies() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>4. Estrategias de Render</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Compara "once" (mantiene el componente montado) vs "always" (desmonta/monta en cada toggle).
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Strategy: "once"</p>
          <Accordion
            id="strategy-once"
            defaultOpen={false}
            header={{
              renderType: 'component',
              render: <SampleHeader title="Render Once" />,
              arrowPosition: 'left',
            }}
            body={{
              renderType: 'component',
              render: <RenderTrackingBody content="Este body se monta una vez y se oculta con display:none. El Render ID NO cambia." />,
              behaviors: {
                renderComponentStrategy: 'once',
              },
            }}
          />
        </div>
        
        <div>
          <p style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600 }}>Strategy: "always"</p>
          <Accordion
            id="strategy-always"
            defaultOpen={false}
            header={{
              renderType: 'component',
              render: <SampleHeader title="Render Always" />,
              arrowPosition: 'right',
            }}
            body={{
              renderType: 'component',
              render: <RenderTrackingBody content="Este body se desmonta al cerrar. El Render ID CAMBIA cada vez que abres." />,
              behaviors: {
                renderComponentStrategy: 'always',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
