import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ui-library/theme";
import { AppLanguageProvider } from "./providers/AppLanguageProvider";
import { Router } from "@/routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppLanguageProvider initial="en">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AppLanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
