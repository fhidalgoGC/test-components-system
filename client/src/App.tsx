import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ui-library/theme";
import {
  AppLanguageProvider,
  AppAuthProvider,
  ConfigProvider,
  LibI18nProvider,
  useAppLanguage,
} from "@/lib/ui-library/providers";
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
  const handleLogging = () => {
    console.log("Inicio sesión");
  };

  const handleSessionInvalid = () => {
    console.log("Cieeee de Sesion");
  };

  return (
    <ThemeProvider>
      <ConfigProvider parentConfig={environment} priority="parent">
        <AppAuthProvider
          onLogging={handleLogging}
          onSessionInvalid={handleSessionInvalid}
        >
          <AppLanguageProvider initial="en">
            <AppContent />
          </AppLanguageProvider>
        </AppAuthProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
