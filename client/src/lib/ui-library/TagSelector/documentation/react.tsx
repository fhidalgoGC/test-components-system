import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactDoc() {
  const importStatement = `import TagSelector from '@/lib/ui-library/TagSelector';
import type { Tag } from '@/lib/ui-library/TagSelector/types';`;
  
  const basicExample = `export function BasicTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const tags: Tag[] = [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' }
  ];

  return (
    <TagSelector
      tags={tags}
      selectedTags={selectedTags}
      onSelectionChange={setSelectedTags}
      allowMultiple={true}
      allowAll={true}
    />
  );
}`;

  const advancedExample = `export function AdvancedTagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['frontend']);
  const [searchTerm, setSearchTerm] = useState('');
  
  const allTags: Tag[] = [
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'database', label: 'Database Design' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'mobile', label: 'Mobile Development' }
  ];
  
  const filteredTags = allTags.filter(tag =>
    tag.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border rounded"
      />
      <TagSelector
        tags={filteredTags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allowMultiple={true}
        allowAll={false}
        size="lg"
        disabled={filteredTags.length === 0}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        Selected: {selectedTags.join(', ') || 'None'}
      </div>
    </div>
  );
}`;

  const propsInterface = `interface TagSelectorProps {
  // Core Props
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // TagSelector Specific
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (selectedTags: string[]) => void;
  allowMultiple?: boolean; // Default: true
  allowAll?: boolean; // Default: true
  size?: 'sm' | 'md' | 'lg'; // Default: 'md'
  disabled?: boolean; // Default: false
  
  // Internationalization
  langOverride?: string; // Override language
  i18nOrder?: 'global-first' | 'local-first';
  
  // Responsive Visibility
  config?: VisibilityConfig; // Controls responsive behavior
}

interface Tag {
  id: string;
  label: string;
}`;

  const singleSelectionExample = `// Single selection mode (radio-like behavior)
export function SingleSelectionTags() {
  const [selectedTag, setSelectedTag] = useState<string[]>(['medium']);
  
  const priorities: Tag[] = [
    { id: 'low', label: 'Low Priority' },
    { id: 'medium', label: 'Medium Priority' },
    { id: 'high', label: 'High Priority' },
    { id: 'urgent', label: 'Urgent' }
  ];

  return (
    <TagSelector
      tags={priorities}
      selectedTags={selectedTag}
      onSelectionChange={setSelectedTag}
      allowMultiple={false} // Only one can be selected
      allowAll={false} // No "All" button
      size="sm"
    />
  );
}`;

  const responsiveExample = `// Responsive visibility example
const responsiveConfig = {
  mobile: { portrait: true, landscape: false },
  tablet: { portrait: true, landscape: true },
  desktop: true
};

<TagSelector
  tags={tags}
  selectedTags={selectedTags}
  onSelectionChange={setSelectedTags}
  config={responsiveConfig}
  size="md"
/>`;

  const propExplanations = [
    { prop: 'tags', type: 'Tag[]', default: 'required', description: 'Array of tag objects with id and label' },
    { prop: 'selectedTags', type: 'string[]', default: 'required', description: 'Array of currently selected tag IDs' },
    { prop: 'onSelectionChange', type: '(tags: string[]) => void', default: 'required', description: 'Callback when selection changes' },
    { prop: 'allowMultiple', type: 'boolean', default: 'true', description: 'Allow multiple tag selection' },
    { prop: 'allowAll', type: 'boolean', default: 'true', description: 'Show "All" button to select/deselect all tags' },
    { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant affecting padding and font size' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable all tag interactions' },
    { prop: 'langOverride', type: 'string', default: 'undefined', description: 'Override language for i18n translations' },
    { prop: 'i18nOrder', type: "'global-first' | 'local-first'", default: 'undefined', description: 'Order of i18n resolution priority' },
    { prop: 'config', type: 'VisibilityConfig', default: 'undefined', description: 'Responsive visibility configuration' }
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">React Implementation</h3>
            <p className="text-sm text-muted-foreground">Complete TagSelector component documentation and usage patterns</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Import Statement */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
                  {importStatement}
                </code>
              </div>
            </div>

            {/* Basic Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Multi-Selection</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {basicExample}
                </code>
              </div>
            </div>

            {/* Advanced Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage with Filtering</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {advancedExample}
                </code>
              </div>
            </div>

            {/* Single Selection */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Single Selection Mode</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {singleSelectionExample}
                </code>
              </div>
            </div>

            {/* Responsive Visibility */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Responsive Visibility</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {responsiveExample}
                </code>
              </div>
            </div>

            {/* Props Interface */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Interface</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {propsInterface}
                </code>
              </div>
            </div>

            {/* Props Documentation */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Props Documentation</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Prop</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Default</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propExplanations.map((prop, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-sm text-foreground">{prop.prop}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{prop.default}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}