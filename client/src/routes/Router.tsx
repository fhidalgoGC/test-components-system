import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import LibraryDashboard from "@/pages/library-dashboard";
import TagSelectorDemo from "@/pages/external-app-demo";
import ExternalAppDemo from "@/pages/external-app-demo";
import DateDemo from "@/pages/date-demo";
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
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}