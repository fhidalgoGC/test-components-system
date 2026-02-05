import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { AppLanguageProvider, useAppLanguage, LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers';
import { Home, Settings, Users, FileText } from 'lucide-react';
import { useState } from 'react';
import styles from '../css/NavSidebarBasic.module.scss';

const menuItems = [
  { 
    id: 'home', 
    label: 'Home',
    i18n: { en: 'Home', es: 'Inicio', default: 'Home' },
    path: '/home', 
    icon: <Home className="h-5 w-5" /> 
  },
  { 
    id: 'users', 
    label: 'Users',
    i18n: { en: 'Users', es: 'Usuarios', default: 'Users' },
    path: '/users', 
    icon: <Users className="h-5 w-5" /> 
  },
  { 
    id: 'docs', 
    label: 'Documents',
    i18n: { en: 'Documents', es: 'Documentos', default: 'Documents' },
    path: '/docs', 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    id: 'settings', 
    label: 'Settings',
    i18n: { en: 'Settings', es: 'Configuración', default: 'Settings' },
    path: '/settings', 
    icon: <Settings className="h-5 w-5" /> 
  },
];

function y () {
  const [selectedPath, setSelectedPath] = useState('/home');
  const { lang } = useLibI18n();

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
        <h1 className={styles.pageTitle}>Ejemplo Básico con i18n</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con items traducibles usando AppLanguageProvider + LibI18nProvider.
          Cambia el idioma en el footer para ver cómo los items se traducen automáticamente.
        </p>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado actual:</h3>
          <p className={styles.currentPath}>{selectedPath}</p>
          <p className={styles.helpText}>
            Idioma actual: <strong>{lang.toUpperCase()}</strong>
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

export const NavSidebarBasicWebView = () => {
  return (
    <AppLanguageProvider initial="en">
      <NavSidebarWithLibI18n />
    </AppLanguageProvider>
  );
};
