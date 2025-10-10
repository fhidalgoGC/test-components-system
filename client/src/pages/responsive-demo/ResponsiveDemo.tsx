import { useResponsive } from '@/lib/ui-library/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ResponsiveDemo() {
  const {
    deviceType,
    orientation,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape
  } = useResponsive();

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Responsive Hook Demo</h1>
          <p className="text-muted-foreground">
            Resize your browser window or rotate your device to see the hook in action
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Device Type</CardTitle>
            <CardDescription>Based on window width breakpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold capitalize">{deviceType}</div>
              <div className="flex flex-col gap-2">
                <Badge variant={isMobile ? "default" : "outline"} data-testid="badge-mobile">
                  Mobile (&lt; 768px)
                </Badge>
                <Badge variant={isTablet ? "default" : "outline"} data-testid="badge-tablet">
                  Tablet (768px - 1024px)
                </Badge>
                <Badge variant={isDesktop ? "default" : "outline"} data-testid="badge-desktop">
                  Desktop (≥ 1024px)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Orientation</CardTitle>
            <CardDescription>Based on width vs height comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold capitalize">{orientation}</div>
              <div className="flex flex-col gap-2">
                <Badge variant={isPortrait ? "default" : "outline"} data-testid="badge-portrait">
                  Portrait (height &gt; width)
                </Badge>
                <Badge variant={isLandscape ? "default" : "outline"} data-testid="badge-landscape">
                  Landscape (width &gt; height)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hook Values</CardTitle>
            <CardDescription>Real-time values from useResponsive()</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">deviceType</div>
                <div className="font-bold" data-testid="value-deviceType">{deviceType}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">orientation</div>
                <div className="font-bold" data-testid="value-orientation">{orientation}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">isMobile</div>
                <div className="font-bold" data-testid="value-isMobile">{isMobile.toString()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">isTablet</div>
                <div className="font-bold" data-testid="value-isTablet">{isTablet.toString()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">isDesktop</div>
                <div className="font-bold" data-testid="value-isDesktop">{isDesktop.toString()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">isPortrait</div>
                <div className="font-bold" data-testid="value-isPortrait">{isPortrait.toString()}</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-muted-foreground mb-1">isLandscape</div>
                <div className="font-bold" data-testid="value-isLandscape">{isLandscape.toString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Window Size</CardTitle>
            <CardDescription>Current browser window dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono">
              {window.innerWidth} x {window.innerHeight} px
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
