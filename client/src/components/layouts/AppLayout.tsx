import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/ui-library/theme';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [location] = useLocation();

  const sidebarItems = [
    { 
      id: 'overview', 
      icon: 'fa-home', 
      label: 'Overview', 
      href: '/' 
    },
    { 
      id: 'components', 
      icon: 'fa-cube', 
      label: 'Components', 
      children: [
        { id: 'button', icon: 'fa-mouse-pointer', label: 'Button', href: '/components/button' },
        { id: 'tagselector', icon: 'fa-tags', label: 'TagSelector', href: '/components/tag-selector' },
        { id: 'textfield', icon: 'fa-edit', label: 'TextField', href: '/components/textfield', disabled: true },
        { id: 'card', icon: 'fa-square', label: 'Card', href: '/components/card', disabled: true },
        { id: 'modal', icon: 'fa-window-maximize', label: 'Modal', href: '/components/modal', disabled: true }
      ]
    },
    { 
      id: 'documentation', 
      icon: 'fa-book', 
      label: 'Documentation', 
      href: '/docs' 
    },
    { 
      id: 'storybook', 
      icon: 'fa-book-open', 
      label: 'Storybook', 
      href: '/storybook' 
    },
    { 
      id: 'configuration', 
      icon: 'fa-cog', 
      label: 'Configuration', 
      href: '/config' 
    }
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>(['components']);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => location === href;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-cubes text-primary-foreground text-sm"></i>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">UI Library</h1>
              <p className="text-xs text-muted-foreground">v1.2.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                      data-testid={`nav-${item.id}`}
                    >
                      <i className={`fas ${item.icon} text-sm`}></i>
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid={`nav-${item.id}`}
                  >
                    <i className={`fas ${item.icon} text-sm`}></i>
                    <span className="flex-1 text-left">{item.label}</span>
                    <i className={`fas ${expandedItems.includes(item.id) ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs`}></i>
                  </button>
                )}

                {/* Submenu */}
                {item.children && expandedItems.includes(item.id) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.id} href={child.href}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                            child.disabled
                              ? 'text-muted-foreground/50 cursor-not-allowed'
                              : isActive(child.href)
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                          data-testid={`nav-${child.id}`}
                        >
                          <i className={`fas ${child.icon} text-sm`}></i>
                          {child.label}
                          {child.disabled && (
                            <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Theme & Language Controls */}
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              data-testid="theme-toggle"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground border-0 text-sm"
              data-testid="language-select"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Global Header Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">UI Library</h2>
              <p className="text-sm text-muted-foreground">React + TypeScript modular component system</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" data-testid="export-button">
                <i className="fas fa-download mr-2"></i>
                Export Library
              </Button>
              <Button variant="secondary" data-testid="build-button">
                <i className="fas fa-play mr-2"></i>
                Build
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}