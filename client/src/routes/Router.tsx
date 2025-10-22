import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import LibraryDashboard from "@/pages/library-dashboard";
import TagSelectorDemo from "@/pages/external-app-demo";
import ExternalAppDemo from "@/pages/external-app-demo";
import DateDemo from "@/pages/date-demo";
import { AuthTestPage } from "@/pages/auth-test";
import RegistryMode from "@/pages/heterogeneous-list-registry";
import ElementsMode from "@/pages/heterogeneous-list-elements";
import { AsyncLoadingDemo } from "@/pages/heterogeneous-list-async";
import BottomNavDemo from "@/pages/bottom-nav-demo";
import BottomNavConfigDemo from "@/pages/bottom-nav-config-demo";
import ResponsiveDemo from "@/pages/responsive-demo";
import UniversalCardDemo from "@/pages/universal-card-demo/UniversalCardDemo";
import CarouselDemo from "@/pages/carousel-demo";
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
      case '/components/heterogeneous-list/elements':
        return {
          headerTitle: "HeterogeneousList - Elements Mode",
          headerDescription: "Renderiza ReactElements pre-construidos",
          showActionButtons: false
        };
      case '/components/heterogeneous-list/async':
        return {
          headerTitle: "HeterogeneousList - Async Loading",
          headerDescription: "Demostración de carga asíncrona y controles",
          showActionButtons: false
        };
      case '/components/bottom-nav':
        return {
          headerTitle: "BottomNavigationBar",
          headerDescription: "Barra de navegación inferior móvil con i18n reactivo",
          showActionButtons: false
        };
      case '/components/bottom-nav-config':
        return {
          headerTitle: "BottomNavigationBar - ConfigProvider",
          headerDescription: "Prueba la integración con ConfigProvider",
          showActionButtons: false
        };
      case '/responsive-demo':
        return {
          headerTitle: "Responsive Hook Demo",
          headerDescription: "Prueba el hook useResponsive con detección de dispositivo y orientación",
          showActionButtons: false
        };
      case '/components/universal-card':
        return {
          headerTitle: "UniversalCard",
          headerDescription: "Card universal que puede renderizar cualquier componente con estilos personalizables",
          showActionButtons: false
        };
      case '/components/carousel':
        return {
          headerTitle: "Carousel",
          headerDescription: "Carrusel interactivo con autoplay, gestos, navegación por teclado e indicadores",
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
        <Route path="/components/heterogeneous-list/elements" component={ElementsMode} />
        <Route path="/components/heterogeneous-list/async" component={AsyncLoadingDemo} />
        <Route path="/components/bottom-nav" component={BottomNavDemo} />
        <Route path="/components/bottom-nav-config" component={BottomNavConfigDemo} />
        <Route path="/responsive-demo" component={ResponsiveDemo} />
        <Route path="/components/universal-card" component={UniversalCardDemo} />
        <Route path="/components/carousel" component={CarouselDemo} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}