import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReactDocProps {
  componentName?: string;
  basicExample?: string;
  advancedExample?: string;
  propsInterface?: string;
  importStatement?: string;
}

export default function ReactDoc({ 
  componentName = "TagSelector",
  basicExample = `export function BasicTagSelector() {
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = [
    { id: 'react', label: 'React' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' }
  ];

  return (
    <TagSelector
      tags={tags}
      selectedTags={selectedTags}
      onSelectionChange={setSelectedTags}
      allowMultiple={true}
    />
  );
}`,
  advancedExample = `export function AdvancedTagSelector() {
  const [selectedTags, setSelectedTags] = useState(['frontend']);
  const [searchTerm, setSearchTerm] = useState('');
  
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
}`,
  propsInterface = `interface TagSelectorProps {
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (tags: string[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  langOverride?: string;
}

interface Tag {
  id: string;
  label: string;
}`,
  importStatement = `import { TagSelector } from '@fremitech/ui';`
}: ReactDocProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">React Implementation</h3>
            <p className="text-sm text-muted-foreground">Complete React component code and usage</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Import Statement */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  {importStatement}
                </code>
              </div>
            </div>

            {/* Basic Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Usage</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {basicExample}
                </code>
              </div>
            </div>

            {/* Advanced Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Advanced Usage</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {advancedExample}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}