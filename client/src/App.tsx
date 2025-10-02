import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ui-library/theme";
import { AppLanguageProvider, ConfigProvider } from "@/lib/ui-library/providers";
import { Router } from "@/routes";
import { environment } from "@/enviorments/enviroment";

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider parentConfig={environment} priority="auto">
        <AppLanguageProvider initial="en">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AppLanguageProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
