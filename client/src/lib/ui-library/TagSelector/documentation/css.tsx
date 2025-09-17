import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CSSDocProps {
  componentName?: string;
  baseStyles?: string;
  variables?: { name: string; value: string; description: string }[];
  modifiers?: { name: string; styles: string; description: string }[];
  customization?: string;
}

export default function CSSDoc({ 
  componentName = "TagSelector",
  baseStyles = `/* Tag Selector Container */
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
}`,
  variables = [
    { name: "tag-padding-sm", value: "0.25rem 0.5rem", description: "Padding for small tags" },
    { name: "tag-padding-md", value: "0.375rem 0.75rem", description: "Padding for medium tags" },
    { name: "tag-padding-lg", value: "0.5rem 1rem", description: "Padding for large tags" },
    { name: "tag-border-radius", value: "0.375rem", description: "Tag border radius" },
    { name: "tag-gap", value: "0.5rem", description: "Gap between tags" },
    { name: "tag-transition", value: "all 0.2s ease", description: "Animation transition" }
  ],
  modifiers = [
    {
      name: "tag-selected",
      styles: `.tag-selected {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
}

.tag-selected:hover:not(.tag-disabled) {
  background: hsl(var(--primary) / 0.9);
}`,
      description: "Selected tag state"
    },
    {
      name: "tag-all", 
      styles: `.tag-all {
  font-weight: 600;
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.tag-all.tag-selected {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}`,
      description: "Special styling for 'All' tag"
    },
    {
      name: "tag-disabled",
      styles: `.tag-disabled,
.tag-selector-disabled .tag {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`,
      description: "Disabled state"
    },
    {
      name: "size-variants",
      styles: `.tag-selector-sm .tag {
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
}`,
      description: "Size variations"
    }
  ],
  customization = `/* Custom TagSelector Styling */
:root {
  --tag-bg: 210 17% 95%;
  --tag-bg-selected: 210 100% 50%;
  --tag-border: 214 32% 91%;
  --tag-text: 224 71% 4%;
}

/* Custom variants */
.tag-selector-pills .tag {
  border-radius: 9999px;
  padding: 0.5rem 1rem;
}

.tag-selector-minimal .tag {
  border: none;
  background: transparent;
  text-decoration: underline;
}

.tag-selector-minimal .tag-selected {
  background: hsl(var(--accent));
  text-decoration: none;
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
}`
}: CSSDocProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">CSS Styles</h3>
            <p className="text-sm text-muted-foreground">Component styling, CSS classes, and customization</p>
          </div>
          <div className="p-6 space-y-6">
            {/* Base Styles */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Base Styles</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {baseStyles}
                </code>
              </div>
            </div>

            {/* CSS Variables */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">CSS Variables</h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Variable
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Default Value
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variables.map((variable, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-sm text-foreground">--{variable.name}</td>
                        <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{variable.value}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{variable.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modifiers/Classes */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Modifier Classes</h4>
              <div className="space-y-4">
                {modifiers.map((modifier, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{modifier.name}</h5>
                      <span className="text-xs text-muted-foreground">{modifier.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {modifier.styles}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Customization</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {customization}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}