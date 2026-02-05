import { useState, useRef } from 'react';
import { FloatingMenu, FloatingMenuItem } from '@/lib/ui-library/components/FloatingMenu';

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

const manyItems: FloatingMenuItem<{ label: string }>[] = Array.from({ length: 15 }, (_, i) => ({
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

export default function FloatingMenuDemo() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData | null>(null);
  const [scrollMode, setScrollMode] = useState<'auto' | 'none'>('auto');
  
  const trigger1Ref = useRef<HTMLButtonElement>(null);
  const trigger2Ref = useRef<HTMLButtonElement>(null);
  const trigger3Ref = useRef<HTMLButtonElement>(null);

  const handleLanguageSelect = (item: FloatingMenuItem<LanguageData>) => {
    setSelectedLanguage(item.data || null);
    setIsOpen1(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">FloatingMenu</h1>
      <p className="text-gray-600 mb-8">
        Componente de menú flotante con items renderizables, layout configurable y scroll opcional.
      </p>

      <div className="space-y-12">
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Selector de Idioma</h2>
          <p className="text-gray-600 mb-4">
            Menú flotante con items personalizados (banderas + texto).
          </p>
          
          <div className="relative inline-block">
            <button
              ref={trigger1Ref}
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
            
            <div className="absolute top-full left-0 mt-2">
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
          </div>

          {selectedLanguage && (
            <p className="mt-4 text-sm text-gray-500" data-testid="text-selected-language">
              Idioma seleccionado: <strong>{selectedLanguage.name}</strong> ({selectedLanguage.code})
            </p>
          )}
        </section>

        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Scroll Auto vs None</h2>
          <p className="text-gray-600 mb-4">
            Menú con 15 items y altura máxima configurable. Prueba cambiar el modo de scroll.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium">Scroll Mode:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scrollMode"
                value="auto"
                checked={scrollMode === 'auto'}
                onChange={() => setScrollMode('auto')}
                data-testid="radio-scroll-auto"
              />
              <span>Auto</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scrollMode"
                value="none"
                checked={scrollMode === 'none'}
                onChange={() => setScrollMode('none')}
                data-testid="radio-scroll-none"
              />
              <span>None</span>
            </label>
          </div>
          
          <div className="relative inline-block">
            <button
              ref={trigger2Ref}
              onClick={() => setIsOpen2(!isOpen2)}
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              data-testid="button-scroll-trigger"
            >
              Abrir menú con {manyItems.length} items
            </button>
            
            <div className="absolute top-full left-0 mt-2">
              <FloatingMenu
                items={manyItems}
                isOpen={isOpen2}
                onClose={() => setIsOpen2(false)}
                onItemClick={(item) => {
                  console.log('Clicked:', item.data?.label);
                  setIsOpen2(false);
                }}
                scroll={scrollMode}
                layout={{
                  widthMode: 'fixed',
                  width: 200,
                  maxHeight: 250,
                }}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Ejemplo: Layout Full Width</h2>
          <p className="text-gray-600 mb-4">
            Menú que ocupa todo el ancho del contenedor.
          </p>
          
          <div className="relative w-full max-w-md">
            <button
              ref={trigger3Ref}
              onClick={() => setIsOpen3(!isOpen3)}
              className="w-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg text-left"
              data-testid="button-fullwidth-trigger"
            >
              Menú Full Width
            </button>
            
            <div className="absolute top-full left-0 right-0 mt-2">
              <FloatingMenu
                items={languageItems}
                isOpen={isOpen3}
                onClose={() => setIsOpen3(false)}
                onItemClick={(item) => {
                  console.log('Selected:', item.data?.name);
                  setIsOpen3(false);
                }}
                layout={{
                  widthMode: 'full',
                }}
              />
            </div>
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
                  <td className="py-2 px-3">layout</td>
                  <td className="py-2 px-3">FloatingMenuLayout</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 font-sans">Configuración de layout (width, height, min/max)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">scroll</td>
                  <td className="py-2 px-3">'auto' | 'none'</td>
                  <td className="py-2 px-3">'auto'</td>
                  <td className="py-2 px-3 font-sans">Modo de scroll del contenedor</td>
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
        </section>
      </div>
    </div>
  );
}
