import { useState } from 'react';
import { SidebarLayout, useSidebarLayout } from '@/lib/ui-library/layouts/SidebarLayout';
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
  const { collapsed, toggleCollapse } = useSidebarLayout();
  
  return (
    <div className={styles.toolbarArea}>
      <span>Area B (Toolbar)</span>
      <button 
        className={styles.collapseButton}
        onClick={toggleCollapse}
      >
        {collapsed ? 'Expandir A' : 'Colapsar A'}
      </button>
    </div>
  );
}

function BasicMainContent() {
  return (
    <div className={styles.mainArea}>
      <h1 className={styles.mainTitle}>Area C (Main)</h1>
      <p className={styles.mainText}>
        Este es el contenido principal. El area C ocupa todo el espacio restante
        debajo del toolbar (B) y a la derecha del sidebar (A).
      </p>
    </div>
  );
}

function ScrollMainContent() {
  const blocks = Array.from({ length: 20 }, (_, i) => i + 1);
  
  return (
    <div className={styles.mainArea}>
      <h1 className={styles.mainTitle}>Area C con Scroll</h1>
      <p className={styles.mainText} style={{ marginBottom: 20 }}>
        Este ejemplo tiene mucho contenido para demostrar el scroll automatico en el area C.
      </p>
      <div className={styles.longContent}>
        {blocks.map((num) => (
          <div key={num} className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Bloque {num}</h3>
            <p className={styles.blockText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNavContent() {
  return (
    <div className={styles.bottomNavArea}>
      <div className={styles.bottomNavItem}>
        <span className={styles.bottomNavIcon}>🏠</span>
        <span>Inicio</span>
      </div>
      <div className={styles.bottomNavItem}>
        <span className={styles.bottomNavIcon}>🔍</span>
        <span>Buscar</span>
      </div>
      <div className={styles.bottomNavItem}>
        <span className={styles.bottomNavIcon}>➕</span>
        <span>Crear</span>
      </div>
      <div className={styles.bottomNavItem}>
        <span className={styles.bottomNavIcon}>👤</span>
        <span>Perfil</span>
      </div>
    </div>
  );
}

type DemoType = 'basic' | 'scroll' | 'collapsed';

export default function SidebarLayoutDemoPage() {
  const [demo, setDemo] = useState<DemoType>('basic');
  
  const renderMainContent = () => {
    switch (demo) {
      case 'scroll':
        return <ScrollMainContent />;
      case 'basic':
      case 'collapsed':
      default:
        return <BasicMainContent />;
    }
  };
  
  return (
    <>
      <div className={styles.demoSelector}>
        <select 
          className={styles.demoSelect}
          value={demo}
          onChange={(e) => setDemo(e.target.value as DemoType)}
        >
          <option value="basic">Ejemplo Basico</option>
          <option value="scroll">Ejemplo con Scroll</option>
          <option value="collapsed">Ejemplo Colapsado</option>
        </select>
      </div>
      
      <SidebarLayout
        key={demo}
        defaultCollapsed={demo === 'collapsed'}
        sidebarContent={<SidebarContent />}
        toolbarContent={<ToolbarContent />}
        bottomNavContent={<BottomNavContent />}
      >
        {renderMainContent()}
      </SidebarLayout>
    </>
  );
}
