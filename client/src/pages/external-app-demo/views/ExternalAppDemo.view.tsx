import { useState, useCallback } from "react";
import { useAppLanguage, ConfigProvider, useConfig } from "@/lib/ui-library/providers";
import { LibI18nProvider } from "@/lib/ui-library/providers";
import TagSelector from "@/lib/ui-library/components/TagSelector";
import type { TagItem } from "@/lib/ui-library/components";
import { environment } from "@/enviorments/enviroment";

function ExternalAppContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [translationPriority, setTranslationPriority] = useState<
    "component-first" | "external-first"
  >("component-first");
  const app = useAppLanguage(); // Obtener el proveedor padre para inyectarlo
  const { config } = useConfig(); // Obtener configuración merged

  // Guard para asegurar que app esté disponible
  if (!app) {
    return <div>Loading app context...</div>;
  }

  // Log para ver el merge de configuración
  console.log("🌍 External Environment:", environment);
  console.log("⚙️ Merged Config (internal + external):", config);
  console.log("🔤 AVAILABLE_LANGUAGES from merged config:", config.AVAILABLE_LANGUAGES);
  console.log("🌐 DEFAULT_LANGUAGE from merged config:", config.DEFAULT_LANGUAGE);

  // Rutas a los archivos JSON de traducciones globales
  const globalTranslationPaths = [
    { lang: "es", path: "../../../i18n/es.json" },
    { lang: "en", path: "../../../i18n/en.json" },
  ];

  // Función async para cargar tags
  const getTags = useCallback(async (): Promise<TagItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "react",
        label: {
          en: "React",
          es: "React-es",
          fr: "React",
          default: "React",
        },
      },
      {
        id: "typescript",
        label: {
          en: "TypeScript",
          es: "TypeScript-es",
          fr: "TypeScript",
          default: "TypeScript",
        },
      },
      {
        id: "nodejs",
        label: {
          en: "Node.js",
          es: "Node.js-es",
          fr: "Node.js",
          default: "Node.js",
        },
      },
      {
        id: "design",
        label: {
          en: "UI/UX Design",
          es: "Diseño UI/UX-es",
          fr: "Design UI/UX",
          default: "UI/UX Design",
        },
      },
    ];
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">External App Demo</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Demostrando cómo el <strong>environment externo</strong> sobrescribe la configuración interna de la librería.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📊 Configuración Merged:</h3>
          <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <li><strong>AVAILABLE_LANGUAGES:</strong> {JSON.stringify(config.AVAILABLE_LANGUAGES)}</li>
            <li><strong>DEFAULT_LANGUAGE:</strong> {config.DEFAULT_LANGUAGE}</li>
            <li className="text-xs text-blue-600 dark:text-blue-300 mt-2">
              ✅ Valores externos sobrescriben los internos de la librería
            </li>
          </ul>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Revisa la consola del navegador para ver el merge completo de configuración.
        </p>
      </div>

      {/* La librería recibe el proveedor padre como prop - completamente portable */}
      <LibI18nProvider
        parentLanguageProvider={app}
        globalTranslationPaths={globalTranslationPaths}
        translationPriority={translationPriority}
      >
        <TagSelector
          getTagsFunction={getTags}
          selectedTags={selectedTags}
          onSelectionChange={(tags: TagItem[]) => {
            setSelectedTags(tags.map((t: TagItem) => t.id));
            console.log("Selected tags:", tags);
          }}
          requireSelection={false}
          allowMultiple={true}
          allowAll={true}
          allLabel={{
            en: "All",
            es: "Todos",
            fr: "Tous",
            default: "All",
          }}
          defaultSelectedTags={["react"]}
        />
      </LibI18nProvider>

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Selected Tags:</h3>
        <p>{selectedTags.length > 0 ? selectedTags.join(", ") : "None"}</p>
      </div>
    </div>
  );
}

export default function ExternalAppDemo() {
  return (
    <ConfigProvider parentConfig={environment} priority="auto">
      <ExternalAppContent />
    </ConfigProvider>
  );
}
