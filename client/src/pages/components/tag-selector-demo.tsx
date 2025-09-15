import React, { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button as UIButton } from '@/components/ui/button';
import { useTheme } from '@/lib/ui-library/theme';
import TagSelector from '@/lib/ui-library/TagSelector';

export default function TagSelectorDemo() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTags, setSelectedTags] = useState<string[]>(['maiz-blanco', 'yellow-corn']);
  const [tagSize, setTagSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [allowAll, setAllowAll] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const sampleTags = [
    { id: 'maiz-blanco', label: 'Maíz Blanco' },
    { id: 'wheat-hard-winter', label: 'HRW - Wheat Hard Red Winter' },
    { id: 'wheat-soft-winter', label: 'SRW - Wheat Soft Red Winter' },
    { id: 'wheat-hard-spring', label: 'HRS - Wheat Hard Red Spring' },
    { id: 'yellow-corn', label: 'YC - Yellow Corn' },
    { id: 'grain-sorghum', label: 'YGS - Yellow Grain Sorghum' },
    { id: 'whole-oats', label: 'OATS - Whole Oats' },
    { id: 'cacao-blanco', label: 'cacao blanco' },
    { id: 'frijol-amarillo', label: 'Frijol amarillo 1' },
    { id: 'soya-2025', label: 'Soya 2025' },
    { id: 'semillas-girasol', label: 'Semillas de girasol - SW' },
    { id: 'test-component', label: 'TestTestTest' },
    { id: 'maiz-amarillo', label: 'Maíz Amarillo' }
  ];

  const handleSelectionChange = (newSelectedTags: string[]) => {
    setSelectedTags(newSelectedTags);
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
                <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer ml-3">
                  <i className="fas fa-mouse-pointer text-sm"></i>
                  Button
                </div>
              </Link>
              <Link href="/components/tag-selector">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground font-medium transition-colors cursor-pointer ml-3">
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
              <h2 className="text-xl font-semibold text-foreground">TagSelector Component</h2>
              <p className="text-sm text-muted-foreground">Interactive tag selection with multiple options</p>
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
                  <p className="text-sm text-muted-foreground">Interactive TagSelector component with customizable properties</p>
                </div>
                <div className="p-6">
                  <div className="min-h-32 bg-muted/50 rounded-lg border-2 border-dashed border-border p-6">
                    <TagSelector
                      tags={sampleTags}
                      selectedTags={selectedTags}
                      onSelectionChange={handleSelectionChange}
                      allowMultiple={allowMultiple}
                      allowAll={allowAll}
                      size={tagSize}
                      disabled={isDisabled}
                      langOverride={selectedLanguage}
                      data-testid="demo-tag-selector"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Selected tags:</p>
                    <div className="bg-muted rounded-lg p-3" data-testid="selected-tags-display">
                      {selectedTags.length > 0 ? (
                        <code className="text-sm">
                          [{selectedTags.map(tag => `"${tag}"`).join(', ')}]
                        </code>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">No tags selected</span>
                      )}
                    </div>
                  </div>
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
                    <p className="text-sm text-muted-foreground">Customize the TagSelector appearance and behavior</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Size Control */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
                      <select
                        value={tagSize}
                        onChange={(e) => setTagSize(e.target.value as typeof tagSize)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                        data-testid="size-select"
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>

                    {/* Allow Multiple Control */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowMultiple}
                          onChange={(e) => setAllowMultiple(e.target.checked)}
                          className="rounded border-border"
                          data-testid="allow-multiple-checkbox"
                        />
                        <span className="text-sm font-medium text-foreground">Allow Multiple Selection</span>
                      </label>
                    </div>

                    {/* Allow All Control */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowAll}
                          onChange={(e) => setAllowAll(e.target.checked)}
                          className="rounded border-border"
                          data-testid="allow-all-checkbox"
                        />
                        <span className="text-sm font-medium text-foreground">Show "All" Option</span>
                      </label>
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

                    {/* Clear Selection Button */}
                    <div className="pt-4 space-y-2">
                      <UIButton
                        variant="outline"
                        onClick={() => setSelectedTags([])}
                        className="w-full"
                        data-testid="clear-button"
                      >
                        Clear Selection
                      </UIButton>
                      <UIButton
                        variant="outline"
                        onClick={() => {
                          setTagSize('md');
                          setAllowMultiple(true);
                          setAllowAll(true);
                          setIsDisabled(false);
                          setSelectedTags(['maiz-blanco', 'yellow-corn']);
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
{`<TagSelector
  tags={sampleTags}
  selectedTags={selectedTags}
  onSelectionChange={handleSelectionChange}
  size="${tagSize}"${allowMultiple ? '\n  allowMultiple={true}' : '\n  allowMultiple={false}'}${allowAll ? '\n  allowAll={true}' : '\n  allowAll={false}'}${isDisabled ? '\n  disabled={true}' : ''}
  langOverride="${selectedLanguage}"
/>`}
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
                        <li>• tags: Tag[]</li>
                        <li>• selectedTags: string[]</li>
                        <li>• onSelectionChange: function</li>
                        <li>• allowMultiple: boolean</li>
                        <li>• allowAll: boolean</li>
                        <li>• size: sm | md | lg</li>
                        <li>• disabled: boolean</li>
                        <li>• langOverride: string</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Features</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Multi-selection support</li>
                        <li>• Single selection mode</li>
                        <li>• "Select All" option</li>
                        <li>• Internationalization</li>
                        <li>• Theme-aware styling</li>
                        <li>• Responsive design</li>
                        <li>• TypeScript support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Use Cases</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Filter systems</li>
                        <li>• Category selection</li>
                        <li>• Multi-choice forms</li>
                        <li>• Product categorization</li>
                        <li>• Tag management</li>
                        <li>• Content classification</li>
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