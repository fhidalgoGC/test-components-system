import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import type { FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu/shared/types';
import type { NavigationItem } from '@/lib/ui-library/components/NavigationSidebar';
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

const sidebarItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
  { id: 'trips', label: 'Viajes', path: '/trips', icon: <Truck size={20} /> },
  { id: 'catalogs', label: 'Catálogos', path: '/catalogs', icon: <List size={20} /> },
  { id: 'settings', label: 'Ajustes', path: '/settings', icon: <Settings size={20} /> },
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setIsSidebarOpen(true)}
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
            data-testid="btn-open-sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }} data-testid="text-app-title">Mi App</h1>
        </div>
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
          <User size={24} />
        </button>
      </header>

      <main style={{ flex: 1, overflow: 'auto', padding: 16, paddingBottom: 80 }}>
        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }} data-testid="text-demo-title">Demo: BottomNav + Sidebar + BottomSheet</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            Esta demo muestra los 3 componentes mobile funcionando juntos:
          </p>
          <ul style={{ fontSize: 14, color: '#6b7280', lineHeight: 2, marginTop: 8, paddingLeft: 20 }}>
            <li><strong>NavigationSidebar</strong> (drawer desde la izquierda) - toca el icono de hamburguesa</li>
            <li><strong>FloatingMenu</strong> (BottomSheet desde abajo) - toca el icono de usuario</li>
            <li><strong>BottomNavigationBar</strong> (barra fija abajo) - siempre visible</li>
          </ul>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginTop: 8 }}>
            Todos usan <code>createPortal</code> a <code>document.body</code> con
            <code> z-index: 9999</code>, asi que siempre aparecen por encima de la barra inferior.
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: 14, color: '#374151' }} data-testid="text-active-tab">
            Pestana activa: <strong>{selectedNav}</strong>
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#111827',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
              data-testid="btn-open-sidebar-body"
            >
              Abrir sidebar
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              style={{
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
              Abrir menu
            </button>
          </div>
        </div>
      </main>

      <NavigationSidebar
        items={sidebarItems}
        currentPath={`/${selectedNav}`}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(path) => {
          const id = path.replace('/', '');
          setSelectedNav(id);
          setIsSidebarOpen(false);
        }}
        headerContent={
          <span style={{ fontWeight: 600, fontSize: 16 }}>Mi App</span>
        }
        showThemeToggle={false}
        showLanguageSelector={false}
      />

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
