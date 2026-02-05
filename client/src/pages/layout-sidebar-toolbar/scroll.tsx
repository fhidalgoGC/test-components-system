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
      <span>Area B (Toolbar) - Demo Scroll</span>
      <button 
        className={styles.collapseButton}
        onClick={toggleCollapse}
      >
        {collapsed ? 'Expandir A' : 'Colapsar A'}
      </button>
    </div>
  );
}

function ScrollMainContent() {
  const blocks = Array.from({ length: 30 }, (_, i) => i + 1);
  
  return (
    <div className={styles.mainArea}>
      <h1 className={styles.mainTitle}>Area C con Scroll Automatico</h1>
      <p className={styles.mainText} style={{ marginBottom: 20 }}>
        Este ejemplo tiene mucho contenido para demostrar el scroll automatico en el area C.
        Cuando el contenido excede el espacio disponible, aparece scroll vertical.
      </p>
      <div className={styles.longContent}>
        {blocks.map((num) => (
          <div key={num} className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Bloque de contenido #{num}</h3>
            <p className={styles.blockText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SidebarLayoutScrollPage() {
  return (
    <SidebarLayout
      sidebarContent={<SidebarContent />}
      toolbarContent={<ToolbarContent />}
      mainPaddingX={24}
      mainPaddingY={16}
    >
      <ScrollMainContent />
    </SidebarLayout>
  );
}
