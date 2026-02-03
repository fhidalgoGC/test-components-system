import { useState } from 'react';
import { Accordion, useAccordionController } from '@/lib/ui-library/components/Accordion';

function SampleHeader({ title }: { title: string }) {
  return (
    <span style={{ fontWeight: 600 }}>{title}</span>
  );
}

function SampleBody({ content }: { content: string }) {
  return (
    <div style={{ color: '#374151' }}>
      <p>{content}</p>
    </div>
  );
}

function RenderTrackingBody({ content }: { content: string }) {
  const renderId = Math.floor(Math.random() * 10000);
  return (
    <div style={{ color: '#374151' }}>
      <p>{content}</p>
      <div style={{ marginTop: '12px', padding: '8px', background: '#fef3c7', borderRadius: '4px' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#92400e' }}>
          Render ID: <span style={{ fontFamily: 'monospace' }}>{renderId}</span>
        </p>
        <p style={{ fontSize: '12px', color: '#b45309', marginTop: '4px' }}>
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function Example1InternalControl() {
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

function Example2PropsControl() {
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

function Example3HookControl() {
  const controller = useAccordionController();
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>3. Control por Hook (useAccordionController)</h3>
      <p style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>
        Control imperativo completo desde fuera mediante el hook. El accordion se registra automáticamente.
      </p>
      
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => controller.open('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-open-button"
        >
          Abrir
        </button>
        <button
          onClick={() => controller.close('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-close-button"
        >
          Cerrar
        </button>
        <button
          onClick={() => controller.toggle('hook-control-1')}
          style={{
            padding: '8px 16px',
            background: '#8b5cf6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-toggle-button"
        >
          Toggle
        </button>
        <button
          onClick={() => {
            controller.forceRenderBody('hook-control-1');
            setRenderCount(prev => prev + 1);
          }}
          style={{
            padding: '8px 16px',
            background: '#f59e0b',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-force-render-button"
        >
          Force Re-render Body ({renderCount})
        </button>
        <button
          onClick={() => {
            const state = controller.isOpen('hook-control-1');
            alert(`isOpen: ${state}`);
          }}
          style={{
            padding: '8px 16px',
            background: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          data-testid="hook-check-state-button"
        >
          Check State
        </button>
      </div>
      
      <Accordion
        id="hook-control-1"
        controller={controller}
        defaultOpen={true}
        header={{
          renderType: 'component',
          render: <SampleHeader title="Accordion controlado por hook" />,
          arrowPosition: 'right',
        }}
        body={{
          renderType: 'component',
          render: <SampleBody content="Este accordion se controla mediante useAccordionController. Puedes abrir, cerrar, toggle y forzar re-render del body." />,
          behaviors: {
            renderComponentStrategy: 'always',
            scroll: true,
          },
        }}
        layout={{
          widthMode: 'full',
        }}
        callbacks={{
          onToggleAccordion: (id, isOpen) => {
            console.log(`[Hook] Accordion ${id} toggled: ${isOpen}`);
          },
          onRenderBody: (id) => {
            console.log(`[Hook] Body rendered for ${id}`);
          },
        }}
      />
    </div>
  );
}

function Example4RenderStrategies() {
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

export default function AccordionDemo() {
  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 700 }}>Accordion Component</h1>
      <p style={{ marginBottom: '32px', color: '#6b7280' }}>
        Componente agnóstico y controlable. Soporta control interno, por props y por hook externo.
      </p>
      
      <Example1InternalControl />
      <Example2PropsControl />
      <Example3HookControl />
      <Example4RenderStrategies />
      
      <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Console Logs</h4>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          Abre la consola del navegador para ver los eventos onToggleAccordion y onRenderBody.
        </p>
      </div>
    </div>
  );
}
