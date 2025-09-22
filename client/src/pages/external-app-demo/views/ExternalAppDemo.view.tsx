import { useState, useCallback } from "react";
import { useAppLanguage } from "../../../providers/AppLanguageProvider";
import { LibI18nProvider } from "../../../lib/ui-library/providers/LibI18n.provider";
import TagSelector from "@/lib/ui-library/components/TagSelector";
import type { TagItem } from "@/lib/ui-library/components/TagSelector/types/tag-selector.type";

function ExternalAppContent() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [translationPriority, setTranslationPriority] = useState<
    "component-first" | "external-first"
  >("component-first");
  const app = useAppLanguage(); // Obtener el proveedor padre para inyectarlo

  // Guard para asegurar que app esté disponible
  if (!app) {
    return <div>Loading app context...</div>;
  }

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
        <p className="text-gray-600 mb-4">
          Demostrando la integración de traducciones jerárquicas usando archivos
          JSON globales (es.json, en.json) con componentes locales y prioridad
          configurable.
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
          requireSelection={true}
          allowMultiple={true}
          allowAll={true}
          allLabel={{
            en: "All",
            es: "Todos",
            fr: "Tous",
            default: "All",
          }}
          defaultSelectedTags={["react", "typescript"]}
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
  return <ExternalAppContent />;
}
