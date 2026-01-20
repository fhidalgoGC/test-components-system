import { useState } from 'react';
import { SidebarLayout, useSidebarLayout } from '@/lib/ui-library/layouts';
import styles from './css/SidebarLayoutDemo.module.scss';

function SidebarContent() {
  const { collapsed } = useSidebarLayout();
  
  return (
    <div className={styles.sidebarArea}>
      <span>{collapsed ? 'A' : 'Area A'}</span>
      <span style={{ fontSize: 12, marginTop: 8 }}>
        {collapsed ? '' : '(Sidebar)'}
      </span>
    </div>
  );
}

function ToolbarContent() {
  const { collapsed } = useSidebarLayout();
  
  return (
    <div className={styles.toolbarArea}>
      <span>Area B (Toolbar) - Modo Controlado</span>
      <span style={{ fontSize: 14, opacity: 0.8 }}>
        Estado: {collapsed ? 'Colapsado' : 'Expandido'}
      </span>
    </div>
  );
}

function MainContent() {
  return (
    <div className={styles.mainArea}>
      <h1 className={styles.mainTitle}>Modo Controlado</h1>
      <p className={styles.mainText}>
        En este ejemplo, el estado de colapso se controla externamente desde el componente padre.
        Usa los botones de abajo para controlar el sidebar.
      </p>
    </div>
  );
}

export default function SidebarLayoutControlledPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '10px 20px', 
        background: '#1e293b', 
        color: 'white',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <span>Control Externo:</span>
        <button 
          onClick={() => setIsCollapsed(false)}
          style={{
            padding: '8px 16px',
            background: !isCollapsed ? '#3b82f6' : '#475569',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Expandido
        </button>
        <button 
          onClick={() => setIsCollapsed(true)}
          style={{
            padding: '8px 16px',
            background: isCollapsed ? '#3b82f6' : '#475569',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Colapsado
        </button>
      </div>
      
      <div style={{ flex: 1 }}>
        <SidebarLayout
          collapsed={isCollapsed}
          onCollapseChange={setIsCollapsed}
          sidebarContent={<SidebarContent />}
          toolbarContent={<ToolbarContent />}
        >
          <MainContent />
        </SidebarLayout>
      </div>
    </div>
  );
}
