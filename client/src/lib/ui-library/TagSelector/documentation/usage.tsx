import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UsageDoc() {
  const installation = `# Import from the ui-library - NEW ASYNC SYSTEM
import TagSelector, { LanguageProvider, useLanguage } from '@/lib/ui-library/TagSelector';
import type { Tag, TagItem, TagsFunction } from '@/lib/ui-library/TagSelector/types';

# Setup LanguageProvider at App level
<LanguageProvider defaultLanguage="en">
  <YourApp />
</LanguageProvider>`;
  
  const quickStart = `// NEW ASYNC MULTI-LANGUAGE APPROACH
import TagSelector from '@/lib/ui-library/TagSelector';
import type { TagItem, TagsFunction } from '@/lib/ui-library/TagSelector/types';

// Define async function that returns multi-language tags
const getMyTags: TagsFunction = async (): Promise<TagItem[]> => {
  // Load from API, database, etc.
  const response = await fetch('/api/my-tags');
  return response.json(); // Returns TagItem[] format
};

const [selectedTags, setSelectedTags] = useState<string[]>([]);

<TagSelector
  getTagsFunction={getMyTags} // NEW: Async function
  selectedTags={selectedTags}
  onSelectionChange={setSelectedTags}
  allowMultiple={true}
  allowAll={true}
/>

// Tags automatically update when language changes!`;
  const examples = [
    {
      title: "Async Loading with Real-time Language Switching",
      code: `const [filters, setFilters] = useState<string[]>([]);
const { currentLanguage, setLanguage } = useLanguage();

const getFilterCategories = useCallback(async (): Promise<TagItem[]> => {
  // Simulate API call with loading delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: 'electronics',
      label: {
        en: 'Electronics',
        es: 'Electrónicos',
        fr: 'Électronique',
        default: 'Electronics'
      }
    },
    {
      id: 'clothing',
      label: {
        en: 'Clothing & Fashion',
        es: 'Ropa y Moda',
        fr: 'Vêtements et Mode',
        default: 'Clothing & Fashion'
      }
    }
  ];
}, []);

<div>
  {/* Language switcher */}
  <select value={currentLanguage} onChange={(e) => setLanguage(e.target.value)}>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
  </select>
  
  <TagSelector
    getTagsFunction={getFilterCategories}
    selectedTags={filters}
    onSelectionChange={setFilters}
    allowMultiple={true}
    allowAll={true}
    size="md"
  />
  
  {/* Results update automatically with language changes */}
  <div className="mt-4">
    Active filters: {filters.length > 0 ? filters.join(', ') : 'All categories'}
  </div>
</div>`,
      description: "Real-time loading with automatic language switching - labels update instantly when language changes"
    },
    {
      title: "Legacy Tags Support (Backward Compatibility)",
      code: `// LEGACY: Old static tags still work for backward compatibility
const [priority, setPriority] = useState<string[]>(['medium']);
const priorities: Tag[] = [
  { id: 'low', label: 'Low Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'high', label: 'High Priority' },
  { id: 'urgent', label: 'Urgent' }
];

<TagSelector
  tags={priorities} // LEGACY: Still works
  selectedTags={priority}
  onSelectionChange={setPriority}
  allowMultiple={false} // Only one can be selected
  allowAll={false} // No "All" option for single selection
  size="sm"
/>

// NOTE: Legacy tags don't support language switching
// Migrate to getTagsFunction for full functionality`,
      description: "Backward compatibility - old 'tags' prop still works but without language support"
    },
    {
      title: "Error Handling & Loading States",
      code: `const [skills, setSkills] = useState<string[]>(['react', 'typescript']);

const getTechStack = useCallback(async (): Promise<TagItem[]> => {
  try {
    // Real API call with potential failure
    const response = await fetch('/api/tech-stack');
    if (!response.ok) throw new Error('Failed to load');
    
    return await response.json();
  } catch (error) {
    // TagSelector will show error message automatically
    console.error('Failed to load tech stack:', error);
    throw error; // Re-throw to let TagSelector handle it
  }
}, []);

<TagSelector
  getTagsFunction={getTechStack}
  selectedTags={skills}
  onSelectionChange={setSkills}
  allowMultiple={true}
  allowAll={false}
  size="lg"
/>

// Automatically shows:
// - Loading state while fetching
// - Error message if fetch fails
// - Empty state if no tags returned`,
      description: "Automatic loading states and error handling - no manual state management needed"
    },
    {
      title: "Responsive with i18n",
      code: `const responsiveConfig = {
  mobile: { portrait: true, landscape: false },
  tablet: { portrait: true, landscape: true },
  desktop: true
};

const [languages, setLanguages] = useState<string[]>(['en']);
const supportedLanguages: Tag[] = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' }
];

<TagSelector
  tags={supportedLanguages}
  selectedTags={languages}
  onSelectionChange={setLanguages}
  allowMultiple={true}
  allowAll={false}
  size="md"
  config={responsiveConfig} // Only show on larger screens
  langOverride="es" // Force Spanish translations
/>`,
      description: "Responsive behavior with internationalization"
    }
  ];
  const bestPractices = [
    "Use clear, meaningful tag labels that users can easily understand",
    "Limit the number of tags (8-12 max) to avoid overwhelming users",
    "Use allowAll=true for filter/category scenarios where \"show all\" makes sense",
    "Set allowMultiple=false for mutually exclusive choices (like priority levels)",
    "Use size='sm' in compact interfaces like modals or sidebars",
    "Use size='lg' for important selection interfaces",
    "Provide visual feedback with proper selected/unselected states",
    "Use responsive visibility config for device-specific tag selectors",
    "Leverage i18n support for multilingual applications",
    "Consider theme integration - tags automatically adapt to light/dark themes"
  ];
  const troubleshooting = [
    {
      issue: "Tags not updating when selectedTags prop changes",
      solution: "Ensure selectedTags array is properly managed in state and the reference changes when updated"
    },
    {
      issue: "onSelectionChange callback not firing",
      solution: "Check that the function is properly bound and not undefined. Verify it's not being overridden by disabled state"
    },
    {
      issue: "TagSelector not visible on certain devices",
      solution: "Check the config prop - the component might be hidden by responsive visibility settings"
    },
    {
      issue: "All button behavior not working as expected",
      solution: "Ensure allowAll=true and understand that it selects/deselects all available tags"
    },
    {
      issue: "Single selection mode allowing multiple selections",
      solution: "Set allowMultiple=false and ensure your onSelectionChange handler respects single selection"
    },
    {
      issue: "Theme styling not applied correctly",
      solution: "Ensure ThemeProvider is wrapping your app and theme context is available"
    },
    {
      issue: "i18n translations not working for 'All' and 'No tags' text",
      solution: "Check that i18n context is available and translation files exist for the required keys"
    }
  ];
  return (
    <div className="space-y-6">
      {/* Installation */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Installation</h3>
            <p className="text-sm text-muted-foreground">How to install and setup the TagSelector component</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Component Import</h4>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <code className="text-muted-foreground whitespace-pre">
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