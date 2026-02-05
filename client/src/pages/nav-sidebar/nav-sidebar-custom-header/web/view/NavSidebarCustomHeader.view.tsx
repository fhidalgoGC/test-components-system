import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { AppLanguageProvider, useAppLanguage, LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers';
import { Home, Package, Settings, BarChart } from 'lucide-react';
import { useState } from 'react';
import styles from '../css/NavSidebarCustomHeader.module.scss';

const menuItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    i18n: { en: 'Dashboard', es: 'Panel', default: 'Dashboard' },
    path: '/dashboard', 
    icon: <BarChart className="h-5 w-5" /> 
  },
  { 
    id: 'home', 
    label: 'Home', 
    i18n: { en: 'Home', es: 'Inicio', default: 'Home' },
    path: '/home', 
    icon: <Home className="h-5 w-5" /> 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    i18n: { en: 'Settings', es: 'Configuración', default: 'Settings' },
    path: '/settings', 
    icon: <Settings className="h-5 w-5" /> 
  },
];

function NavSidebarContent() {
  const [selectedPath, setSelectedPath] = useState('/dashboard');
  const [headerHeight, setHeaderHeight] = useState<number>(120);
  const [showFooter, setShowFooter] = useState<boolean>(true);
  const { lang } = useLibI18n();

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        headerHeight={headerHeight}
        showFooter={showFooter}
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
          <h3 className={styles.cardTitle}>Altura del Header:</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <input
              type="range"
              min="60"
              max="200"
              value={headerHeight}
              onChange={(e) => setHeaderHeight(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontWeight: 'bold', minWidth: '60px' }}>{headerHeight}px</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button 
              onClick={() => setHeaderHeight(60)} 
              style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
              60px
            </button>
            <button 
              onClick={() => setHeaderHeight(100)} 
              style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
              100px
            </button>
            <button 
              onClick={() => setHeaderHeight(150)} 
              style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
              150px
            </button>
            <button 
              onClick={() => setHeaderHeight(200)} 
              style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
              200px
            </button>
          </div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Mostrar Footer:</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showFooter}
              onChange={(e) => setShowFooter(e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <span>{showFooter ? 'Footer visible' : 'Footer oculto'}</span>
          </label>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado actual:</h3>
          <p className={styles.currentPath}>{selectedPath}</p>
          <p className={styles.helpText}>
            Idioma actual: <strong>{lang.toUpperCase()}</strong>
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

function NavSidebarWithLibI18n() {
  const appLanguage = useAppLanguage();
  
  return (
    <LibI18nProvider parentLanguageProvider={appLanguage}>
      <NavSidebarContent />
    </LibI18nProvider>
  );
}

export const NavSidebarCustomHeaderWebView = () => {
  return (
    <AppLanguageProvider initial="en">
      <NavSidebarWithLibI18n />
    </AppLanguageProvider>
  );
};
