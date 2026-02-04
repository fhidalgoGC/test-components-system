import { Home, Settings, Users, FileText } from 'lucide-react';
import { useState } from 'react';
import styles from '../css/NavSidebarBasic.module.css';

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'users', label: 'Users', icon: <Users size={20} /> },
  { id: 'docs', label: 'Documents', icon: <FileText size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const NavSidebarBasicMobileView = () => {
  const [selectedId, setSelectedId] = useState('home');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Navigation Sidebar</h1>
      <p className={styles.description}>Mobile view - Basic example</p>

      <div className={styles.menuList}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`${styles.menuItem} ${selectedId === item.id ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.statusCard}>
        <p className={styles.statusLabel}>Selected:</p>
        <p className={styles.statusValue}>{selectedId}</p>
      </div>
    </div>
  );
};
