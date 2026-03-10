import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu/shared/types';
import { Home, Truck, List, Settings, User, LogOut, HelpCircle, Menu } from 'lucide-react';

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: { en: 'Dashboard', es: 'Dashboard', default: 'Dashboard' },
    metadata: { icon: <Home size={22} />, dataTestId: 'nav-dashboard' },
  },
  {
    id: 'trips',
    label: { en: 'Trips', es: 'Viajes', default: 'Trips' },
    metadata: { icon: <Truck size={22} />, dataTestId: 'nav-trips' },
  },
  {
    id: 'catalogs',
    label: { en: 'Catalogs', es: 'Catálogos', default: 'Catalogs' },
    metadata: { icon: <List size={22} />, dataTestId: 'nav-catalogs' },
  },
  {
    id: 'settings',
    label: { en: 'Settings', es: 'Ajustes', default: 'Settings' },
    metadata: { icon: <Settings size={22} />, dataTestId: 'nav-settings' },
  },
];

const menuItems: FloatingMenuItem<unknown>[] = [
  {
    id: 'profile',
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
        <User size={20} />
        <span style={{ fontSize: 16 }}>Mi perfil</span>
      </div>
    ),
  },
  {
    id: 'help',
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
        <HelpCircle size={20} />
        <span style={{ fontSize: 16 }}>Ayuda</span>
      </div>
    ),
  },
  {
    id: 'logout',
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0', color: '#ef4444' }}>
        <LogOut size={20} />
        <span style={{ fontSize: 16 }}>Cerrar sesión</span>
      </div>
    ),
  },
];

export default function BottomNavWithSheetDemo() {
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Mi App</h1>
        <button
          onClick={() => setIsMenuOpen(true)}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: 8,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data-testid="btn-open-menu"
        >
          <Menu size={24} />
        </button>
      </header>

      <main style={{ flex: 1, overflow: 'auto', padding: 16, paddingBottom: 80 }}>
        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Demo: BottomNav + BottomSheet</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            Esta página tiene un <strong>BottomNavigationBar</strong> fijo abajo y un botón en el header 
            que abre un <strong>FloatingMenu</strong> como BottomSheet.
          </p>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginTop: 8 }}>
            El BottomSheet usa <code>createPortal</code> a <code>document.body</code> con 
            <code> z-index: 9999</code>, así que siempre aparece por encima del navbar y del BottomNavigationBar.
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: 14, color: '#374151' }}>
            Pestaña activa: <strong>{selectedNav}</strong>
          </p>
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              marginTop: 12,
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
            data-testid="btn-open-menu-body"
          >
            Abrir menú (BottomSheet)
          </button>
        </div>
      </main>

      <FloatingMenu
        items={menuItems}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onItemClick={(item) => {
          console.log('Item clicked:', item.id);
          setIsMenuOpen(false);
        }}
      />

      <BottomNavigationBar
        items={navItems}
        selectedId={selectedNav}
        onSelect={(item) => setSelectedNav(item.id)}
      />
    </div>
  );
}
