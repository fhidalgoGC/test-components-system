import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import { ConfigProvider } from '@/lib/ui-library/providers';
import { Home, Search, Bell, User, Settings } from 'lucide-react';
import styles from '../css/BottomNavConfigDemo.module.css';

export const BottomNavConfigDemoMobileView = () => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);

  const navItems: NavItem[] = [
    { id: 'home', label: { en: 'Home', es: 'Inicio', default: 'Home' }, metadata: { icon: <Home size={24} /> } },
    { id: 'search', label: { en: 'Search', es: 'Buscar', default: 'Search' }, metadata: { icon: <Search size={24} /> } },
    { id: 'notifications', label: { en: 'Alerts', es: 'Alertas', default: 'Alerts' }, metadata: { icon: <Bell size={24} /> } },
    { id: 'profile', label: { en: 'Profile', es: 'Perfil', default: 'Profile' }, metadata: { icon: <User size={24} /> } },
    { id: 'settings', label: { en: 'Settings', es: 'Ajustes', default: 'Settings' }, metadata: { icon: <Settings size={24} /> } },
  ];

  const handleSelect = (item: NavItem) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>ConfigProvider Demo</h1>
        <p className={styles.description}>Mobile view with ConfigProvider integration</p>

        <div className={styles.statusCard}>
          <p className={styles.statusLabel}>Selected:</p>
          <p className={styles.statusValue}>
            {selectedItem ? selectedItem.label.en : "None"}
          </p>
        </div>
      </div>

      <ConfigProvider
        parentConfig={{
          BOTTOM_NAV_CONFIG: {
            TRIGGER_ON_MOUNT: true,
          },
        }}
        priority="parent"
      >
        <BottomNavigationBar
          items={navItems}
          defaultSelectedId="home"
          onSelect={handleSelect}
        />
      </ConfigProvider>
    </div>
  );
};
