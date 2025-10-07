import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import LibraryDashboard from "@/pages/library-dashboard";
import TagSelectorDemo from "@/pages/external-app-demo";
import ExternalAppDemo from "@/pages/external-app-demo";
import DateDemo from "@/pages/date-demo";
import { AuthTestPage } from "@/pages/auth-test";
import RegistryMode from "@/pages/heterogeneous-list-registry";
import RenderItemMode from "@/pages/heterogeneous-list-renderitem";
import ElementsMode from "@/pages/heterogeneous-list-elements";
import NotFound from "@/pages/not-found";
import { usePageHeaderListener } from "@/hooks/usePageHeader";

export function Router() {
  const [location] = useLocation();
  const [headerState, setHeaderState] = useState<any>({});
  
  // Listen for page header changes
  const currentHeader = usePageHeaderListener(() => {
    setHeaderState((prev: any) => ({...prev}));
  });
  
  useEffect(() => {
    setHeaderState(currentHeader);
  }, [currentHeader]);
  
  // Define header content based on route and dynamic state
  const getHeaderProps = () => {
    const dynamicHeader = headerState;
    
    // If a page has set dynamic header props, use those
    if (dynamicHeader && Object.keys(dynamicHeader).length > 0) {
      return {
        headerTitle: dynamicHeader.title,
        headerDescription: dynamicHeader.description,
        showActionButtons: dynamicHeader.showActionButtons !== undefined ? dynamicHeader.showActionButtons : false
      };
    }
    
    // Fallback to default based on route
    switch (location) {
      case '/components/tag-selector':
        return {
          showActionButtons: false
        };
      case '/external-app-demo':
        return {
          headerTitle: "External App Demo",
          headerDescription: "Real-world implementation example with LanguageProvider",
          showActionButtons: false
        };
      case '/date-demo':
        return {
          headerTitle: "Date Demo",
          headerDescription: "Testing date formatting with different languages",
          showActionButtons: false
        };
      case '/auth-test':
        return {
          headerTitle: "Auth Test",
          headerDescription: "Testing AppAuthProvider and SessionValidator",
          showActionButtons: false
        };
      case '/components/heterogeneous-list/registry':
        return {
          headerTitle: "HeterogeneousList - Registry Mode",
          headerDescription: "Mapea items a componentes usando kindComponent",
          showActionButtons: false
        };
      case '/components/heterogeneous-list/render-item':
        return {
          headerTitle: "HeterogeneousList - RenderItem Mode",
          headerDescription: "Usa una función para renderizar cada item",
          showActionButtons: false
        };
      case '/components/heterogeneous-list/elements':
        return {
          headerTitle: "HeterogeneousList - Elements Mode",
          headerDescription: "Renderiza ReactElements pre-construidos",
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
        <Route path="/components/tag-selector" component={TagSelectorDemo} />
        <Route path="/external-app-demo" component={ExternalAppDemo} />
        <Route path="/date-demo" component={DateDemo} />
        <Route path="/auth-test" component={AuthTestPage} />
        <Route path="/components/heterogeneous-list/registry" component={RegistryMode} />
        <Route path="/components/heterogeneous-list/render-item" component={RenderItemMode} />
        <Route path="/components/heterogeneous-list/elements" component={ElementsMode} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}