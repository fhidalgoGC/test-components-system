import type { MenuItem } from '@/components/sidebar';

export function getDefaultMenuItems(): MenuItem[] {
  return [
    { 
      id: 'overview', 
      label: 'Overview',
      i18n: { en: 'Overview', es: 'Inicio', default: 'Overview' },
      icon: 'Home',
      path: '/' 
    },
    { 
      id: 'components', 
      label: 'Components',
      i18n: { en: 'Components', es: 'Componentes', default: 'Components' },
      icon: 'Package',
      children: [
        { id: 'tagselector', label: 'TagSelector', path: '/components/tag-selector', icon: 'Tags' },
        { id: 'carousel', label: 'Carousel', path: '/components/carousel', icon: 'Image' },
        { id: 'universal-card', label: 'UniversalCard', path: '/components/universal-card', icon: 'Layout' },
        { id: 'login-card', label: 'LoginCard', path: '/components/login-card', icon: 'Layout' },
        { id: 'wrapper-items-selected', label: 'WrapperItemsSelected', path: '/components/wrapper-items-selected', icon: 'MousePointer' },
        { id: 'layout-row', label: 'LayoutRow', path: '/components/layout-row', icon: 'Rows' },
        { id: 'layout-column', label: 'LayoutColumn', path: '/components/layout-column', icon: 'Columns' },
        { id: 'bottom-nav', label: 'BottomNavigationBar', path: '/components/bottom-nav', icon: 'Navigation' },
        { id: 'bottom-nav-config', label: 'BottomNav + Config', path: '/components/bottom-nav-config', icon: 'Settings' },
        { id: 'google-map', label: 'GoogleMap', i18n: { en: 'GoogleMap', es: 'Mapa Google', default: 'GoogleMap' }, path: '/components/google-map', icon: 'Map' },
        { id: 'base-table', label: 'BaseTable', i18n: { en: 'BaseTable', es: 'Tabla Base', default: 'BaseTable' }, path: '/components/base-table', icon: 'Table' },
        { id: 'paginator', label: 'Paginator', i18n: { en: 'Paginator', es: 'Paginador', default: 'Paginator' }, path: '/components/paginator', icon: 'ChevronLeft' },
        { id: 'accordion', label: 'Accordion', i18n: { en: 'Accordion', es: 'Acordeón', default: 'Accordion' }, path: '/components/accordion', icon: 'ChevronDown' },
        { id: 'external-app', label: 'External App Demo', path: '/external-app-demo', icon: 'Building2' }
      ]
    },
    { 
      id: 'navigation-sidebar', 
      label: 'NavigationSidebar', 
      icon: 'PanelLeft',
      children: [
        { id: 'nav-basic', label: 'Basic', i18n: { en: 'Basic', es: 'Básico', default: 'Basic' }, path: '/components/nav-sidebar/basic', icon: 'Layout', openInNewTab: true },
        { id: 'nav-custom-header', label: 'Header Custom', path: '/components/nav-sidebar/custom-header', icon: 'Heading', openInNewTab: true },
        { id: 'nav-custom-footer', label: 'Footer Custom', path: '/components/nav-sidebar/custom-footer', icon: 'User', openInNewTab: true },
        { id: 'nav-nested', label: 'Nested Items', i18n: { en: 'Nested Items', es: 'Items Anidados', default: 'Nested Items' }, path: '/components/nav-sidebar/nested', icon: 'Network', openInNewTab: true },
        { id: 'nav-scroll', label: 'Scroll', path: '/components/nav-sidebar/scroll', icon: 'ScrollText', openInNewTab: true },
        { id: 'nav-full-custom', label: 'Full Custom', path: '/components/nav-sidebar/full-custom', icon: 'Palette', openInNewTab: true }
      ]
    },
    { 
      id: 'sidebar-layout', 
      label: 'SidebarLayout', 
      icon: 'LayoutDashboard',
      children: [
        { id: 'layout-basic', label: 'Basic', i18n: { en: 'Basic', es: 'Básico', default: 'Basic' }, path: '/layouts/sidebar-layout', icon: 'Layout', openInNewTab: true },
        { id: 'layout-scroll', label: 'With Scroll', i18n: { en: 'With Scroll', es: 'Con Scroll', default: 'With Scroll' }, path: '/layouts/sidebar-layout/scroll', icon: 'ScrollText', openInNewTab: true },
        { id: 'layout-controlled', label: 'Controlled', i18n: { en: 'Controlled', es: 'Controlado', default: 'Controlled' }, path: '/layouts/sidebar-layout/controlled', icon: 'Settings', openInNewTab: true },
        { id: 'layout-with-nav', label: 'With Navigation', i18n: { en: 'With Navigation', es: 'Con Navegación', default: 'With Navigation' }, path: '/layouts/sidebar-layout/with-navigation', icon: 'Navigation', openInNewTab: true }
      ]
    },
    { 
      id: 'heterogeneous-list', 
      label: 'HeterogeneousList', 
      icon: 'Layout',
      children: [
        { id: 'registry-mode', label: 'Registry Mode', path: '/components/heterogeneous-list/registry' },
        { id: 'elements-mode', label: 'Elements Mode', path: '/components/heterogeneous-list/elements' },
        { id: 'async-loading', label: 'Async Loading', path: '/components/heterogeneous-list/async' }
      ]
    },
    { 
      id: 'providers', 
      label: 'Providers',
      i18n: { en: 'Providers', es: 'Providers', default: 'Providers' },
      icon: 'Database',
      children: [
        { id: 'control-data', label: 'ControlData', i18n: { en: 'ControlData', es: 'ControlData', default: 'ControlData' }, path: '/providers/control-data', icon: 'Filter' }
      ]
    },
    { 
      id: 'utils', 
      label: 'Utilities',
      i18n: { en: 'Utilities', es: 'Utilidades', default: 'Utilities' },
      icon: 'Layout',
      children: [
        { id: 'date-demo', label: 'Date Demo', i18n: { en: 'Date Demo', es: 'Demo de Fechas', default: 'Date Demo' }, path: '/date-demo', icon: 'Calendar' },
        { id: 'auth-test', label: 'Auth Test', i18n: { en: 'Auth Test', es: 'Prueba de Auth', default: 'Auth Test' }, path: '/auth-test', icon: 'Shield' }
      ]
    }
  ];
}

export function handleNavigation(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}