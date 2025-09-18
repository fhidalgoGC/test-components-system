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
        { id: 'tagselector', label: 'TagSelector', path: '/components/tag-selector', icon: 'Tags' }
      ]
    }
  ];
}

export function handleNavigation(path: string): void {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}