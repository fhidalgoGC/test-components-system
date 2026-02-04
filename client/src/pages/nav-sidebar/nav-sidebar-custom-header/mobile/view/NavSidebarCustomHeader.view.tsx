import { useState } from 'react';
import { Home, Package, Settings, BarChart, Menu, X } from 'lucide-react';
import styles from '../css/NavSidebarCustomHeader.module.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: BarChart },
  { id: 'home', label: 'Home', path: '/home', icon: Home },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export const NavSidebarCustomHeaderMobileView = () => {
  const [selectedPath, setSelectedPath] = useState('/dashboard');
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
        <div className={styles.headerBrand}>
          <div className={styles.headerIcon}>
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className={styles.headerTitle}>Mi App</span>
          <span className={styles.versionBadge}>v2.0</span>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            <div className={styles.navHeader}>
              <div className={styles.headerIcon}>
                <Package className="h-4 w-4 text-white" />
              </div>
              <div className={styles.navHeaderInfo}>
                <p className={styles.navHeaderTitle}>Mi App</p>
                <p className={styles.navHeaderSubtitle}>React + TS</p>
              </div>
              <span className={styles.versionBadge}>v2.0</span>
            </div>

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
          </nav>
        </div>
      )}

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Custom Header (Mobile)</h2>
          <p className={styles.cardDescription}>
            Vista móvil con header personalizado.
          </p>
          <p className={styles.currentPath}>
            Path: <span>{selectedPath}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
