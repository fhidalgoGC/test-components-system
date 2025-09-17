import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ui-library/theme";
import AppLayout from "@/components/layouts/AppLayout";
import LibraryDashboard from "@/pages/library-dashboard";
import ButtonDemo from "@/pages/components/button-demo";
import TagSelectorDemo from "@/pages/components/tag-selector-demo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={LibraryDashboard} />
        <Route path="/components/button" component={ButtonDemo} />
        <Route path="/components/tag-selector" component={TagSelectorDemo} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
