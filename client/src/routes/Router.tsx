import { Switch, Route, useLocation } from "wouter";
import AppLayout from "@/layouts/app-layout";
import LibraryDashboard from "@/pages/library-dashboard";
import ButtonDemo from "@/pages/components/button-demo";
import TagSelectorDemo from "@/pages/components/tag-selector-demo";
import ComponentDemo from "@/pages/component-demo";
import NotFound from "@/pages/not-found";

export function Router() {
  const [location] = useLocation();
  
  // Define header content based on route
  const getHeaderProps = () => {
    switch (location) {
      case '/components/button':
        return {
          headerTitle: "Button",
          headerDescription: "Botón principal para acciones importantes con soporte para diferentes tamaños, estilos y estados",
          showActionButtons: false
        };
      case '/components/tag-selector':
        return {
          headerTitle: "TagSelector", 
          headerDescription: "Selector de etiquetas interactivo con opciones múltiples, filtrado y soporte para diferentes modos de selección",
          showActionButtons: false
        };
      case '/demo':
        return {
          headerTitle: "Component Demo",
          headerDescription: "Demostración de componentes Sidebar y Navbar",
          showActionButtons: false
        };
      default:
        return {
          headerTitle: "UI Library",
          headerDescription: "React + TypeScript modular component system",
          showActionButtons: true
        };
    }
  };

  return (
    <AppLayout {...getHeaderProps()}>
      <Switch>
        <Route path="/" component={LibraryDashboard} />
        <Route path="/components/button" component={ButtonDemo} />
        <Route path="/components/tag-selector" component={TagSelectorDemo} />
        <Route path="/demo" component={ComponentDemo} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}