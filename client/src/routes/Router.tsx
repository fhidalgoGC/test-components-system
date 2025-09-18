import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import LibraryDashboard from "@/pages/library-dashboard";
import TagSelectorDemo from "@/pages/tag-selector-demo";
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
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}