import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function HTMLDoc() {
  const basicStructure = `<!-- Basic Button HTML Output -->
<div id="button-container">
  <button 
    class="root md light primary" 
    aria-hidden="false"
    data-testid="button-primary"
  >
    Click Me
  </button>
</div>`;

  const variants = [
    {
      name: "Size Variants",
      code: `<!-- Small Button -->
<button class="root sm light primary">Small</button>

<!-- Medium Button (default) -->
<button class="root md light primary">Medium</button>

<!-- Large Button -->
<button class="root lg light primary">Large</button>`
    },
    {
      name: "Intent Variants - Light Theme", 
      code: `<!-- Primary Intent -->
<button class="root md light primary">Primary</button>

<!-- Secondary Intent -->
<button class="root md light secondary">Secondary</button>

<!-- Danger Intent -->
<button class="root md light danger">Danger</button>`
    },
    {
      name: "Intent Variants - Dark Theme",
      code: `<!-- Primary Intent -->
<button class="root md dark primary">Primary</button>

<!-- Secondary Intent -->
<button class="root md dark secondary">Secondary</button>

<!-- Danger Intent -->
<button class="root md dark danger">Danger</button>`
    },
    {
      name: "States",
      code: `<!-- Disabled Button -->
<button class="root md light primary" disabled="true">
  Disabled Button
</button>

<!-- Hidden Button (responsive) -->
<button class="root md light primary hidden" aria-hidden="true">
  Hidden Button
</button>`
    },
    {
      name: "With Custom Classes",
      code: `<!-- Button with additional CSS classes -->
<div class="custom-wrapper">
  <button class="root lg light primary custom-button-class">
    Custom Styled
  </button>
</div>`
    }
  ];

  const attributes = [
    { name: "class", type: "string", description: "Space-separated CSS classes: root + size + theme + intent + custom" },
    { name: "disabled", type: "boolean", description: "HTML disabled attribute when button is disabled" },
    { name: "aria-hidden", type: "boolean", description: "Accessibility attribute controlled by visibility config" },
    { name: "data-testid", type: "string", description: "Test identifier in format 'button-{intent}'" },
    { name: "id", type: "string", description: "Container div id when id prop is provided" }
  ];

  const classStructure = `/* CSS Class Structure */
/* The button element gets multiple classes combined: */

.root           /* Base button styles */
.{size}         /* sm | md | lg */
.{theme}        /* light | dark */
.{intent}       /* primary | secondary | danger */
.{custom}       /* Any additional className prop */
.hidden         /* Applied when responsive config hides button */

/* Example combined classes: */
/* class="root md light primary" */
/* class="root lg dark secondary custom-class" */`;
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">HTML Output</h3>
            <p className="text-sm text-muted-foreground">Generated HTML structure from Button component</p>
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

            {/* Class Structure */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">CSS Class Structure</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {classStructure}
                </code>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">HTML Variants</h4>
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