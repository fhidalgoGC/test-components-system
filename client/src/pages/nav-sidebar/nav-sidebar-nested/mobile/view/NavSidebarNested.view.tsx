import { useState } from 'react';
import { Home, Package, Settings, Layout, MousePointer, Tag, Calendar, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import styles from '../css/NavSidebarNested.module.css';

const menuItems = [
  { id: 'home', label: 'Home', path: '/home', icon: Home },
  {
    id: 'components',
    label: 'Components',
    icon: Package,
    children: [
      { id: 'button', label: 'Button', path: '/components/button', icon: MousePointer },
      { id: 'card', label: 'Card', path: '/components/card', icon: Layout },
      { id: 'carousel', label: 'Carousel', path: '/components/carousel' },
      { id: 'tag', label: 'TagSelector', path: '/components/tag', icon: Tag },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    icon: Settings,
    children: [
      { id: 'calendar', label: 'Calendar', path: '/utilities/calendar', icon: Calendar },
      { id: 'settings', label: 'Settings', path: '/utilities/settings' },
    ],
  },
];

export const NavSidebarNestedMobileView = () => {
  const [selectedPath, setSelectedPath] = useState('/home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <h1 className={styles.title}>Nested Demo</h1>
      </header>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = 'children' in item && item.children;
              const isExpanded = expandedItems.includes(item.id);

              return (
                <div key={item.id}>
                  <button
                    className={`${styles.navItem} ${!hasChildren && selectedPath === item.path ? styles.navItemActive : ''}`}
                    onClick={() => hasChildren ? toggleExpand(item.id) : handleNavigate(item.path!)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className={styles.navItemLabel}>{item.label}</span>
                    {hasChildren && (
                      isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {hasChildren && isExpanded && (
                    <div className={styles.childrenContainer}>
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.id}
                            className={`${styles.childItem} ${selectedPath === child.path ? styles.navItemActive : ''}`}
                            onClick={() => handleNavigate(child.path)}
                          >
                            {ChildIcon && <ChildIcon className="h-4 w-4" />}
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Nested Menu (Mobile)</h2>
          <p className={styles.cardDescription}>
            Vista móvil con menú anidado expandible.
          </p>
          <p className={styles.currentPath}>
            Path: <span>{selectedPath}</span>
          </p>
        </div>
      </main>
    </div>
  );
};
