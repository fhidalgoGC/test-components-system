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
  const handleLogging = () => {
    console.log("Inicio sesión");
  };

  const handleSessionInvalid = () => {
    console.log("Cieeee de Sesion");
  };

  return (
    <ThemeProvider>
      {/* <ConfigProvider parentConfig={environment} priority="auto"> */}
      <AppAuthProvider
        onLogging={handleLogging}
        onSessionInvalid={handleSessionInvalid}
      >
        <AppLanguageProvider initial="en">
          <AppContent />
        </AppLanguageProvider>
      </AppAuthProvider>
      {/* </ConfigProvider> */}
    </ThemeProvider>
  );
}

export default App;
