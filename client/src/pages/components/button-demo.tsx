import React, { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button as UIButton } from '@/components/ui/button';
import { useTheme } from '@/lib/ui-library/theme';
import Button from '@/lib/ui-library/Button';

export default function ButtonDemo() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [buttonIntent, setButtonIntent] = useState<'primary' | 'secondary' | 'danger'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
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
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link href="/">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                <i className="fas fa-home text-sm"></i>
                Back to Dashboard
              </div>
            </Link>
          </div>

          {/* Component Categories */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Components
            </h3>
            <div className="space-y-1">
              <Link href="/components/button">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground font-medium transition-colors cursor-pointer ml-3">
                  <i className="fas fa-mouse-pointer text-sm"></i>
                  Button
                </div>
              </Link>
              <Link href="/components/tag-selector">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer ml-3">
                  <i className="fas fa-tags text-sm"></i>
                  TagSelector
                </div>
              </Link>
            </div>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Button Component</h2>
              <p className="text-sm text-muted-foreground">Interactive demonstration and controls</p>
            </div>
            <div className="flex items-center gap-3">
              <UIButton variant="secondary" data-testid="button-docs">
                <i className="fas fa-book mr-2"></i>
                Documentation
              </UIButton>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Component Demo */}
            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Live Demo</h3>
                  <p className="text-sm text-muted-foreground">Interactive Button component with customizable properties</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                    <Button
                      intent={buttonIntent}
                      size={buttonSize}
                      disabled={isDisabled}
                      onClick={handleButtonClick}
                      data-testid="demo-button"
                    >
                      {isDisabled ? 'Disabled Button' : 'Click Me!'}
                    </Button>
                  </div>
                  {clickCount > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground" data-testid="click-counter">
                        Button clicked {clickCount} times
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Controls Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property Controls */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Properties</h3>
                    <p className="text-sm text-muted-foreground">Customize the button appearance and behavior</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Intent Control */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Intent</label>
                      <select
                        value={buttonIntent}
                        onChange={(e) => setButtonIntent(e.target.value as typeof buttonIntent)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                        data-testid="intent-select"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="danger">Danger</option>
                      </select>
                    </div>

                    {/* Size Control */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
                      <select
                        value={buttonSize}
                        onChange={(e) => setButtonSize(e.target.value as typeof buttonSize)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                        data-testid="size-select"
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>

                    {/* Disabled Control */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isDisabled}
                          onChange={(e) => setIsDisabled(e.target.checked)}
                          className="rounded border-border"
                          data-testid="disabled-checkbox"
                        />
                        <span className="text-sm font-medium text-foreground">Disabled</span>
                      </label>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-4">
                      <UIButton
                        variant="outline"
                        onClick={() => {
                          setButtonIntent('primary');
                          setButtonSize('md');
                          setIsDisabled(false);
                          setClickCount(0);
                        }}
                        className="w-full"
                        data-testid="reset-button"
                      >
                        Reset to Defaults
                      </UIButton>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Example */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold text-foreground">Code Example</h3>
                    <p className="text-sm text-muted-foreground">Current configuration in React JSX</p>
                  </div>
                  <div className="p-6">
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      <code className="text-muted-foreground whitespace-pre-wrap">
{`<Button
  intent="${buttonIntent}"
  size="${buttonSize}"${isDisabled ? '\n  disabled={true}' : ''}
  onClick={handleClick}
>
  ${isDisabled ? 'Disabled Button' : 'Click Me!'}
</Button>`}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Component Information */}
            <Card>
              <CardContent className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Component Information</h3>
                  <p className="text-sm text-muted-foreground">Technical details and features</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Properties</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• intent: primary | secondary | danger</li>
                        <li>• size: sm | md | lg</li>
                        <li>• disabled: boolean</li>
                        <li>• onClick: () =&gt; void</li>
                        <li>• children: ReactNode</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Features</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Theme-aware styling</li>
                        <li>• Responsive design</li>
                        <li>• Accessibility support</li>
                        <li>• Multiple variants</li>
                        <li>• TypeScript support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Styling</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• CSS Modules</li>
                        <li>• Dark/Light themes</li>
                        <li>• Hover effects</li>
                        <li>• Focus states</li>
                        <li>• Disabled styles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}