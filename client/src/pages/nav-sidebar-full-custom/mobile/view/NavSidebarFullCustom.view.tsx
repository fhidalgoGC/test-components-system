import { useState } from 'react';
import { Home, Package, Settings, Zap, User, Crown, Menu, X } from 'lucide-react';
import styles from '../css/NavSidebarFullCustom.module.css';

const menuItems = [
  { id: 'home', label: 'Dashboard', path: '/home', icon: Home },
  { id: 'products', label: 'Products', path: '/products', icon: Package },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export const NavSidebarFullCustomMobileView = () => {
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
        <div className={styles.headerBrand}>
          <div className={styles.headerIcon}>
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className={styles.headerTitle}>SuperApp</span>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            <div className={styles.navHeader}>
              <div className={styles.headerIcon}>
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className={styles.navHeaderTitle}>SuperApp</p>
                <p className={styles.navHeaderSubtitle}>Enterprise Edition</p>
              </div>
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

            <div className={styles.navFooter}>
              <div className={styles.userCard}>
                <div className={styles.userAvatar}>
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userNameRow}>
                    <span className={styles.userName}>Admin</span>
                    <Crown className={styles.crownIcon} />
                  </div>
                  <p className={styles.userPlan}>Plan Pro</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Full Custom (Mobile)</h2>
          <p className={styles.cardDescription}>
            Vista móvil con header y footer personalizados.
          </p>
          <p className={styles.currentPath}>
            Path: <span>{selectedPath}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
