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
  componentName = "Button",
  baseStyles = `/* Base Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;
}

.btn:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}`,
  variables = [
    { name: "btn-padding-sm", value: "0.5rem 0.75rem", description: "Padding for small buttons" },
    { name: "btn-padding-md", value: "0.625rem 1rem", description: "Padding for medium buttons" },
    { name: "btn-padding-lg", value: "0.75rem 1.25rem", description: "Padding for large buttons" },
    { name: "btn-border-radius", value: "0.375rem", description: "Button border radius" },
    { name: "btn-transition", value: "all 0.2s ease", description: "Animation transition" }
  ],
  modifiers = [
    {
      name: "btn-primary",
      styles: `.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover:not(.btn-disabled) {
  background: hsl(var(--primary) / 0.9);
  transform: translateY(-1px);
}`,
      description: "Primary button variant"
    },
    {
      name: "btn-secondary", 
      styles: `.btn-secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
}

.btn-secondary:hover:not(.btn-disabled) {
  background: hsl(var(--secondary) / 0.8);
}`,
      description: "Secondary button variant"
    },
    {
      name: "btn-disabled",
      styles: `.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`,
      description: "Disabled state"
    }
  ],
  customization = `/* Custom Button Styling */
:root {
  --btn-primary-bg: 210 100% 50%;
  --btn-primary-fg: 210 17% 98%;
  --btn-secondary-bg: 210 17% 95%;
  --btn-secondary-fg: 224 71% 4%;
}

/* Custom variants */
.btn-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
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