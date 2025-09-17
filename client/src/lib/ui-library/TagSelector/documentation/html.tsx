import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HTMLDocProps {
  componentName?: string;
  basicStructure?: string;
  variants?: { name: string; code: string }[];
  attributes?: { name: string; description: string; type: string }[];
}

export default function HTMLDoc({ 
  componentName = "TagSelector",
  basicStructure = `<!-- Tag Selector Container -->
<div class="tag-selector" data-testid="demo-tag-selector">
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
    data-tag-id="react"
    data-testid="tag-react"
  >
    React
  </button>
  
  <button 
    class="tag tag-primary" 
    data-tag-id="typescript"
    data-testid="tag-typescript"
  >
    TypeScript
  </button>
</div>`,
  variants = [
    {
      name: "Size Variants",
      code: `<div class="tag-selector tag-selector-sm">
  <button class="tag">Small Tag</button>
</div>
<div class="tag-selector tag-selector-md">
  <button class="tag">Medium Tag</button>
</div>  
<div class="tag-selector tag-selector-lg">
  <button class="tag">Large Tag</button>
</div>`
    },
    {
      name: "States", 
      code: `<!-- Selected State -->
<button class="tag tag-selected">Selected Tag</button>

<!-- Disabled State -->
<div class="tag-selector tag-selector-disabled">
  <button class="tag tag-disabled" disabled>
    Disabled Tag
  </button>
</div>

<!-- All Tag Special -->
<button class="tag tag-all tag-selected">All</button>`
    },
    {
      name: "Multiple Selection",
      code: `<div class="tag-selector">
  <button class="tag tag-selected" data-tag-id="react">React</button>
  <button class="tag tag-selected" data-tag-id="vue">Vue</button>
  <button class="tag" data-tag-id="angular">Angular</button>
  <button class="tag" data-tag-id="svelte">Svelte</button>
</div>`
    }
  ],
  attributes = [
    { name: "class", type: "string", description: "CSS classes for styling variants" },
    { name: "data-testid", type: "string", description: "Test identifier for automation" },
    { name: "data-tag-id", type: "string", description: "Unique identifier for each tag" },
    { name: "disabled", type: "boolean", description: "Disables tag interaction" }
  ]
}: HTMLDocProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">HTML Output</h3>
            <p className="text-sm text-muted-foreground">Generated HTML structure and markup</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Basic Structure */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Basic Structure</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {basicStructure}
                </code>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Variants</h4>
              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={index}>
                    <h5 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {variant.name}
                    </h5>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {variant.code}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">HTML Attributes</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Attribute
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributes.map((attr, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-sm text-foreground">{attr.name}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{attr.type}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{attr.description}</td>
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