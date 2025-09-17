import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CSSDoc() {
  const baseStyles = `/* Button Base Styles (Button.module.css) */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.root:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`;

  const sizeClasses = [
    {
      name: "sm",
      styles: `.sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}`,
      description: "Small button size"
    },
    {
      name: "md",
      styles: `.md {
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
}`,
      description: "Medium button size (default)"
    },
    {
      name: "lg",
      styles: `.lg {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
}`,
      description: "Large button size"
    }
  ];

  const intentLightTheme = [
    {
      name: "light.primary",
      styles: `.light.primary {
  background-color: hsl(221.2, 83.2%, 53.3%);
  color: hsl(210, 40%, 98%);
}

.light.primary:hover:not(:disabled) {
  background-color: hsl(221.2, 83.2%, 48%);
}`,
      description: "Primary intent for light theme"
    },
    {
      name: "light.secondary",
      styles: `.light.secondary {
  background-color: hsl(210, 40%, 96%);
  color: hsl(222.2, 84%, 4.9%);
  border-color: hsl(214.3, 31.8%, 91.4%);
}

.light.secondary:hover:not(:disabled) {
  background-color: hsl(210, 40%, 92%);
}`,
      description: "Secondary intent for light theme"
    },
    {
      name: "light.danger",
      styles: `.light.danger {
  background-color: hsl(0, 84.2%, 60.2%);
  color: hsl(210, 40%, 98%);
}

.light.danger:hover:not(:disabled) {
  background-color: hsl(0, 84.2%, 55%);
}`,
      description: "Danger intent for light theme"
    }
  ];

  const intentDarkTheme = [
    {
      name: "dark.primary",
      styles: `.dark.primary {
  background-color: hsl(217.2, 91.2%, 59.8%);
  color: hsl(222.2, 84%, 4.9%);
}

.dark.primary:hover:not(:disabled) {
  background-color: hsl(217.2, 91.2%, 55%);
}`,
      description: "Primary intent for dark theme"
    },
    {
      name: "dark.secondary",
      styles: `.dark.secondary {
  background-color: hsl(217.2, 32.6%, 17.5%);
  color: hsl(210, 40%, 98%);
  border-color: hsl(217.2, 32.6%, 17.5%);
}

.dark.secondary:hover:not(:disabled) {
  background-color: hsl(217.2, 32.6%, 20%);
}`,
      description: "Secondary intent for dark theme"
    },
    {
      name: "dark.danger",
      styles: `.dark.danger {
  background-color: hsl(0, 62.8%, 30.6%);
  color: hsl(210, 40%, 98%);
}

.dark.danger:hover:not(:disabled) {
  background-color: hsl(0, 62.8%, 35%);
}`,
      description: "Danger intent for dark theme"
    }
  ];

  const visibilityClass = {
    name: "hidden",
    styles: `.hidden {
  display: none !important;
}`,
    description: "Used for responsive visibility control"
  };

  const customizationExample = `/* Customizing Button Component */
/* You can override specific CSS classes: */

.custom-button .root {
  border-radius: 0.25rem; /* More squared corners */
  font-weight: 600; /* Bolder text */
}

.custom-button .primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.custom-button .primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`;
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">CSS Styles</h3>
            <p className="text-sm text-muted-foreground">Button component CSS classes from Button.module.css</p>
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

            {/* Size Classes */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Size Classes</h4>
              <div className="space-y-4">
                {sizeClasses.map((sizeClass, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{sizeClass.name}</h5>
                      <span className="text-xs text-muted-foreground">{sizeClass.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {sizeClass.styles}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intent Classes - Light Theme */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Intent Classes - Light Theme</h4>
              <div className="space-y-4">
                {intentLightTheme.map((intent, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{intent.name}</h5>
                      <span className="text-xs text-muted-foreground">{intent.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {intent.styles}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intent Classes - Dark Theme */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Intent Classes - Dark Theme</h4>
              <div className="space-y-4">
                {intentDarkTheme.map((intent, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{intent.name}</h5>
                      <span className="text-xs text-muted-foreground">{intent.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {intent.styles}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility Class */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Visibility Class</h4>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-mono text-sm text-foreground">.{visibilityClass.name}</h5>
                <span className="text-xs text-muted-foreground">{visibilityClass.description}</span>
              </div>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {visibilityClass.styles}
                </code>
              </div>
            </div>

            {/* Customization */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Customization Example</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code className="text-muted-foreground whitespace-pre">
                  {customizationExample}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}