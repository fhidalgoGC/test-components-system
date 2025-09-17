import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function HTMLDoc() {
  const basicStructure = `<!-- TagSelector HTML Output -->
<div id="tag-container">
  <div 
    class="container md light" 
    data-testid="tag-selector-container"
  >
    <!-- All Button (when allowAll=true) -->
    <button
      class="chip md light all selected"
      data-testid="tag-all"
    >
      All
    </button>
    
    <!-- Individual Tag Buttons -->
    <button
      class="chip md light selected"
      data-testid="tag-react"
    >
      React
    </button>
    
    <button
      class="chip md light unselected"
      data-testid="tag-vue"
    >
      Vue
    </button>
  </div>
</div>`;
  const variants = [
    {
      name: "Size Variants",
      code: `<!-- Small Tags -->
<div class="container sm light">
  <button class="chip sm light selected">Small</button>
</div>

<!-- Medium Tags (default) -->
<div class="container md light">
  <button class="chip md light selected">Medium</button>
</div>

<!-- Large Tags -->
<div class="container lg light">
  <button class="chip lg light selected">Large</button>
</div>`
    },
    {
      name: "Theme Variants",
      code: `<!-- Light Theme -->
<div class="container md light">
  <button class="chip md light selected">Selected</button>
  <button class="chip md light unselected">Unselected</button>
</div>

<!-- Dark Theme -->
<div class="container md dark">
  <button class="chip md dark selected">Selected</button>
  <button class="chip md dark unselected">Unselected</button>
</div>`
    },
    {
      name: "Selection States",
      code: `<!-- Selected Tags -->
<button class="chip md light selected">Selected Tag</button>

<!-- Unselected Tags -->
<button class="chip md light unselected">Unselected Tag</button>

<!-- All Button Selected -->
<button class="chip md light all selected">All</button>

<!-- Disabled State -->
<button class="chip md light unselected" disabled>
  Disabled Tag
</button>`
    },
    {
      name: "Multiple Selection Example",
      code: `<div class="container md light" data-testid="tag-selector-container">
  <button class="chip md light all unselected" data-testid="tag-all">
    All
  </button>
  <button class="chip md light selected" data-testid="tag-react">
    React
  </button>
  <button class="chip md light selected" data-testid="tag-typescript">
    TypeScript
  </button>
  <button class="chip md light unselected" data-testid="tag-vue">
    Vue
  </button>
</div>`
    },
    {
      name: "Empty State",
      code: `<!-- When no tags provided -->
<div class="container md light" data-testid="tag-selector-container">
  <span 
    class="chip md light unselected opacity-50" 
    data-testid="tag-no-tags"
  >
    No tags available
  </span>
</div>`
    }
  ];
  const attributes = [
    { name: "class", type: "string", description: "Space-separated CSS classes: container/chip + size + theme + state + custom" },
    { name: "data-testid", type: "string", description: "Test identifiers: 'tag-selector-container', 'tag-all', 'tag-{id}', 'tag-no-tags'" },
    { name: "disabled", type: "boolean", description: "HTML disabled attribute when tag interaction is disabled" },
    { name: "id", type: "string", description: "Container div id when id prop is provided" }
  ];

  const classStructure = `/* CSS Class Structure for TagSelector */
/* Container gets: */
.container      /* Base container styles */
.{size}         /* sm | md | lg */
.{theme}        /* light | dark */
.{custom}       /* Any additional className prop */

/* Each tag button gets: */
.chip           /* Base chip/tag styles */
.{size}         /* sm | md | lg */
.{theme}        /* light | dark */
.{state}        /* selected | unselected | all */
.hidden         /* Applied when responsive config hides component */

/* Examples: */
/* Container: class="container md light custom-class" */
/* Tag: class="chip md light selected" */
/* All button: class="chip lg dark all selected" */`;
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">HTML Output</h3>
            <p className="text-sm text-muted-foreground">Generated HTML structure from TagSelector component</p>
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