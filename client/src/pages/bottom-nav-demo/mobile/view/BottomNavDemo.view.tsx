import { useState, useCallback } from "react";
import { BottomNavigationBar } from "@/lib/ui-library/components/BottomNavigationBar";
import type {
  NavItem,
  BottomNavigationBarError,
} from "@/lib/ui-library/components/BottomNavigationBar/mobile/types";
import { Home, Search, User, Settings, Bell, AlertCircle } from "lucide-react";
import styles from "../css/BottomNavDemo.module.css";

export const BottomNavDemoMobileView = () => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [controlledId, setControlledId] = useState<string>("home");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: "home",
      label: { en: "Home", es: "Inicio", default: "Home" },
      metadata: { icon: <Home size={24} />, dataTestId: "nav-home" },
    },
    {
      id: "search",
      label: { en: "Search", es: "Buscar", default: "Search" },
      metadata: { icon: <Search size={24} />, dataTestId: "nav-search" },
    },
    {
      id: "notifications",
      label: { en: "Notifications", es: "Notificaciones", default: "Notifications" },
      metadata: { icon: <Bell size={24} />, dataTestId: "nav-notifications" },
    },
    {
      id: "profile",
      label: { en: "Profile", es: "Perfil", default: "Profile" },
      metadata: { icon: <User size={24} />, dataTestId: "nav-profile" },
    },
    {
      id: "settings",
      label: { en: "Settings", es: "Ajustes", default: "Settings" },
      metadata: { icon: <Settings size={24} />, dataTestId: "nav-settings" },
    },
  ];

  const handleSelect = (item: NavItem) => {
    setSelectedItem(item);
    setControlledId(item.id);
  };

  const handleError = useCallback((error: BottomNavigationBarError) => {
    setErrorMessage(`❌ ${error.message}`);
    setTimeout(() => setErrorMessage(null), 3000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>BottomNavigationBar</h1>
        <p className={styles.description}>Mobile navigation demo</p>

        {errorMessage && (
          <div className={styles.errorAlert}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className={styles.statusCard}>
          <p className={styles.statusLabel}>Selected:</p>
          <p className={styles.statusValue}>
            {selectedItem ? selectedItem.label.en : "None"}
          </p>
        </div>

        <div className={styles.buttonGroup}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setControlledId(item.id)}
              className={`${styles.selectButton} ${controlledId === item.id ? styles.active : ''}`}
            >
              {item.label.en}
            </button>
          ))}
        </div>
      </div>

      <BottomNavigationBar
        items={navItems}
        selectedId={controlledId}
        onSelect={handleSelect}
        onError={handleError}
      />
    </div>
  );
};
