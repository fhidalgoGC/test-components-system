import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UsageDocProps {
  componentName: string;
  installation?: string;
  quickStart?: string;
  examples?: { title: string; code: string; description?: string }[];
  bestPractices?: string[];
  troubleshooting?: { issue: string; solution: string }[];
}

export default function UsageDoc({ 
  componentName,
  installation = "npm install @fremitech/ui",
  quickStart = "",
  examples = [],
  bestPractices = [],
  troubleshooting = []
}: UsageDocProps) {
  return (
    <div className="space-y-6">
      {/* Installation */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and setup the component</p>
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
            
            {quickStart && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Quick Start</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <code className="text-muted-foreground whitespace-pre">
                    {quickStart}
                  </code>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      {examples.length > 0 && (
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
      )}

      {/* Best Practices */}
      {bestPractices.length > 0 && (
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
      )}

      {/* Troubleshooting */}
      {troubleshooting.length > 0 && (
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
      )}

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