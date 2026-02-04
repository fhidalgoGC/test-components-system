import { useState, useCallback } from "react";
import { BottomNavigationBar } from "@/lib/ui-library/components/BottomNavigationBar";
import type {
  NavItem,
  BottomNavigationBarError,
} from "@/lib/ui-library/components/BottomNavigationBar/mobile/types";
import { Home, Search, User, Settings, Bell, AlertCircle } from "lucide-react";

export const BottomNavDemoWebView = () => {
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const [controlledId, setControlledId] = useState<string>("home");
  const [triggerOnMount, setTriggerOnMount] = useState(false);
  const [disabledIds, setDisabledIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: "home",
      label: { en: "Home", es: "Inicio", default: "Home" },
      metadata: { icon: <Home size={24} />, dataTestId: "nav-home" },
    },
    {
      id: "search",
      label: { en: "Search", es: "Buscar", default: "Search" },
      metadata: { icon: <Search size={24} />, dataTestId: "nav-search" },
    },
    {
      id: "notifications",
      label: { en: "Notifications", es: "Notificaciones", default: "Notifications" },
      metadata: { icon: <Bell size={24} />, dataTestId: "nav-notifications", isDisabled: true },
    },
    {
      id: "profile",
      label: { en: "Profile", es: "Perfil", default: "Profile" },
      metadata: { icon: <User size={24} />, dataTestId: "nav-profile" },
    },
    {
      id: "settings",
      label: { en: "Settings", es: "Ajustes", default: "Settings" },
      metadata: { icon: <Settings size={24} />, dataTestId: "nav-settings" },
    },
  ];

  const handleSelect = (item: NavItem) => {
    setSelectedItem(item);
    setControlledId(item.id);
    console.log("Selected item:", item);
  };

  const handleError = useCallback((error: BottomNavigationBarError) => {
    console.error("BottomNavigationBar error:", error);
    setErrorMessage(`❌ ${error.message}`);
    setTimeout(() => setErrorMessage(null), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            BottomNavigationBar Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Barra de navegación inferior móvil con i18n reactivo usando
            ItemWithMultiLanguageLabel
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Estado Actual</h2>
          <div className="space-y-2">
            <p className="text-sm dark:text-gray-300">
              <strong>Último seleccionado:</strong>{" "}
              {selectedItem ? (
                <span className="text-blue-600 dark:text-blue-400">
                  {selectedItem.id} - {selectedItem.label.en}
                </span>
              ) : (
                <span className="text-gray-500">Ninguno</span>
              )}
            </p>
            <p className="text-sm dark:text-gray-300">
              <strong>triggerOnMount:</strong>{" "}
              <span className={triggerOnMount ? "text-green-600" : "text-gray-500"}>
                {triggerOnMount ? "Activado" : "Desactivado"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Controles</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={triggerOnMount}
                onChange={(e) => setTriggerOnMount(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm dark:text-gray-300">
                Disparar callback al montar (triggerOnMount)
              </span>
            </label>

            <div>
              <p className="text-sm font-medium mb-2 dark:text-gray-300">
                Cambiar selección externa:
              </p>
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setControlledId(item.id)}
                    disabled={disabledIds.includes(item.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      controlledId === item.id
                        ? "bg-blue-600 text-white"
                        : disabledIds.includes(item.id)
                          ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {item.label.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigationBar
        items={navItems}
        selectedId={controlledId}
        disabledIds={disabledIds}
        onSelect={handleSelect}
        onError={handleError}
      />
    </div>
  );
};
