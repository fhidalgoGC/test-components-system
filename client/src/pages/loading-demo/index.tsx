import { useState } from 'react';
import { Loading } from '@/lib/ui-library/components/Loading';
import { LoadingProvider, useLoading } from '@/lib/ui-library/providers';
import type { LoadingOverlay, LoadingSize, LoadingCoverage } from '@/lib/ui-library/components/Loading';

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 24,
      background: '#fff',
    }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  );
}

function ComponentLevelDemo() {
  const [overlay, setOverlay] = useState<LoadingOverlay>('transparent');
  const [size, setSize] = useState<LoadingSize>('md');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DemoCard title="Loading a nivel de componente">
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: 13, color: '#6b7280', display: 'block', marginBottom: 4 }}>Overlay</label>
          <select
            value={overlay}
            onChange={(e) => setOverlay(e.target.value as LoadingOverlay)}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
            data-testid="select-overlay"
          >
            <option value="transparent">transparent</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="none">none</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#6b7280', display: 'block', marginBottom: 4 }}>Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as LoadingSize)}
            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
            data-testid="select-size"
          >
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 3000);
            }}
            style={{
              padding: '8px 20px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
            }}
            data-testid="button-toggle-component-loading"
          >
            Mostrar Loading (3s)
          </button>
        </div>
      </div>

      <div style={{
        position: 'relative',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 32,
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: '#f9fafb',
      }}>
        <p style={{ margin: 0, fontSize: 14, color: '#374151' }}>Contenido del componente</p>
        <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>El loading cubre solo esta area</p>
        {isLoading && (
          <Loading
            state="loading"
            overlay={overlay}
            coverage="component"
            size={size}
            label="Cargando datos..."
          />
        )}
      </div>
    </DemoCard>
  );
}

function ProviderControls() {
  const { show, hide, isLoading } = useLoading();

  return (
    <DemoCard title="Loading con Provider (pantalla completa)">
      <p style={{ fontSize: 13, color: '#6b7280', marginTop: 0, marginBottom: 16 }}>
        Usa <code>useLoading()</code> para controlar el loading global desde cualquier componente.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            show({ overlay: 'transparent', label: 'Procesando...' });
            setTimeout(() => hide(), 3000);
          }}
          style={{
            padding: '8px 20px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
          data-testid="button-fullscreen-transparent"
        >
          Transparent (3s)
        </button>
        <button
          onClick={() => {
            show({ overlay: 'light', label: 'Guardando...' });
            setTimeout(() => hide(), 3000);
          }}
          style={{
            padding: '8px 20px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
          data-testid="button-fullscreen-light"
        >
          Light (3s)
        </button>
        <button
          onClick={() => {
            show({ overlay: 'dark', label: 'Enviando...' });
            setTimeout(() => hide(), 3000);
          }}
          style={{
            padding: '8px 20px',
            background: '#1f2937',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
          }}
          data-testid="button-fullscreen-dark"
        >
          Dark (3s)
        </button>
      </div>
      {isLoading && (
        <p style={{ marginTop: 12, fontSize: 12, color: '#ef4444' }}>Loading activo...</p>
      )}
    </DemoCard>
  );
}

function SpinnerSizes() {
  const sizes: LoadingSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <DemoCard title="Tamanos del spinner">
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Loading state="loading" overlay="none" coverage="component" size={s} />
            <span style={{ fontSize: 12, color: '#6b7280' }}>{s}</span>
          </div>
        ))}
      </div>
    </DemoCard>
  );
}

function LoadingDemoContent() {
  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }} data-testid="text-loading-title">
        Loading Component
      </h1>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}>
        Componente de carga configurable. Puede cubrir un componente o la pantalla completa.
        Se controla por props directas o con el <code>LoadingProvider</code>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SpinnerSizes />
        <ComponentLevelDemo />
        <ProviderControls />
      </div>
    </div>
  );
}

export default function LoadingDemo() {
  return (
    <LoadingProvider>
      <LoadingDemoContent />
    </LoadingProvider>
  );
}
