import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function CSSDoc() {
  const baseStyles = `/* TagSelector Base Styles (TagSelector.module.css) */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}

.chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`;
  const sizeClasses = [
    {
      name: "sm",
      styles: `.sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}`,
      description: "Small tag size"
    },
    {
      name: "md",
      styles: `.md {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
}`,
      description: "Medium tag size (default)"
    },
    {
      name: "lg",
      styles: `.lg {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
}`,
      description: "Large tag size"
    }
  ];
  const lightThemeStates = [
    {
      name: "light.selected",
      styles: `.light.selected {
  background-color: hsl(142.1, 76.2%, 36.3%);
  color: hsl(355.7, 100%, 97.3%);
  border-color: hsl(142.1, 76.2%, 36.3%);
}

.light.selected:hover:not(:disabled) {
  background-color: hsl(142.1, 76.2%, 32%);
}`,
      description: "Selected state in light theme"
    },
    {
      name: "light.unselected",
      styles: `.light.unselected {
  background-color: hsl(210, 40%, 96%);
  color: hsl(222.2, 84%, 4.9%);
  border-color: hsl(214.3, 31.8%, 91.4%);
}

.light.unselected:hover:not(:disabled) {
  background-color: hsl(210, 40%, 92%);
  border-color: hsl(214.3, 31.8%, 87%);
}`,
      description: "Unselected state in light theme"
    },
    {
      name: "light.all",
      styles: `.light.all {
  background-color: hsl(221.2, 83.2%, 53.3%);
  color: hsl(210, 40%, 98%);
  border-color: hsl(221.2, 83.2%, 53.3%);
}

.light.all:hover:not(:disabled) {
  background-color: hsl(221.2, 83.2%, 48%);
}`,
      description: "Special 'All' button styling in light theme"
    }
  ];

  const darkThemeStates = [
    {
      name: "dark.selected",
      styles: `.dark.selected {
  background-color: hsl(142.1, 70.6%, 45.3%);
  color: hsl(210, 20%, 98%);
  border-color: hsl(142.1, 70.6%, 45.3%);
}

.dark.selected:hover:not(:disabled) {
  background-color: hsl(142.1, 70.6%, 50%);
}`,
      description: "Selected state in dark theme"
    },
    {
      name: "dark.unselected",
      styles: `.dark.unselected {
  background-color: hsl(217.2, 32.6%, 17.5%);
  color: hsl(210, 40%, 98%);
  border-color: hsl(217.2, 32.6%, 17.5%);
}

.dark.unselected:hover:not(:disabled) {
  background-color: hsl(217.2, 32.6%, 20%);
  border-color: hsl(217.2, 32.6%, 25%);
}`,
      description: "Unselected state in dark theme"
    },
    {
      name: "dark.all",
      styles: `.dark.all {
  background-color: hsl(217.2, 91.2%, 59.8%);
  color: hsl(222.2, 84%, 4.9%);
  border-color: hsl(217.2, 91.2%, 59.8%);
}

.dark.all:hover:not(:disabled) {
  background-color: hsl(217.2, 91.2%, 55%);
}`,
      description: "Special 'All' button styling in dark theme"
    }
  ];
  const visibilityClass = {
    name: "hidden",
    styles: `.hidden {
  display: none !important;
}`,
    description: "Used for responsive visibility control"
  };

  const customizationExample = `/* Customizing TagSelector Component */
/* Override container styles */
.custom-tag-selector .container {
  gap: 0.25rem; /* Tighter spacing */
  justify-content: center; /* Center tags */
}

/* Custom tag styling */
.custom-tag-selector .chip {
  border-radius: 0.375rem; /* Less rounded */
  font-weight: 600; /* Bolder text */
  text-transform: uppercase; /* Uppercase labels */
  font-size: 0.75rem;
}

/* Custom selected state */
.custom-tag-selector .light.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

/* Custom hover effects */
.custom-tag-selector .chip:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-tag-selector .container {
    gap: 0.375rem;
  }
  
  .custom-tag-selector .chip {
    font-size: 0.6875rem;
    padding: 0.25rem 0.625rem;
  }
}`;
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">CSS Styles</h3>
            <p className="text-sm text-muted-foreground">TagSelector component CSS classes from TagSelector.module.css</p>
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

            {/* Light Theme States */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Light Theme States</h4>
              <div className="space-y-4">
                {lightThemeStates.map((state, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{state.name}</h5>
                      <span className="text-xs text-muted-foreground">{state.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {state.styles}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark Theme States */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Dark Theme States</h4>
              <div className="space-y-4">
                {darkThemeStates.map((state, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-mono text-sm text-foreground">.{state.name}</h5>
                      <span className="text-xs text-muted-foreground">{state.description}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-muted-foreground whitespace-pre">
                        {state.styles}
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