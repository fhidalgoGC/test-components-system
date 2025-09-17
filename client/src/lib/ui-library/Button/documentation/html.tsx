import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HTMLDocProps {
  componentName?: string;
  basicStructure?: string;
  variants?: { name: string; code: string }[];
  attributes?: { name: string; description: string; type: string }[];
}

export default function HTMLDoc({ 
  componentName = "Button",
  basicStructure = `<!-- Basic Button -->
<button 
  class="btn btn-primary btn-md" 
  type="button"
  data-testid="demo-button"
>
  Click Me!
</button>`,
  variants = [
    {
      name: "Size Variants",
      code: `<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>`
    },
    {
      name: "Intent Variants", 
      code: `<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-danger">Danger</button>`
    },
    {
      name: "States",
      code: `<button class="btn btn-primary" disabled="true">
  Disabled Button
</button>

<button class="btn btn-primary btn-loading" disabled="true">
  <span class="btn-spinner"></span>
  Loading...
</button>`
    }
  ],
  attributes = [
    { name: "class", type: "string", description: "CSS classes for styling variants" },
    { name: "type", type: "string", description: "Button type (button, submit, reset)" },
    { name: "disabled", type: "boolean", description: "Disables the button interaction" },
    { name: "data-testid", type: "string", description: "Test identifier for automation" }
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