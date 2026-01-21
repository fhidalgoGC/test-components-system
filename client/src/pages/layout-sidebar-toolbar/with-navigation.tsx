import { SidebarLayout, useSidebarLayout } from '@/lib/ui-library/layouts/SidebarLayout';
import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { LayoutRow } from '@/lib/ui-library/components/LayoutRow';
import { Home, Settings, Package, Users, FileText, Bell, ChevronRight } from 'lucide-react';
import { AppLanguageProvider, useAppLanguage, LibI18nProvider } from '@/lib/ui-library/providers';
import type { NavigationItem } from '@/lib/ui-library/components/NavigationSidebar';

const menuItems: NavigationItem[] = [
  { 
    id: 'home', 
    label: 'Dashboard',
    i18n: { en: 'Dashboard', es: 'Panel', default: 'Dashboard' },
    path: '/dashboard',
    icon: <Home className="h-5 w-5" />
  },
  { 
    id: 'trips', 
    label: 'Trips',
    i18n: { en: 'Trips', es: 'Viajes', default: 'Trips' },
    path: '/trips',
    icon: <Package className="h-5 w-5" />
  },
  { 
    id: 'users', 
    label: 'Users',
    i18n: { en: 'Users', es: 'Usuarios', default: 'Users' },
    path: '/users',
    icon: <Users className="h-5 w-5" />
  },
  { 
    id: 'reports', 
    label: 'Reports',
    i18n: { en: 'Reports', es: 'Reportes', default: 'Reports' },
    path: '/reports',
    icon: <FileText className="h-5 w-5" />
  },
  { 
    id: 'settings', 
    label: 'Settings',
    i18n: { en: 'Settings', es: 'Configuración', default: 'Settings' },
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  },
];

function SidebarContent() {
  const { collapsed, toggleCollapse, sidebarWidth } = useSidebarLayout();
  const appLang = useAppLanguage();
  
  return (
    <LibI18nProvider parentLanguageProvider={appLang}>
      <NavigationSidebar
        items={menuItems}
        currentPath="/trips"
        defaultCollapsed={collapsed}
        collapsedWidth={typeof sidebarWidth === 'number' ? sidebarWidth : 80}
        expandedWidth={typeof sidebarWidth === 'number' ? sidebarWidth : 280}
        onCollapseChange={toggleCollapse}
        headerIcon={
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
        }
        headerContent={
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Admin Portal</span>
            <span className="text-xs text-gray-500">v1.0.0</span>
          </div>
        }
        showThemeToggle={true}
        showLanguageSelector={true}
        availableLanguages={['en', 'es']}
      />
    </LibI18nProvider>
  );
}

function ToolbarContent() {
  return (
    <LayoutRow
      slots={2}
      widthMode="full"
      heightMode="fixed"
      height={56}
      paddingX="md"
      paddingY="sm"
      componentVerticalAlign="center"
      slotGap="md"
      className="bg-white border-b border-gray-200"
      components={[
        {
          component: (
            <div className="flex items-center gap-2 text-gray-600">
              <Home className="h-4 w-4" />
              <ChevronRight className="h-3 w-3" />
              <span className="text-sm font-medium">Trips</span>
            </div>
          ),
          align: 'left',
          slot: 0
        },
        {
          component: (
            <div className="relative flex items-center justify-center h-8">
              <Bell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          ),
          align: 'right',
          slot: 1
        },
        {
          component: (
            <div className="flex items-center justify-center h-8">
              <Settings className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            </div>
          ),
          align: 'right',
          slot: 1
        },
        {
          component: (
            <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 border-red-500">
              <span className="text-lg leading-none">🇲🇽</span>
            </div>
          ),
          align: 'right',
          slot: 1
        },
        {
          component: (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JR
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Jane Roberts</span>
                <span className="text-xs text-gray-500">Admin Company</span>
              </div>
            </div>
          ),
          align: 'right',
          slot: 1
        },
      ]}
    />
  );
}

function MainContent() {
  return (
    <div style={{ padding: 24, background: '#f8fafc', minHeight: '100%' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1e293b' }}>
        Trips Management
      </h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>
        Manage all your trips from this dashboard. This example shows SidebarLayout with NavigationSidebar and LayoutRow toolbar.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            style={{ 
              background: 'white', 
              borderRadius: 8, 
              padding: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Trip #{i}</h3>
            <p style={{ fontSize: 14, color: '#64748b' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayoutWithNavigation() {
  return (
    <SidebarLayout
      sidebarExpandedWidth={280}
      sidebarCollapsedWidth={80}
      toolbarHeight={56}
      sidebarContent={<SidebarContent />}
      toolbarContent={<ToolbarContent />}
    >
      <MainContent />
    </SidebarLayout>
  );
}

export default function WithNavigationPage() {
  return (
    <AppLanguageProvider initial="en">
      <LayoutWithNavigation />
    </AppLanguageProvider>
  );
}
