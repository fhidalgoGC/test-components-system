import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Package, Settings, BarChart } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarCustomHeader.module.scss';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <BarChart className="h-5 w-5" /> },
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarCustomHeaderPage() {
  const [selectedPath, setSelectedPath] = useState('/dashboard');

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        headerIcon={
          <div className={styles.headerIcon}>
            <Package className="h-4 w-4 text-white" />
          </div>
        }
        headerContent={
          <div className={styles.headerContentWrapper}>
            <div>
              <h1 className={styles.headerTitle}>Mi App</h1>
              <p className={styles.headerSubtitle}>React + TS</p>
            </div>
            <span className={styles.versionBadge}>v2.0</span>
          </div>
        }
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Header Personalizado</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con headerIcon y headerContent separados. El icono se muestra siempre (colapsado o expandido).
        </p>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado actual:</h3>
          <p className={styles.currentPath}>{selectedPath}</p>
          <p className={styles.helpText}>
            Haz clic en cualquier item del menú para ver cómo se selecciona.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Colapsar el menú:</h3>
          <p className={styles.helpText}>
            Usa el botón de colapsar para ver cómo solo el icono permanece visible en el header.
          </p>
        </div>
      </div>
    </div>
  );
}
