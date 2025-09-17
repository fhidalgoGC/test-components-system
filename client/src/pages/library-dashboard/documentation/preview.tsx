import { Card, CardContent } from '@/components/ui/card';

export default function Preview() {
  return (
    <div className="space-y-8">
      {/* Components Overview */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Component Structure</h3>
            <p className="text-sm text-muted-foreground">Modular organization following architectural guide</p>
          </div>
          <div className="p-6">
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground whitespace-pre-wrap">
{`ComponentName/
├── types/           # TypeScript definitions
├── hook/            # Custom hooks
├── provider/        # Context providers
├── view/            # UI components
├── utils/           # Helper functions
├── i18n/            # Translations
└── index.tsx        # Main export`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}