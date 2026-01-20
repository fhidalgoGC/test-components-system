import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers';
import { Home, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarCustomFooter.module.scss';

const menuItems = [
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
  const [selectedPath, setSelectedPath] = useState('/home');
  const { lang, setLanguage } = useLibI18n();

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language as 'en' | 'es');
  };

  return (
    <div className={styles.pageContainer}>
      <NavigationSidebar
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
        currentLanguage={lang}
        onLanguageChange={handleLanguageChange}
        footerContent={
          <div className={styles.footerContainer}>
            <div className={styles.userCard}>
              <div className={styles.userAvatar}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>John Doe</p>
                <p className={styles.userEmail}>admin@example.com</p>
              </div>
            </div>
            <button className={styles.logoutButton}>
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        }
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Footer Personalizado</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con footerContent personalizado: perfil de usuario y botón de logout.
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

export default function NavSidebarCustomFooterPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  
  return (
    <LibI18nProvider language={language} onLanguageChange={setLanguage}>
      <NavSidebarContent />
    </LibI18nProvider>
  );
}
