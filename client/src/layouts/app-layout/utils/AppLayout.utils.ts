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
        { id: 'external-app', label: 'External App Demo', path: '/external-app-demo', icon: 'Building2' }
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