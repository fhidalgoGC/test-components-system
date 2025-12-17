import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes";

import {
  AppLanguageProvider,
  LibI18nProvider,
  useAppLanguage,
} from "GC-UI-COMPONENTS";

const globalTranslationPaths = [
  { lang: "es", path: "/i18n/es.json" },
  { lang: "en", path: "/i18n/en.json" },
];

function App() {
  const appLanguage = useAppLanguage();
  return (
    <LibI18nProvider
      parentLanguageProvider={appLanguage}
      globalTranslationPaths={globalTranslationPaths}
      translationPriority="external-first"
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </QueryClientProvider>
    </LibI18nProvider>
  );
}

export default App;
