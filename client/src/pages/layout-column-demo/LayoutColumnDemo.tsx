import { useState } from 'react';
import { LayoutColumn, useLayoutColumn } from '../../lib/ui-library/components/LayoutColumn';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DemoBox = ({ children, color = 'bg-primary' }: { children: React.ReactNode; color?: string }) => (
  <div className={`${color} text-white px-4 py-2 rounded font-medium text-center min-w-[60px]`}>
    {children}
  </div>
);

const initialComponents = [
  { id: 'header', component: <DemoBox color="bg-violet-600">Header (Slot 0)</DemoBox>, align: 'top' as const, slot: 0 },
  { id: 'nav', component: <DemoBox color="bg-violet-500">Navigation (Slot 1)</DemoBox>, align: 'top' as const, slot: 1 },
  { id: 'main', component: <DemoBox color="bg-violet-400">Main Content (Slot 2)</DemoBox>, align: 'top' as const, slot: 2 },
  { id: 'sidebar', component: <DemoBox color="bg-violet-300">Sidebar (Slot 2)</DemoBox>, align: 'top' as const, slot: 2 },
  { id: 'footer', component: <DemoBox color="bg-violet-700">Footer (Slot 3)</DemoBox>, align: 'bottom' as const, slot: 3 },
];

function HookExample() {
  const {
    visibleComponents,
    visibleSlots,
    toggleSlot,
    toggleComponent,
    isSlotVisible,
    isComponentVisible,
    resetVisibility,
  } = useLayoutColumn({ components: initialComponents, slots: 4 });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium">Slots:</span>
        {[0, 1, 2, 3].map((slot) => (
          <Button
            key={slot}
            size="sm"
            variant={isSlotVisible(slot) ? "default" : "outline"}
            onClick={() => toggleSlot(slot)}
            data-testid={`button-toggle-slot-${slot}`}
          >
            Slot {slot}
          </Button>
        ))}
        <Button size="sm" variant="secondary" onClick={resetVisibility} data-testid="button-reset">
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium">Components:</span>
        {initialComponents.map((comp) => (
          <Button
            key={comp.id}
            size="sm"
            variant={isComponentVisible(comp.id) ? "default" : "outline"}
            onClick={() => toggleComponent(comp.id)}
            data-testid={`button-toggle-${comp.id}`}
          >
            {comp.id}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Visible slots: {visibleSlots}</p>
      <div className="border rounded-lg p-4 bg-gray-50 h-[300px]">
        <LayoutColumn
          slots={4}
          widthMode="full"
          heightMode="full"
          slotGap="md"
          componentGap="sm"
          componentHorizontalAlign="stretch"
          components={visibleComponents}
        />
      </div>
    </div>
  );
}

export default function LayoutColumnDemo() {
  const [showItem2, setShowItem2] = useState(true);
  const [showItem3, setShowItem3] = useState(true);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">LayoutColumn Demo</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Vertical layout component with configurable slots, alignment, and spacing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-1-title">Basic Column Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50 h-[300px]">
              <LayoutColumn
                slots={1}
                widthMode="full"
                heightMode="full"
                paddingY="md"
                componentGap="sm"
                componentHorizontalAlign="center"
                components={[
                  { component: <DemoBox>Header</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox>Content 1</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox>Content 2</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-secondary">Footer</DemoBox>, align: "bottom", slot: 0 },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-2-title">Multiple Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50 h-[300px]">
              <LayoutColumn
                slots={3}
                widthMode="full"
                heightMode="full"
                slotGap="md"
                componentHorizontalAlign="stretch"
                components={[
                  { component: <DemoBox>Slot 0 - Header</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-blue-500">Slot 1 - Main</DemoBox>, align: "top", slot: 1 },
                  { component: <DemoBox color="bg-green-500">Slot 2 - Footer</DemoBox>, align: "bottom", slot: 2 },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-3-title">Fixed Dimensions (Numeric)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50 flex justify-center">
              <LayoutColumn
                slots={1}
                widthMode="fixed"
                width={200}
                heightMode="fixed"
                height={250}
                paddingX={16}
                paddingY={12}
                componentGap={8}
                componentHorizontalAlign="center"
                className="bg-white shadow-md rounded-lg"
                components={[
                  { component: <DemoBox color="bg-purple-500">200px x 250px</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-pink-500">Centered</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-indigo-500">Bottom</DemoBox>, align: "bottom", slot: 0 },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-4-title">Horizontal Alignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="border rounded p-2 bg-gray-50 flex-1 h-[200px]">
                <LayoutColumn
                  slots={1}
                  widthMode="full"
                  heightMode="full"
                  componentGap="xs"
                  componentHorizontalAlign="left"
                  components={[
                    { component: <DemoBox color="bg-red-500">Left</DemoBox>, align: "top", slot: 0 },
                    { component: <DemoBox color="bg-red-400">Aligned</DemoBox>, align: "top", slot: 0 },
                  ]}
                />
              </div>
              <div className="border rounded p-2 bg-gray-50 flex-1 h-[200px]">
                <LayoutColumn
                  slots={1}
                  widthMode="full"
                  heightMode="full"
                  componentGap="xs"
                  componentHorizontalAlign="center"
                  components={[
                    { component: <DemoBox color="bg-green-500">Center</DemoBox>, align: "top", slot: 0 },
                    { component: <DemoBox color="bg-green-400">Aligned</DemoBox>, align: "top", slot: 0 },
                  ]}
                />
              </div>
              <div className="border rounded p-2 bg-gray-50 flex-1 h-[200px]">
                <LayoutColumn
                  slots={1}
                  widthMode="full"
                  heightMode="full"
                  componentGap="xs"
                  componentHorizontalAlign="right"
                  components={[
                    { component: <DemoBox color="bg-blue-500">Right</DemoBox>, align: "top", slot: 0 },
                    { component: <DemoBox color="bg-blue-400">Aligned</DemoBox>, align: "top", slot: 0 },
                  ]}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle data-testid="text-example-5-title">Hide Property (Conditional Rendering)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-item-2"
                  checked={showItem2}
                  onCheckedChange={setShowItem2}
                  data-testid="switch-show-item-2"
                />
                <Label htmlFor="show-item-2">Show Item 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-item-3"
                  checked={showItem3}
                  onCheckedChange={setShowItem3}
                  data-testid="switch-show-item-3"
                />
                <Label htmlFor="show-item-3">Show Item 3</Label>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50 h-[250px]">
              <LayoutColumn
                slots={1}
                widthMode="full"
                heightMode="full"
                componentGap="sm"
                componentHorizontalAlign="center"
                components={[
                  { component: <DemoBox color="bg-emerald-500">Item 1 (Always Visible)</DemoBox>, align: "top", slot: 0, hide: false },
                  { component: <DemoBox color="bg-amber-500">Item 2 (Toggle)</DemoBox>, align: "top", slot: 0, hide: !showItem2 },
                  { component: <DemoBox color="bg-cyan-500">Item 3 (Toggle)</DemoBox>, align: "top", slot: 0, hide: !showItem3 },
                  { component: <DemoBox color="bg-gray-600">Item 4 (Always Visible)</DemoBox>, align: "bottom", slot: 0, hide: false },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-6-title">Full Mode with Margins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg bg-gray-200 h-[250px]">
              <LayoutColumn
                slots={1}
                widthMode="full"
                heightMode="full"
                marginX="lg"
                marginY="md"
                paddingX="md"
                paddingY="sm"
                componentGap="sm"
                componentHorizontalAlign="stretch"
                className="bg-white rounded shadow"
                components={[
                  { component: <DemoBox color="bg-teal-500">With Margins</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-teal-400">calc(100% - margin*2)</DemoBox>, align: "top", slot: 0 },
                  { component: <DemoBox color="bg-teal-600">Stretched</DemoBox>, align: "bottom", slot: 0 },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle data-testid="text-example-7-title">Sidebar Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-100 h-[300px] flex">
              <LayoutColumn
                slots={2}
                widthMode="fixed"
                width={180}
                heightMode="full"
                paddingY="md"
                paddingX="sm"
                slotGap="lg"
                componentGap="xs"
                componentHorizontalAlign="stretch"
                className="bg-slate-800 rounded-lg"
                components={[
                  { component: <div className="text-white font-bold text-lg px-2">Logo</div>, align: "top", slot: 0 },
                  { component: <Button variant="ghost" className="justify-start text-white">Home</Button>, align: "top", slot: 1 },
                  { component: <Button variant="ghost" className="justify-start text-white">Settings</Button>, align: "top", slot: 1 },
                  { component: <Button variant="ghost" className="justify-start text-white">Profile</Button>, align: "top", slot: 1 },
                  { component: <Button variant="outline" className="text-white border-white">Logout</Button>, align: "bottom", slot: 1 },
                ]}
              />
              <div className="flex-1 bg-white ml-4 rounded-lg p-4">
                <p className="text-muted-foreground">Main Content Area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle data-testid="text-example-8-title">useLayoutColumn Hook (Dynamic Visibility)</CardTitle>
          </CardHeader>
          <CardContent>
            <HookExample />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
