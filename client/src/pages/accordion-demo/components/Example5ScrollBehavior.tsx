import { Accordion } from '@/lib/ui-library/components/Accordion';
import { SampleHeader } from './SampleHeader';

function TallContent() {
  return (
    <div style={{ height: '600px', background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd, #7dd3fc, #38bdf8, #0ea5e9)', padding: '16px' }}>
      <p style={{ marginBottom: '16px', fontWeight: 600 }}>Contenido de 600px de altura</p>
      <p style={{ marginBottom: '16px', color: '#0369a1' }}>
        Este contenido tiene una altura fija de 600px, pero el body del accordion está configurado con height: 400px y scroll: true.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div key={num} style={{ padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
            <p style={{ fontWeight: 500 }}>Sección {num}</p>
            <p style={{ fontSize: '14px', color: '#475569' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '24px', padding: '12px', background: '#0ea5e9', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
        Final del contenido (600px)
      </p>
    </div>
  );
}

export function Example5ScrollBehavior() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>5. Comportamiento de Scroll</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Body con height fijo de 400px y contenido de 600px. El scroll permite ver todo el contenido.
      </p>
      
      <Accordion
        id="scroll-example"
        defaultOpen={true}
        header={{
          renderType: 'component',
          render: <SampleHeader title="Accordion con scroll (body: 400px, contenido: 600px)" />,
          arrowPosition: 'right',
        }}
        body={{
          renderType: 'component',
          render: <TallContent />,
          heightMode: 'fixed',
          height: 400,
          behaviors: {
            scroll: true,
            renderComponentStrategy: 'once',
          },
        }}
        layout={{
          widthMode: 'full',
        }}
      />
    </div>
  );
}
