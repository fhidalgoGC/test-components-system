import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ButtonComponent from '../index';

export default function UsageDoc() {
  const installation = `# Import from the ui-library
import Button from '@/lib/ui-library/Button';`;
  
  const quickStart = `import Button from '@/lib/ui-library/Button';

<Button intent="primary" size="md">
  Click me
</Button>`;
  const examples = [
    {
      title: "Basic Button with Intent",
      code: `<Button intent="primary" size="md" onClick={() => alert('Clicked!')}>
  Primary Action
</Button>

<Button intent="secondary" size="md">
  Secondary Action
</Button>

<Button intent="danger" size="md">
  Delete
</Button>`,
      description: "Different visual intents for various actions"
    },
    {
      title: "Size Variations",
      code: `<div className="flex items-center gap-2">
  <Button intent="primary" size="sm">Small</Button>
  <Button intent="primary" size="md">Medium</Button>
  <Button intent="primary" size="lg">Large</Button>
</div>`,
      description: "Different sizes for various UI contexts"
    },
    {
      title: "Async Operations",
      code: `const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitData();
  } finally {
    setLoading(false);
  }
};

<Button 
  intent="primary"
  disabled={loading}
  onClick={handleSubmit}
>
  {loading ? 'Submitting...' : 'Submit'}
</Button>`,
      description: "Handle async operations with loading states"
    },
    {
      title: "Internationalization",
      code: `// Using i18n translation keys
<Button 
  intent="primary" 
  titleKey="submit_button" // Translates via i18n
/>

// Override with custom children
<Button 
  intent="secondary" 
  titleKey="cancel_button"
>
  Cancel Override
</Button>`,
      description: "Internationalization support with title keys"
    },
    {
      title: "Responsive Visibility",
      code: `const mobileOnlyConfig = {
  mobile: { portrait: true, landscape: true },
  tablet: { portrait: false, landscape: false },
  desktop: false
};

<Button 
  config={mobileOnlyConfig}
  intent="primary"
  size="lg"
>
  Mobile Only Button
</Button>`,
      description: "Control button visibility across devices"
    }
  ];
  const bestPractices = [
    "Use intent='primary' for the main action on a page",
    "Limit primary buttons to one per section or form",
    "Use intent='secondary' for alternative actions",
    "Use intent='danger' for destructive actions (delete, remove)",
    "Provide meaningful button text or use titleKey for i18n",
    "Use size='sm' in compact interfaces like cards or modals",
    "Use size='lg' for important call-to-action buttons",
    "Disable buttons during async operations to prevent double-clicks",
    "Use responsive visibility config for device-specific buttons",
    "Leverage theme integration - buttons automatically adapt to light/dark themes"
  ];
  const troubleshooting = [
    {
      issue: "Button not visible on certain devices",
      solution: "Check the config prop - the button might be hidden by responsive visibility settings"
    },
    {
      issue: "Button styling not matching theme",
      solution: "Ensure ThemeProvider is wrapping your app and theme context is available"
    },
    {
      issue: "i18n translations not working",
      solution: "Check that i18n context is available and translation files exist for the titleKey"
    },
    {
      issue: "Custom className not applying",
      solution: "CSS specificity issue - use more specific selectors or !important for overrides"
    },
    {
      issue: "onClick handler not firing",
      solution: "Check if button is disabled, or if event propagation is stopped elsewhere"
    }
  ];
  return (
    <div className="space-y-6">
      {/* Installation */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and setup the Button component</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Component Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  {installation}
                </code>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Quick Start</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
                  {quickStart}
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Examples</h3>
            <p className="text-sm text-muted-foreground">Common usage patterns and examples</p>
          </div>
          <div className="p-6 space-y-6">
            {examples.map((example, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{example.title}</h4>
                  {example.description && (
                    <span className="text-xs text-muted-foreground">{example.description}</span>
                  )}
                </div>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code className="text-muted-foreground whitespace-pre">
                    {example.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Best Practices</h3>
            <p className="text-sm text-muted-foreground">Recommended usage patterns</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Troubleshooting</h3>
            <p className="text-sm text-muted-foreground">Common issues and solutions</p>
          </div>
          <div className="p-6 space-y-4">
            {troubleshooting.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                  {item.issue}
                </h4>
                <p className="text-sm text-muted-foreground">{item.solution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Additional Resources</h3>
            <p className="text-sm text-muted-foreground">Helpful links and documentation</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ButtonComponent intent="secondary" size="md" className="justify-start">
                <i className="fas fa-book mr-2"></i>
                API Documentation
              </ButtonComponent>
              <ButtonComponent intent="secondary" size="md" className="justify-start">
                <i className="fas fa-code mr-2"></i>
                Source Code
              </ButtonComponent>
              <ButtonComponent intent="secondary" size="md" className="justify-start">
                <i className="fas fa-play-circle mr-2"></i>
                Interactive Demo
              </ButtonComponent>
              <ButtonComponent intent="secondary" size="md" className="justify-start">
                <i className="fas fa-question-circle mr-2"></i>
                Support
              </ButtonComponent>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}