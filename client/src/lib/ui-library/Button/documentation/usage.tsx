import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UsageDocProps {
  componentName?: string;
  installation?: string;
  quickStart?: string;
  examples?: { title: string; code: string; description?: string }[];
  bestPractices?: string[];
  troubleshooting?: { issue: string; solution: string }[];
}

export default function UsageDoc({ 
  componentName = "Button",
  installation = "npm install @fremitech/ui",
  quickStart = `import { Button } from '@fremitech/ui';

<Button intent="primary" size="md">
  Click me
</Button>`,
  examples = [
    {
      title: "Form Submission",
      code: `<form onSubmit={handleSubmit}>
  <Button 
    type="submit" 
    intent="primary"
    disabled={!isValid}
  >
    Submit Form
  </Button>
</form>`,
      description: "Basic form submission button"
    },
    {
      title: "Async Action",
      code: `const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  try {
    await saveData();
  } finally {
    setLoading(false);
  }
};

<Button 
  intent="primary"
  disabled={loading}
  onClick={handleSave}
>
  {loading ? 'Saving...' : 'Save Changes'}
</Button>`,
      description: "Handle async operations"
    },
    {
      title: "Button Group",
      code: `<div className="flex gap-2">
  <Button intent="primary" size="sm">Primary</Button>
  <Button intent="secondary" size="sm">Secondary</Button>
  <Button intent="danger" size="sm">Delete</Button>
</div>`,
      description: "Group of related buttons"
    }
  ],
  bestPractices = [
    "Use intent='primary' for the main action on a page",
    "Limit primary buttons to one per section", 
    "Use intent='secondary' for less important actions",
    "Always provide meaningful button text",
    "Use size='sm' in compact interfaces",
    "Disable buttons during async operations",
    "Include loading states for better UX"
  ],
  troubleshooting = [
    {
      issue: "Button click not working",
      solution: "Ensure onClick prop is passed and not disabled"
    },
    {
      issue: "Styling not applied correctly",
      solution: "Check if component CSS is imported properly"
    },
    {
      issue: "TypeScript errors with props",
      solution: "Verify prop types match ButtonProps interface"
    }
  ]
}: UsageDocProps) {
  return (
    <div className="space-y-6">
      {/* Installation */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and setup the {componentName} component</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Package Installation</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground">
                  {installation}<br/>
                  # or<br/>
                  yarn add @fremitech/ui
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
              <Button variant="outline" className="justify-start">
                <i className="fas fa-book mr-2"></i>
                API Documentation
              </Button>
              <Button variant="outline" className="justify-start">
                <i className="fas fa-code mr-2"></i>
                Source Code
              </Button>
              <Button variant="outline" className="justify-start">
                <i className="fas fa-play-circle mr-2"></i>
                Interactive Demo
              </Button>
              <Button variant="outline" className="justify-start">
                <i className="fas fa-question-circle mr-2"></i>
                Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}