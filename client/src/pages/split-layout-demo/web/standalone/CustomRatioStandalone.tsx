import { SplitLayout } from '@/lib/ui-library/components/SplitLayout';

export default function CustomRatioStandalone() {
  return (
    <SplitLayout
      mainPanel={{
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Main Panel</h2>
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
              width: 35% | side: right | vAlign: center | hAlign: center | padding: lg
            </p>
          </div>
        ),
        verticalAlign: 'center',
        horizontalAlign: 'center',
        padding: 'lg',
        background: { color: '#f9fafb' },
      }}
      secondaryPanel={{
        content: (
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Secondary</h2>
            <p style={{ fontSize: 13, opacity: 0.8 }}>width: 65%</p>
          </div>
        ),
        verticalAlign: 'center',
        horizontalAlign: 'center',
        padding: 'lg',
        background: {
          gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        },
      }}
      mainSide="right"
      mainWidthPercent={35}
      fullHeight={true}
    />
  );
}
