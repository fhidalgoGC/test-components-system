import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers';
import { Home, FileText, Folder, Star, Heart, Bell, Mail, Calendar, Clock, User, Settings, HelpCircle, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import styles from './css/NavSidebarScroll.module.scss';

const menuItems = [
  { id: 'home', label: 'Home', i18n: { en: 'Home', es: 'Inicio', default: 'Home' }, path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'documents', label: 'Documents', i18n: { en: 'Documents', es: 'Documentos', default: 'Documents' }, path: '/documents', icon: <FileText className="h-5 w-5" /> },
  { id: 'folders', label: 'Folders', i18n: { en: 'Folders', es: 'Carpetas', default: 'Folders' }, path: '/folders', icon: <Folder className="h-5 w-5" /> },
  { id: 'favorites', label: 'Favorites', i18n: { en: 'Favorites', es: 'Favoritos', default: 'Favorites' }, path: '/favorites', icon: <Star className="h-5 w-5" /> },
  { id: 'liked', label: 'Liked', i18n: { en: 'Liked', es: 'Me gusta', default: 'Liked' }, path: '/liked', icon: <Heart className="h-5 w-5" /> },
  { id: 'notifications', label: 'Notifications', i18n: { en: 'Notifications', es: 'Notificaciones', default: 'Notifications' }, path: '/notifications', icon: <Bell className="h-5 w-5" /> },
  { id: 'messages', label: 'Messages', i18n: { en: 'Messages', es: 'Mensajes', default: 'Messages' }, path: '/messages', icon: <Mail className="h-5 w-5" /> },
  { id: 'calendar', label: 'Calendar', i18n: { en: 'Calendar', es: 'Calendario', default: 'Calendar' }, path: '/calendar', icon: <Calendar className="h-5 w-5" /> },
  { id: 'history', label: 'History', i18n: { en: 'History', es: 'Historial', default: 'History' }, path: '/history', icon: <Clock className="h-5 w-5" /> },
  { id: 'profile', label: 'Profile', i18n: { en: 'Profile', es: 'Perfil', default: 'Profile' }, path: '/profile', icon: <User className="h-5 w-5" /> },
  { id: 'settings', label: 'Settings', i18n: { en: 'Settings', es: 'Configuración', default: 'Settings' }, path: '/settings', icon: <Settings className="h-5 w-5" /> },
  { id: 'help', label: 'Help', i18n: { en: 'Help', es: 'Ayuda', default: 'Help' }, path: '/help', icon: <HelpCircle className="h-5 w-5" /> },
  { id: 'about', label: 'About', i18n: { en: 'About', es: 'Acerca de', default: 'About' }, path: '/about', icon: <Info className="h-5 w-5" /> },
  { id: 'warnings', label: 'Alerts', i18n: { en: 'Alerts', es: 'Alertas', default: 'Alerts' }, path: '/warnings', icon: <AlertCircle className="h-5 w-5" /> },
  { id: 'completed', label: 'Completed', i18n: { en: 'Completed', es: 'Completados', default: 'Completed' }, path: '/completed', icon: <CheckCircle className="h-5 w-5" /> },
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
      />
      <div className={styles.contentArea}>
        <h1 className={styles.pageTitle}>Scroll en Body</h1>
        <p className={styles.pageDescription}>
          NavigationSidebar con muchos items. Solo el Body hace scroll, Header y Footer permanecen fijos.
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

export default function NavSidebarScrollPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  
  return (
    <LibI18nProvider language={language} onLanguageChange={setLanguage}>
      <NavSidebarContent />
    </LibI18nProvider>
  );
}
