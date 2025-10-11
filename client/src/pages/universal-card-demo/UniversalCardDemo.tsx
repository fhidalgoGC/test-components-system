import { UniversalCard } from '@/lib/ui-library/components/UniversalCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Example components to render inside cards
const SimpleContent = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const UserProfile = ({ name, email, role }: { name: string; email: string; role: string }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">{name.charAt(0)}</span>
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
    <Badge variant="secondary">{role}</Badge>
  </div>
);

const StatCard = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="text-center space-y-2">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
    <p className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
      {trend}
    </p>
  </div>
);

const InteractiveComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-4">
      <p className="text-center text-2xl font-bold">Counter: {count}</p>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => setCount(count - 1)} variant="outline" data-testid="button-decrement">
          -
        </Button>
        <Button onClick={() => setCount(count + 1)} data-testid="button-increment">
          +
        </Button>
        <Button onClick={() => setCount(0)} variant="destructive" data-testid="button-reset">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default function UniversalCardDemo() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold" data-testid="text-title">UniversalCard Demo</h1>
        <p className="text-muted-foreground" data-testid="text-description">
          Ejemplos de uso del componente UniversalCard con diferentes configuraciones
        </p>
      </div>

      {/* Basic Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-basic">1. Ejemplo Básico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UniversalCard
            component={SimpleContent}
            componentProps={{
              title: "Card Simple",
              description: "Esta es una card básica con contenido simple"
            }}
            minWidth={250}
            minHeight={150}
            dataTestId="card-basic-1"
          />

          <UniversalCard
            component={SimpleContent}
            componentProps={{
              title: "Card con Tamaño Fijo",
              description: "Esta card tiene un tamaño mínimo definido en píxeles"
            }}
            minWidth={300}
            minHeight={200}
            dataTestId="card-basic-2"
          />

          <UniversalCard
            component={SimpleContent}
            componentProps={{
              title: "Card Full Width",
              description: "Esta card usa Tailwind para ocupar el ancho completo"
            }}
            width="w-full"
            minHeight={150}
            dataTestId="card-basic-3"
          />
        </div>
      </section>

      {/* With Header and Footer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-header-footer">2. Con Header y Footer</h2>
        <UniversalCard
          component={UserProfile}
          componentProps={{
            name: "Juan Pérez",
            email: "juan@ejemplo.com",
            role: "Developer"
          }}
          minWidth={400}
          headerContent={
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Perfil de Usuario</h3>
              <Badge>Activo</Badge>
            </div>
          }
          footerContent={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" data-testid="button-view-profile">Ver Perfil</Button>
              <Button size="sm" data-testid="button-edit-profile">Editar</Button>
            </div>
          }
          dataTestId="card-with-header-footer"
        />
      </section>

      {/* Custom Styles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-custom-styles">3. Estilos Personalizados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalCard
            component={StatCard}
            componentProps={{
              label: "Usuarios",
              value: "1,234",
              trend: "+12.5%"
            }}
            minWidth={200}
            cardStyles={{
              backgroundColor: "#f0f9ff",
              borderColor: "#3b82f6",
              borderWidth: "2px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(59, 130, 246, 0.1)"
            }}
            dataTestId="card-custom-blue"
          />

          <UniversalCard
            component={StatCard}
            componentProps={{
              label: "Ingresos",
              value: "$45.2K",
              trend: "+8.3%"
            }}
            minWidth={200}
            cardStyles={{
              backgroundColor: "#f0fdf4",
              borderColor: "#22c55e",
              borderWidth: "2px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(34, 197, 94, 0.1)"
            }}
            dataTestId="card-custom-green"
          />

          <UniversalCard
            component={StatCard}
            componentProps={{
              label: "Conversión",
              value: "23.8%",
              trend: "-2.1%"
            }}
            minWidth={200}
            cardStyles={{
              backgroundColor: "#fef2f2",
              borderColor: "#ef4444",
              borderWidth: "2px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(239, 68, 68, 0.1)"
            }}
            dataTestId="card-custom-red"
          />
        </div>
      </section>

      {/* Interactive Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-interactive">4. Componente Interactivo</h2>
        <div className="max-w-md mx-auto">
          <UniversalCard
            component={InteractiveComponent}
            minWidth={350}
            minHeight={200}
            cardStyles={{
              className: "shadow-lg hover:shadow-xl transition-shadow"
            }}
            headerContent={
              <h3 className="font-semibold text-center">Contador Interactivo</h3>
            }
            dataTestId="card-interactive"
          />
        </div>
      </section>

      {/* Responsive Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-responsive">5. Tamaños Responsive</h2>
        <div className="space-y-4">
          <UniversalCard
            component={SimpleContent}
            componentProps={{
              title: "Full Width Card",
              description: "Esta card ocupa todo el ancho disponible usando w-full"
            }}
            width="w-full"
            minHeight={100}
            dataTestId="card-responsive-1"
          />

          <UniversalCard
            component={SimpleContent}
            componentProps={{
              title: "Responsive Width Card",
              description: "Esta card cambia de tamaño según el viewport: w-full en mobile, w-2/3 en tablet, w-1/2 en desktop"
            }}
            minHeight={120}
            cardStyles={{
              className: "w-full md:w-2/3 lg:w-1/2"
            }}
            dataTestId="card-responsive-2"
          />
        </div>
      </section>

      {/* Mixed Content */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold" data-testid="text-section-mixed">6. Contenido Mixto</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UniversalCard
            component={UserProfile}
            componentProps={{
              name: "María García",
              email: "maria@ejemplo.com",
              role: "Designer"
            }}
            minHeight={200}
            cardStyles={{
              className: "hover:scale-105 transition-transform"
            }}
            dataTestId="card-mixed-1"
          />

          <UniversalCard
            component={InteractiveComponent}
            minHeight={200}
            cardStyles={{
              padding: "1.5rem",
              borderRadius: "16px"
            }}
            dataTestId="card-mixed-2"
          />
        </div>
      </section>
      </div>
    </div>
  );
}
