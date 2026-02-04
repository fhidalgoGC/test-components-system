export function RenderTrackingBody({ content }: { content: string }) {
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
