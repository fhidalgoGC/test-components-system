export default function CSSDoc() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">CSS Variables & Styling</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Custom CSS properties and styling approach for the Library Dashboard.
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Custom Properties</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`/* LibraryDashboard specific styles */
.library-dashboard {
  min-height: 100vh;
}

.library-dashboard .component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.library-dashboard .component-card {
  transition: all 0.2s ease-in-out;
}

.library-dashboard .component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.library-dashboard .code-block {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.library-dashboard .feature-icon {
  transition: transform 0.2s ease;
}

.library-dashboard .feature-card:hover .feature-icon {
  transform: scale(1.1);
}`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Responsive Design</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`@media (max-width: 768px) {
  .library-dashboard .component-grid {
    grid-template-columns: 1fr;
  }
}

/* Tailwind CSS Integration */
.library-dashboard {
  @apply min-h-screen;
}

.component-card {
  @apply border border-border rounded-lg p-4 
         hover:bg-accent transition-colors 
         cursor-pointer group;
}

.feature-icon {
  @apply transition-transform duration-200;
}

.feature-card:hover .feature-icon {
  @apply scale-110;
}`}
          </code>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-foreground mb-2">Theme Support</h4>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <code className="text-muted-foreground whitespace-pre">
{`/* Light Theme */
.library-dashboard {
  --dashboard-bg: hsl(var(--background));
  --dashboard-text: hsl(var(--foreground));
  --card-hover: hsl(var(--accent));
}

/* Dark Theme */
.dark .library-dashboard {
  --dashboard-bg: hsl(var(--background));
  --dashboard-text: hsl(var(--foreground));
  --card-hover: hsl(var(--accent));
}

/* Icon color mapping */
.text-primary { color: hsl(var(--primary)); }
.text-purple-500 { color: hsl(258 90% 66%); }
.text-orange-500 { color: hsl(25 95% 53%); }
.text-blue-500 { color: hsl(217 91% 60%); }
.text-green-500 { color: hsl(142 76% 36%); }`}
          </code>
        </div>
      </div>
    </div>
  );
}