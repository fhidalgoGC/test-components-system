import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ui-library/theme";
import {
  AppLanguageProvider,
  ConfigProvider,
  LibI18nProvider,
  useAppLanguage,
} from "@/lib/ui-library/providers";
import { AppAuthProvider } from "@/lib/ui-library/providers/AppAuthProvider";
import { Router } from "@/routes";
import { environment } from "@/enviorments/enviroment";

function AppContent() {
  const app = useAppLanguage();

  return (
    <LibI18nProvider
      parentLanguageProvider={app}
      globalTranslationPaths={[]}
      translationPriority="component-first"
    >
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </LibI18nProvider>
  );
}

function App() {
  const handleSessionInvalid = () => {
    alert("Salio");
  };

  return (
    <ThemeProvider>
      <AppAuthProvider 
        sessionDuration={60000}
        onSessionInvalid={handleSessionInvalid}
      >
        <ConfigProvider parentConfig={environment} priority="auto">
          <AppLanguageProvider initial="en">
            <AppContent />
          </AppLanguageProvider>
        </ConfigProvider>
      </AppAuthProvider>
    </ThemeProvider>
  );
}

export default App;
