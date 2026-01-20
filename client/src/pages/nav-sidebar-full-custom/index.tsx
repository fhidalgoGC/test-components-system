import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Package, Settings, Zap, User, Crown } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarFullCustom.module.scss';

const menuItems = [
  { id: 'home', label: 'Dashboard', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'products', label: 'Productos', path: '/products', icon: <Package className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarFullCustomPage() {
  const [selectedPath, setSelectedPath] = useState('/home');

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        headerIcon={
          <div className={styles.headerIcon}>
            <Zap className="h-5 w-5 text-white" />
          </div>
        }
        headerContent={
          <div>
            <h1 className={styles.headerTitle}>SuperApp</h1>
            <p className={styles.headerSubtitle}>Enterprise Edition</p>
          </div>
        }
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
        footerContent={
          <div className={styles.footerContainer}>
            <div className={styles.userCard}>
              <div className={styles.userAvatar}>
                <User className="h-5 w-5 text-white" />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userNameContainer}>
                  <span className={styles.userName}>Admin</span>
                  <Crown className={`h-3 w-3 ${styles.crownIcon}`} />
                </div>
                <p className={styles.userPlan}>Plan Pro</p>
              </div>
            </div>
          </div>
        }
        collapsedWidth={70}
        expandedWidth={260}
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Full Custom</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con Header y Footer completamente personalizados. El icono del header se ve siempre.
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
