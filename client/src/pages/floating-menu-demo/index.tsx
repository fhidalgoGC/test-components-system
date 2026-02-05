import { useState } from 'react';
import { FloatingMenu, FloatingMenuItem, MenuPosition } from '@/lib/ui-library/components/FloatingMenu';

interface LanguageData {
  name: string;
  code: string;
  flag: string;
}

const languageItems: FloatingMenuItem<LanguageData>[] = [
  {
    id: 'pt',
    data: { name: 'Portugués', code: 'pt', flag: '🇧🇷' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'en',
    data: { name: 'Inglés', code: 'en', flag: '🇺🇸' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
  {
    id: 'es',
    data: { name: 'Español', code: 'es', flag: '🇲🇽' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span className="font-medium">{item.data?.name}</span>
      </div>
    ),
  },
];

const manyItems: FloatingMenuItem<{ label: string }>[] = Array.from({ length: 8 }, (_, i) => ({
  id: `item-${i + 1}`,
  data: { label: `Item ${i + 1}` },
  render: (item) => (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
        {i + 1}
      </span>
      <span>{item.data?.label}</span>
    </div>
  ),
}));

const positionOptions: MenuPosition[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end'
];

export default function FloatingMenuDemo() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<MenuPosition>('bottom-start');
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const handleLanguageSelect = (item: FloatingMenuItem<LanguageData>) => {
    setSelectedLanguage(item.data || null);
    setIsOpen1(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">FloatingMenu</h1>
      <p className="text-gray-600 mb-8">
        Componente de menú flotante con header, body (items), footer, posición y layout configurables.
      </p>

      <div className="space-y-12">
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Selector de Idioma</h2>
          <p className="text-gray-600 mb-4">
            Menú flotante con items personalizados (banderas + texto). Posición por defecto: bottom-start.
          </p>
          
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen1(!isOpen1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
              data-testid="button-language-trigger"
            >
              {selectedLanguage ? (
                <>
                  <span className="text-xl">{selectedLanguage.flag}</span>
                  <span>{selectedLanguage.name}</span>
                </>
              ) : (
                <span>Seleccionar idioma</span>
              )}
              <span className="ml-2">▼</span>
            </button>
            
            <FloatingMenu
              items={languageItems}
              isOpen={isOpen1}
              onClose={() => setIsOpen1(false)}
              onItemClick={handleLanguageSelect}
              layout={{
                widthMode: 'fixed',
                width: 200,
              }}
            />
          </div>

          {selectedLanguage && (
            <p className="mt-4 text-sm text-gray-500" data-testid="text-selected-language">
              Idioma seleccionado: <strong>{selectedLanguage.name}</strong> ({selectedLanguage.code})
            </p>
          )}
        </section>

        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Posición del Menú</h2>
          <p className="text-gray-600 mb-4">
            Prueba las diferentes posiciones de apertura del menú.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {positionOptions.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-3 py-1 text-sm rounded border ${
                  selectedPosition === pos
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                data-testid={`button-position-${pos}`}
              >
                {pos}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center py-20">
            <div className="relative inline-block">
              <button
                onClick={() => setIsOpen2(!isOpen2)}
                className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg font-medium"
                data-testid="button-position-trigger"
              >
                Abrir ({selectedPosition})
              </button>
              
              <FloatingMenu
                items={languageItems}
                isOpen={isOpen2}
                position={selectedPosition}
                onClose={() => setIsOpen2(false)}
                onItemClick={() => setIsOpen2(false)}
                layout={{
                  widthMode: 'fixed',
                  width: 180,
                }}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Header, Body y Footer</h2>
          <p className="text-gray-600 mb-4">
            Menú con secciones personalizables. Puedes mostrar/ocultar header y footer.
          </p>

          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHeader}
                onChange={(e) => setShowHeader(e.target.checked)}
                data-testid="checkbox-show-header"
              />
              <span className="text-sm font-medium">Show Header</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
                data-testid="checkbox-show-footer"
              />
              <span className="text-sm font-medium">Show Footer</span>
            </label>
          </div>
          
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen3(!isOpen3)}
              className="px-4 py-2 bg-purple-500 text-white hover:bg-purple-600 rounded-lg"
              data-testid="button-sections-trigger"
            >
              Abrir menú con secciones
            </button>
            
            <FloatingMenu
              items={manyItems}
              isOpen={isOpen3}
              onClose={() => setIsOpen3(false)}
              onItemClick={(item) => {
                console.log('Clicked:', item.data?.label);
                setIsOpen3(false);
              }}
              header={{
                renderType: 'component',
                show: showHeader,
                heightMode: 'auto',
                render: () => (
                  <div className="p-3 bg-gray-50">
                    <h3 className="font-semibold text-sm">Seleccionar opción</h3>
                    <p className="text-xs text-gray-500">Elige una de las siguientes</p>
                  </div>
                ),
              }}
              footer={{
                renderType: 'component',
                show: showFooter,
                heightMode: 'fixed',
                height: 50,
                render: () => (
                  <div className="p-3 bg-gray-50 h-full flex items-center justify-between">
                    <span className="text-xs text-gray-500">8 opciones disponibles</span>
                    <button 
                      className="text-xs text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen3(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                ),
              }}
              layout={{
                widthMode: 'fixed',
                width: 280,
                maxHeight: 350,
              }}
            />
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Props del Componente</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Prop</th>
                  <th className="text-left py-2 px-3">Tipo</th>
                  <th className="text-left py-2 px-3">Default</th>
                  <th className="text-left py-2 px-3">Descripción</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b">
                  <td className="py-2 px-3">items</td>
                  <td className="py-2 px-3">FloatingMenuItem[]</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Array de items con render function</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">position</td>
                  <td className="py-2 px-3">MenuPosition</td>
                  <td className="py-2 px-3">'bottom-start'</td>
                  <td className="py-2 px-3 font-sans">Posición de apertura del menú</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">header</td>
                  <td className="py-2 px-3">FloatingMenuSectionConfig</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Configuración del header (render, height, show)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">footer</td>
                  <td className="py-2 px-3">FloatingMenuSectionConfig</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Configuración del footer (render, height, show)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">layout</td>
                  <td className="py-2 px-3">FloatingMenuLayout</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Configuración de layout (width, height, min/max)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">scroll</td>
                  <td className="py-2 px-3">'auto' | 'none'</td>
                  <td className="py-2 px-3">'auto'</td>
                  <td className="py-2 px-3 font-sans">Modo de scroll del body</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">isOpen</td>
                  <td className="py-2 px-3">boolean</td>
                  <td className="py-2 px-3">true</td>
                  <td className="py-2 px-3 font-sans">Controla visibilidad del menú</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">onItemClick</td>
                  <td className="py-2 px-3">(item, index) =&gt; void</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Callback al hacer click en un item</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">onClose</td>
                  <td className="py-2 px-3">() =&gt; void</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Callback al cerrar el menú (click fuera)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">MenuPosition</h3>
          <div className="grid grid-cols-3 gap-2 text-sm font-mono">
            <div className="bg-white p-2 rounded border">top</div>
            <div className="bg-white p-2 rounded border">top-start</div>
            <div className="bg-white p-2 rounded border">top-end</div>
            <div className="bg-white p-2 rounded border">bottom</div>
            <div className="bg-blue-100 p-2 rounded border border-blue-300">bottom-start (default)</div>
            <div className="bg-white p-2 rounded border">bottom-end</div>
            <div className="bg-white p-2 rounded border">left</div>
            <div className="bg-white p-2 rounded border">left-start</div>
            <div className="bg-white p-2 rounded border">left-end</div>
            <div className="bg-white p-2 rounded border">right</div>
            <div className="bg-white p-2 rounded border">right-start</div>
            <div className="bg-white p-2 rounded border">right-end</div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">FloatingMenuSectionConfig</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Prop</th>
                  <th className="text-left py-2 px-3">Tipo</th>
                  <th className="text-left py-2 px-3">Descripción</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b">
                  <td className="py-2 px-3">renderType</td>
                  <td className="py-2 px-3">'component' | 'none'</td>
                  <td className="py-2 px-3 font-sans">Tipo de renderizado</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">render</td>
                  <td className="py-2 px-3">() =&gt; ReactNode</td>
                  <td className="py-2 px-3 font-sans">Función que retorna el contenido</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">show</td>
                  <td className="py-2 px-3">boolean</td>
                  <td className="py-2 px-3 font-sans">Mostrar/ocultar la sección (desmonta si false)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">heightMode</td>
                  <td className="py-2 px-3">'full' | 'auto' | 'fixed'</td>
                  <td className="py-2 px-3 font-sans">Modo de altura</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">height</td>
                  <td className="py-2 px-3">number | string</td>
                  <td className="py-2 px-3 font-sans">Altura (cuando heightMode es 'fixed')</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
