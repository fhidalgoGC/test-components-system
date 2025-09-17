import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button as UIButton } from '@/components/ui/button';
import ComponentLayout from '@/components/layouts/ComponentLayout';
import TagSelector from '@/lib/ui-library/TagSelector';

export default function TagSelectorDemo() {
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

  // Tab content components
  const PreviewContent = () => (
    <div className="space-y-8">
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
    </div>
  );

  const ReactContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">React Implementation</h3>
          <p className="text-sm text-muted-foreground">Complete React component code</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`import React from 'react';
import { TagSelector } from '@/lib/ui-library';

// Basic usage
export function BasicTagSelector() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const tags = [
    { id: 'react', label: 'React' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'css', label: 'CSS' }
  ];

  return (
    <TagSelector
      tags={tags}
      selectedTags={selectedTags}
      onSelectionChange={setSelectedTags}
      allowMultiple={true}
    />
  );
}

// Advanced usage with filtering
export function FilterTagSelector() {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const allTags = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'design', label: 'Design' }
  ];
  
  const filteredTags = allTags.filter(tag =>
    tag.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TagSelector
        tags={filteredTags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allowMultiple={true}
        allowAll={true}
        size="md"
      />
    </div>
  );
}`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HTMLContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">HTML Output</h3>
          <p className="text-sm text-muted-foreground">Generated HTML structure</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`<!-- Tag Selector Container -->
<div class="tag-selector">
  <!-- All Tags Option (when allowAll=true) -->
  <button 
    class="tag tag-all tag-selected"
    data-testid="tag-all"
  >
    All
  </button>
  
  <!-- Individual Tags -->
  <button 
    class="tag tag-primary tag-selected" 
    data-tag-id="maiz-blanco"
    data-testid="tag-maiz-blanco"
  >
    Maíz Blanco
  </button>
  
  <button 
    class="tag tag-primary" 
    data-tag-id="wheat-hard-winter"
    data-testid="tag-wheat-hard-winter"
  >
    HRW - Wheat Hard Red Winter
  </button>
  
  <button 
    class="tag tag-primary tag-selected" 
    data-tag-id="yellow-corn"
    data-testid="tag-yellow-corn"
  >
    YC - Yellow Corn
  </button>
  
  <!-- More tags... -->
</div>

<!-- Size Variants -->
<div class="tag-selector tag-selector-sm">Small tags</div>
<div class="tag-selector tag-selector-md">Medium tags</div>  
<div class="tag-selector tag-selector-lg">Large tags</div>

<!-- Disabled State -->
<div class="tag-selector tag-selector-disabled">
  <button class="tag tag-primary tag-disabled" disabled>
    Disabled Tag
  </button>
</div>`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CSSContent = () => (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">CSS Styles</h3>
          <p className="text-sm text-muted-foreground">Component styling and CSS classes</p>
        </div>
        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground whitespace-pre">
{`/* Tag Selector Container */
.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-start;
}

/* Individual Tag Styles */
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tag:hover:not(.tag-disabled) {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  border-color: hsl(var(--accent-foreground) / 0.2);
}

/* Selected State */
.tag-selected {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
}

.tag-selected:hover:not(.tag-disabled) {
  background: hsl(var(--primary) / 0.9);
}

/* Size Variants */
.tag-selector-sm .tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.tag-selector-md .tag {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.tag-selector-lg .tag {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

/* All Tag Special Styling */
.tag-all {
  font-weight: 600;
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.tag-all.tag-selected {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* Disabled State */
.tag-disabled,
.tag-selector-disabled .tag {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Focus States */
.tag:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .tag-selector {
    gap: 0.375rem;
  }
  
  .tag {
    font-size: 0.8125rem;
    padding: 0.3125rem 0.625rem;
  }
}

/* Dark Theme Adjustments */
:root.dark .tag {
  border-color: hsl(var(--border));
}

:root.dark .tag:hover:not(.tag-disabled) {
  background: hsl(var(--accent));
}

:root.dark .tag-selected {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
}`}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const UsageContent = () => (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and import the TagSelector component</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Package Installation</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  npm install @fremitech/ui<br/>
                  # or<br/>
                  yarn add @fremitech/ui
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import Statement</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  import {'{ TagSelector }'} from '@fremitech/ui';
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <li>• <strong>tags:</strong> Tag[]</li>
                  <li>• <strong>selectedTags:</strong> string[]</li>
                  <li>• <strong>onSelectionChange:</strong> function</li>
                  <li>• <strong>allowMultiple:</strong> boolean</li>
                  <li>• <strong>allowAll:</strong> boolean</li>
                  <li>• <strong>size:</strong> sm | md | lg</li>
                  <li>• <strong>disabled:</strong> boolean</li>
                  <li>• <strong>langOverride:</strong> string</li>
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
                  <li>• CSS Modules styling</li>
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
                  <li>• Search filters</li>
                  <li>• User preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Examples</h3>
            <p className="text-sm text-muted-foreground">Common usage patterns</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Filter Interface</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`const [filters, setFilters] = useState([]);
const categories = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'books', label: 'Books' }
];

<TagSelector
  tags={categories}
  selectedTags={filters}
  onSelectionChange={setFilters}
  allowMultiple={true}
  allowAll={true}
  size="md"
/>`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Single Selection Mode</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
{`const [priority, setPriority] = useState(['high']);
const priorities = [
  { id: 'low', label: 'Low Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'high', label: 'High Priority' }
];

<TagSelector
  tags={priorities}
  selectedTags={priority}
  onSelectionChange={setPriority}
  allowMultiple={false}
  allowAll={false}
  size="sm"
/>`}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    {
      id: 'preview',
      label: 'Vista Previa',
      icon: 'fa-eye',
      content: <PreviewContent />
    },
    {
      id: 'react',
      label: 'React',
      icon: 'fa-code',
      content: <ReactContent />
    },
    {
      id: 'html',
      label: 'HTML',
      icon: 'fa-file-code',
      content: <HTMLContent />
    },
    {
      id: 'css',
      label: 'CSS',
      icon: 'fa-palette',
      content: <CSSContent />
    },
    {
      id: 'usage',
      label: 'Uso',
      icon: 'fa-book',
      content: <UsageContent />
    }
  ];

  return (
    <ComponentLayout
      componentName="TagSelector Component"
      componentDescription="Selector de etiquetas interactivo con opciones múltiples"
      tabs={tabs}
      defaultTab="preview"
    />
  );
}