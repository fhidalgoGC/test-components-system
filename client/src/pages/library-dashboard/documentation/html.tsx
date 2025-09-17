export default function HTMLDoc() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">HTML Structure</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Generated HTML markup for the Library Dashboard component.
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Main Structure</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`<div class="library-dashboard" data-testid="library-dashboard">
  <!-- ComponentLayout wrapper -->
  <div class="component-layout">
    <!-- Header section -->
    <div class="component-header">
      <h1>Component Library Overview</h1>
      <p>React + TypeScript modular component system</p>
    </div>
    
    <!-- Tab navigation -->
    <div class="tab-navigation">
      <button class="tab-button active">Components Structure</button>
      <button class="tab-button">React</button>
      <button class="tab-button">HTML</button>
      <button class="tab-button">CSS</button>
      <button class="tab-button">Usage</button>
    </div>
    
    <!-- Content area -->
    <div class="tab-content">
      <!-- Component cards -->
      <div class="component-grid grid-cols-3">
        <a href="/components/button" data-testid="link-button">
          <div class="component-card">
            <div class="card-header">
              <svg class="lucide-icon"><!-- MousePointer icon --></svg>
              <h4 data-testid="text-button-title">Button</h4>
            </div>
            <div class="card-features">
              <!-- Feature list -->
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">CSS Classes</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`/* Main container */
.library-dashboard { /* Component root */ }

/* Component grid */
.component-grid { 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* Component cards */
.component-card {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
}

.component-card:hover {
  background: var(--accent);
  transform: translateY(-2px);
}

/* Feature icons */
.feature-icon {
  transition: transform 0.2s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}`}
          </code>
        </div>
      </div>
    </div>
  );
}