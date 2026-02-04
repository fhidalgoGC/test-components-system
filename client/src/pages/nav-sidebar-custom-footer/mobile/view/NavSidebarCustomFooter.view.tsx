import { useState } from 'react';
import { Home, Settings, LogOut, User, Menu, X } from 'lucide-react';
import styles from '../css/NavSidebarCustomFooter.module.css';

const menuItems = [
  { id: 'home', label: 'Home', path: '/home', icon: Home },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export const NavSidebarCustomFooterMobileView = () => {
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
        <h1 className={styles.title}>Custom Footer</h1>
      </header>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            <div className={styles.navItems}>
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
            </div>

            <div className={styles.navFooter}>
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
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Custom Footer (Mobile)</h2>
          <p className={styles.cardDescription}>
            Vista móvil con footer personalizado.
          </p>
          <p className={styles.currentPath}>
            Path: <span>{selectedPath}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
