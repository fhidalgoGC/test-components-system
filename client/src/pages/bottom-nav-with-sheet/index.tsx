import { useState } from 'react';
import { BottomNavigationBar } from '@/lib/ui-library/components/BottomNavigationBar';
import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import type { NavItem } from '@/lib/ui-library/components/BottomNavigationBar/mobile/types';
import type { NavigationItem } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Truck, List, Settings, Menu, Package } from 'lucide-react';

const bottomNavItems: NavItem[] = [
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

const pageContent: Record<string, { title: string; description: string }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Vista general de tu aplicacion. Aqui puedes ver estadisticas y resumen de actividad.',
  },
  trips: {
    title: 'Viajes',
    description: 'Gestiona tus viajes activos, historial y programacion de rutas.',
  },
  catalogs: {
    title: 'Catalogos',
    description: 'Administra tus catalogos de productos, servicios y configuraciones.',
  },
  settings: {
    title: 'Ajustes',
    description: 'Configura las preferencias de tu cuenta y la aplicacion.',
  },
};

export default function BottomNavWithSheetDemo() {
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const current = pageContent[selectedNav] || pageContent.dashboard;

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
        gap: 12,
        height: 56,
        flexShrink: 0,
      }}>
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
      </header>

      <main style={{ flex: 1, overflow: 'auto', padding: 16, paddingBottom: 80 }}>
        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }} data-testid="text-page-title">{current.title}</h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }} data-testid="text-page-description">
            {current.description}
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.8 }}>
            <strong>Toolbar:</strong> El boton de hamburguesa abre el NavigationSidebar como drawer.<br />
            <strong>Sidebar:</strong> Se cierra con swipe hacia la izquierda, tocando el overlay, o con el boton X.<br />
            <strong>BottomNav:</strong> Barra fija abajo para cambiar de seccion.
          </p>
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
        }}
        headerIcon={
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Package size={16} color="white" />
          </div>
        }
        headerContent={
          <div>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Mi App</span>
            <span style={{ fontSize: 11, color: '#9ca3af', display: 'block' }}>v1.0.0</span>
          </div>
        }
        showThemeToggle={true}
        showLanguageSelector={true}
      />

      <BottomNavigationBar
        items={bottomNavItems}
        selectedId={selectedNav}
        onSelect={(item) => setSelectedNav(item.id)}
      />
    </div>
  );
}
