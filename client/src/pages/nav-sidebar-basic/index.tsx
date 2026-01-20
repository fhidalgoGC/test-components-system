import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Settings, Users, FileText } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarBasic.module.scss';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'users', label: 'Usuarios', path: '/users', icon: <Users className="h-5 w-5" /> },
  { id: 'docs', label: 'Documentos', path: '/docs', icon: <FileText className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarBasicPage() {
  const [selectedPath, setSelectedPath] = useState('/home');

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Ejemplo Básico</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con Header y Footer predeterminados.
          El Footer incluye controles de tema e idioma.
        </p>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado actual:</h3>
          <p className={styles.currentPath}>{selectedPath}</p>
          <p className={styles.helpText}>
            Haz clic en cualquier item del menú para ver cómo se selecciona.
          </p>
        </div>
      </div>
    </div>
  );
}
