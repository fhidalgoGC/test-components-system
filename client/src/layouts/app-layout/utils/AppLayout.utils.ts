import type { MenuItem } from '@/components/sidebar';

export function getDefaultMenuItems(): MenuItem[] {
  return [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: 'Home',
      path: '/' 
    },
    { 
      id: 'components', 
      label: 'Components', 
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
        { id: 'external-app', label: 'External App Demo', path: '/external-app-demo', icon: 'Building2' }
      ]
    },
    { 
      id: 'navigation-sidebar', 
      label: 'NavigationSidebar', 
      icon: 'PanelLeft',
      children: [
        { id: 'nav-basic', label: 'Básico', path: '/components/nav-sidebar/basic', icon: 'Layout' },
        { id: 'nav-custom-header', label: 'Header Custom', path: '/components/nav-sidebar/custom-header', icon: 'Heading' },
        { id: 'nav-custom-footer', label: 'Footer Custom', path: '/components/nav-sidebar/custom-footer', icon: 'User' },
        { id: 'nav-nested', label: 'Items Anidados', path: '/components/nav-sidebar/nested', icon: 'Network' },
        { id: 'nav-scroll', label: 'Scroll', path: '/components/nav-sidebar/scroll', icon: 'ScrollText' },
        { id: 'nav-full-custom', label: 'Full Custom', path: '/components/nav-sidebar/full-custom', icon: 'Palette' }
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
      id: 'utils', 
      label: 'Utilities', 
      icon: 'Layout',
      children: [
        { id: 'date-demo', label: 'Date Demo', path: '/date-demo', icon: 'Calendar' },
        { id: 'auth-test', label: 'Auth Test', path: '/auth-test', icon: 'Shield' }
      ]
    }
  ];
}

export function handleNavigation(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}