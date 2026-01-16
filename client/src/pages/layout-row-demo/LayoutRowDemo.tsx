import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  Search, 
  Bell, 
  User,
  Menu,
  Home,
  Filter,
  Download,
  Share,
  MoreHorizontal
} from "lucide-react";

export function LayoutRowDemo() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" data-testid="text-title">LayoutRow Component</h1>
        <p className="text-muted-foreground" data-testid="text-description">
          Componente de layout horizontal altamente configurable para organizar múltiples componentes en slots.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Toolbar Básico (3 slots)</h2>
          <p className="text-sm text-muted-foreground">
            Layout con 3 slots: navegación izquierda, título central, acciones derecha.
          </p>
          <div className="border rounded-lg overflow-hidden" data-testid="demo-toolbar-basic">
            <LayoutRow
              slots={3}
              widthMode="full"
              heightMode="fixed"
              height="sm"
              paddingX="md"
              paddingY="sm"
              componentVerticalAlign="center"
              componentGap="sm"
              slotGap="md"
              className="bg-slate-100 dark:bg-slate-800"
              components={[
                { component: <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>, align: 'left', slot: 0 },
                { component: <span className="font-semibold">Page Title</span>, align: 'center', slot: 1 },
                { component: <Button size="sm"><Save className="h-4 w-4 mr-2" /> Save</Button>, align: 'right', slot: 2 },
              ]}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Header con múltiples acciones</h2>
          <p className="text-sm text-muted-foreground">
            2 slots con múltiples componentes por slot, usando diferentes alineaciones.
          </p>
          <div className="border rounded-lg overflow-hidden" data-testid="demo-header-actions">
            <LayoutRow
              slots={2}
              widthMode="full"
              paddingX="lg"
              paddingY="md"
              componentVerticalAlign="center"
              componentGap="md"
              slotGap="lg"
              className="bg-white dark:bg-slate-900 shadow-sm"
              components={[
                { component: <div className="flex items-center gap-2"><Menu className="h-5 w-5" /><span className="font-bold text-lg">MyApp</span></div>, align: 'left', slot: 0 },
                { component: <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"><Search className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Search...</span></div>, align: 'center', slot: 0 },
                { component: <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
                { component: <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
                { component: <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
              ]}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. Barra de filtros</h2>
          <p className="text-sm text-muted-foreground">
            Layout con filtros a la izquierda y acciones a la derecha.
          </p>
          <div className="border rounded-lg overflow-hidden" data-testid="demo-filter-bar">
            <LayoutRow
              slots={1}
              widthMode="full"
              paddingX="md"
              paddingY="sm"
              componentVerticalAlign="center"
              componentGap="sm"
              className="bg-slate-50 dark:bg-slate-900"
              components={[
                { component: <Badge variant="secondary"><Filter className="h-3 w-3 mr-1" /> All</Badge>, align: 'left', slot: 0 },
                { component: <Badge variant="outline">Active</Badge>, align: 'left', slot: 0 },
                { component: <Badge variant="outline">Pending</Badge>, align: 'left', slot: 0 },
                { component: <Badge variant="outline">Completed</Badge>, align: 'left', slot: 0 },
                { component: <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>, align: 'right', slot: 0 },
                { component: <Button variant="outline" size="sm"><Share className="h-4 w-4 mr-1" /> Share</Button>, align: 'right', slot: 0 },
              ]}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Card Actions (ancho fijo)</h2>
          <p className="text-sm text-muted-foreground">
            Layout con ancho fijo para acciones de tarjeta.
          </p>
          <div className="flex justify-center" data-testid="demo-card-actions">
            <LayoutRow
              slots={1}
              widthMode="fixed"
              width={400}
              paddingX="md"
              paddingY="sm"
              componentGap="sm"
              className="border rounded-lg bg-white dark:bg-slate-900"
              components={[
                { component: <Button variant="outline" className="flex-1">Cancel</Button>, align: 'left', slot: 0 },
                { component: <Button className="flex-1">Confirm</Button>, align: 'right', slot: 0 },
              ]}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Navegación con breadcrumbs</h2>
          <p className="text-sm text-muted-foreground">
            Breadcrumbs a la izquierda, acciones contextuales a la derecha.
          </p>
          <div className="border rounded-lg overflow-hidden" data-testid="demo-breadcrumbs">
            <LayoutRow
              slots={1}
              widthMode="full"
              paddingX="md"
              paddingY="xs"
              componentVerticalAlign="center"
              componentGap="xs"
              className="bg-slate-50 dark:bg-slate-900 border-b"
              components={[
                { component: <Button variant="link" size="sm" className="p-0 h-auto"><Home className="h-4 w-4" /></Button>, align: 'left', slot: 0 },
                { component: <span className="text-muted-foreground">/</span>, align: 'left', slot: 0 },
                { component: <Button variant="link" size="sm" className="p-0 h-auto">Dashboard</Button>, align: 'left', slot: 0 },
                { component: <span className="text-muted-foreground">/</span>, align: 'left', slot: 0 },
                { component: <span className="text-sm font-medium">Settings</span>, align: 'left', slot: 0 },
                { component: <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>, align: 'right', slot: 0 },
              ]}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Diferentes alineaciones verticales</h2>
          <p className="text-sm text-muted-foreground">
            Comparación de alineaciones: top, center, bottom, stretch.
          </p>
          <div className="grid grid-cols-2 gap-4" data-testid="demo-vertical-align">
            {(['top', 'center', 'bottom', 'stretch'] as const).map((align) => (
              <div key={align} className="border rounded-lg overflow-hidden">
                <div className="text-xs font-medium p-2 bg-slate-100 dark:bg-slate-800">
                  verticalAlign: {align}
                </div>
                <LayoutRow
                  slots={3}
                  widthMode="full"
                  heightMode="fixed"
                  height="xs"
                  paddingX="sm"
                  componentVerticalAlign={align}
                  componentGap="sm"
                  className="bg-white dark:bg-slate-900"
                  components={[
                    { component: <div className="w-8 h-8 bg-blue-500 rounded" />, align: 'left', slot: 0 },
                    { component: <div className="w-12 h-4 bg-green-500 rounded" />, align: 'center', slot: 1 },
                    { component: <div className="w-6 h-10 bg-purple-500 rounded" />, align: 'right', slot: 2 },
                  ]}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Diferentes tamaños de spacing</h2>
          <p className="text-sm text-muted-foreground">
            Comparación de componentGap y slotGap.
          </p>
          <div className="space-y-4" data-testid="demo-spacing">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
              <div key={gap} className="border rounded-lg overflow-hidden">
                <div className="text-xs font-medium p-2 bg-slate-100 dark:bg-slate-800">
                  componentGap: {gap}
                </div>
                <LayoutRow
                  slots={1}
                  widthMode="full"
                  paddingX="md"
                  paddingY="sm"
                  componentVerticalAlign="center"
                  componentGap={gap}
                  className="bg-white dark:bg-slate-900"
                  components={[
                    { component: <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">Item 1</div>, align: 'left', slot: 0 },
                    { component: <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">Item 2</div>, align: 'left', slot: 0 },
                    { component: <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">Item 3</div>, align: 'left', slot: 0 },
                    { component: <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded text-sm">Item 4</div>, align: 'left', slot: 0 },
                  ]}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default LayoutRowDemo;
