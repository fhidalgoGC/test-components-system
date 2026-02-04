import { useState } from 'react';
import { Home, FileText, Folder, Star, Heart, Bell, Mail, Calendar, Clock, User, Settings, HelpCircle, Info, AlertCircle, CheckCircle, Menu, X } from 'lucide-react';
import styles from '../css/NavSidebarScroll.module.css';

const menuItems = [
  { id: 'home', label: 'Home', path: '/home', icon: Home },
  { id: 'documents', label: 'Documents', path: '/documents', icon: FileText },
  { id: 'folders', label: 'Folders', path: '/folders', icon: Folder },
  { id: 'favorites', label: 'Favorites', path: '/favorites', icon: Star },
  { id: 'liked', label: 'Liked', path: '/liked', icon: Heart },
  { id: 'notifications', label: 'Notifications', path: '/notifications', icon: Bell },
  { id: 'messages', label: 'Messages', path: '/messages', icon: Mail },
  { id: 'calendar', label: 'Calendar', path: '/calendar', icon: Calendar },
  { id: 'history', label: 'History', path: '/history', icon: Clock },
  { id: 'profile', label: 'Profile', path: '/profile', icon: User },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
  { id: 'help', label: 'Help', path: '/help', icon: HelpCircle },
  { id: 'about', label: 'About', path: '/about', icon: Info },
  { id: 'warnings', label: 'Alerts', path: '/warnings', icon: AlertCircle },
  { id: 'completed', label: 'Completed', path: '/completed', icon: CheckCircle },
];

export const NavSidebarScrollMobileView = () => {
  const [selectedPath, setSelectedPath] = useState('/home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className={styles.title}>Scroll Demo</h1>
      </header>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${selectedPath === item.path ? styles.navItemActive : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Scroll en Body (Mobile)</h2>
          <p className={styles.cardDescription}>
            Vista móvil simplificada del NavigationSidebar con menú desplegable.
          </p>
          <p className={styles.currentPath}>
            Path: <span>{selectedPath}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
